import { prisma } from '../../../lib/prisma';
import type { CreateOrderDTO, DashboardOrderFilterDTO } from '@merchhub/shared';
import { paymentService } from '../../../lib/payment';
import { BadRequestError, NotFoundError } from '../../../errors/AppError';
import { OrderStatus } from '@merchhub/db';
import { getEventBus } from '../../../events/event-bus';

export const createOrderWithPayment = async (data: CreateOrderDTO, buyerId?: string) => {
  // 1. Fetch products and group by seller
  const productIds = data.items.map(item => item.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds }, status: 'PUBLISHED' },
  });

  if (products.length !== data.items.length) {
    throw new NotFoundError('One or more products not found or not available');
  }

  // Calculate total amount and verify stock
  let totalAmount = 0;
  const itemsBySeller = new Map<string, { product: any, quantity: number, unitPrice: number, total: number }[]>();

  for (const item of data.items) {
    const product = products.find(p => p.id === item.productId)!;
    if (product.stock < item.quantity) {
      throw new BadRequestError(`Insufficient stock for product: ${product.name}`);
    }
    const unitPrice = product.price;
    const total = unitPrice * item.quantity;
    totalAmount += total;

    const sellerItems = itemsBySeller.get(product.sellerId) || [];
    sellerItems.push({ product, quantity: item.quantity, unitPrice, total });
    itemsBySeller.set(product.sellerId, sellerItems);
  }

  // 2. Initialize Payment
  const paymentInit = await paymentService.initializePayment({
    amount: totalAmount,
    email: data.customerEmail || 'guest@example.com',
    currency: 'USD',
  });

  // 3. Create Order and Transaction records in a transaction
  const orders = await prisma.$transaction(async (tx) => {
    // Create the central transaction
    const transaction = await tx.transaction.create({
      data: {
        amount: totalAmount,
        currency: 'USD',
        status: 'PENDING',
        paymentMethod: 'CARD', // default for now
      }
    });

    const createdOrders = [];

    // Create an order for each seller
    for (const [sellerId, items] of itemsBySeller.entries()) {
      const sellerTotal = items.reduce((sum, item) => sum + item.total, 0);
      
      // Decrement stock for all items
      for (const item of items) {
        await tx.product.update({
          where: { id: item.product.id },
          data: { stock: { decrement: item.quantity } }
        });
      }

      const newOrder = await tx.order.create({
        data: {
          sellerId,
          buyerId, // Attach buyerId if provided
          customerName: data.customerName,
          customerPhone: data.customerPhone,
          customerEmail: data.customerEmail,
          deliveryAddress: data.deliveryAddress,
          total: sellerTotal,
          status: 'PENDING',
          transactionId: transaction.id,
          items: {
            create: items.map(item => ({
              productId: item.product.id,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              total: item.total
            }))
          }
        },
        include: { items: true }
      });

      createdOrders.push(newOrder);
    }

    return createdOrders;
  });

  // Emit order.created for each order — fires AFTER transaction commits
  const bus = getEventBus();
  for (const order of orders) {
    bus.publish({
      type: 'order.created',
      payload: {
        orderId: order.id,
        sellerId: order.sellerId,
        buyerId: order.buyerId ?? undefined,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        total: order.total,
        items: order.items.map(item => ({
          productId: item.productId,
          productName: '',
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        }))
      }
    });
  }

  return {
    orders,
    paymentUrl: paymentInit.authorizationUrl,
    reference: paymentInit.reference
  };
};

export const findOrdersBySellerId = async (sellerId: string, query: DashboardOrderFilterDTO) => {
  const { page, limit, search, status, dateRange } = query;
  const skip = (page - 1) * limit;
  const take = limit;

  const where: any = { sellerId };

  if (status) {
    where.status = status;
  }

  if (search) {
    where.customerName = { contains: search, mode: 'insensitive' };
  }

  if (dateRange) {
    const date = new Date();
    if (dateRange === '7d') {
      date.setDate(date.getDate() - 7);
      where.createdAt = { gte: date };
    } else if (dateRange === '30d') {
      date.setDate(date.getDate() - 30);
      where.createdAt = { gte: date };
    }
  }

  const [total, orders] = await prisma.$transaction([
    prisma.order.count({ where }),
    prisma.order.findMany({
      where,
      skip,
      take,
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                images: true
              }
            }
          }
        },
        transaction: true
      },
      orderBy: { createdAt: 'desc' }
    })
  ]);

  return {
    data: orders,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};

export const findOrderByIdAndSellerId = async (orderId: string, sellerId: string) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId, sellerId },
    include: {
      items: {
        include: {
          product: {
            select: {
              name: true,
              images: true
            }
          }
        }
      },
      transaction: true
    }
  });

  if (!order) {
    throw new NotFoundError('Order not found');
  }

  return order;
};

export const changeOrderStatus = async (orderId: string, sellerId: string, status: OrderStatus) => {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  
  if (!order) {
    throw new NotFoundError('Order not found');
  }

  if (order.sellerId !== sellerId) {
    throw new BadRequestError('You do not have permission to update this order');
  }

  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: { status }
  });

  getEventBus().publish({
    type: 'order.status_changed',
    payload: {
      orderId,
      previousStatus: order.status as string,
      newStatus: status as string,
      sellerId,
      buyerId: order.buyerId ?? undefined,
      customerEmail: order.customerEmail,
      customerName: order.customerName,
    }
  });

  return updatedOrder;
};

export const findOrderById = async (orderId: string) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: {
          product: {
            select: {
              name: true,
              images: true,
              seller: {
                select: {
                  name: true,
                  username: true,
                  displayUsername: true
                }
              }
            }
          }
        }
      },
      transaction: true
    }
  });

  if (!order) {
    throw new NotFoundError('Order not found');
  }

  return order;
};

export const findOrdersByBuyerId = async (buyerId: string) => {
  return prisma.order.findMany({
    where: { buyerId },
    include: {
      items: {
        include: {
          product: {
            select: {
              name: true,
              images: true,
              seller: {
                select: {
                  name: true,
                  username: true,
                  displayUsername: true
                }
              }
            }
          }
        }
      },
      transaction: true
    },
    orderBy: { createdAt: 'desc' }
  });
};
