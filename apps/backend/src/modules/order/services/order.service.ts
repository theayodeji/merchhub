import { prisma } from '../../../lib/prisma';
import { CreateOrderDto } from '../dto/order.dto';
import { paymentService } from '../../../lib/payment';
import { BadRequestError, NotFoundError } from '../../../errors/AppError';

export const createOrderWithPayment = async (data: CreateOrderDto) => {
  // 1. Fetch product to verify stock and price
  const product = await prisma.product.findUnique({
    where: { id: data.productId, status: 'PUBLISHED' },
  });

  if (!product) {
    throw new NotFoundError('Product not found or not available');
  }

  if (product.stock < data.quantity) {
    throw new BadRequestError('Insufficient stock for this product');
  }

  const unitPrice = product.price;
  const totalAmount = unitPrice * data.quantity;

  // 2. Initialize Payment
  const paymentInit = await paymentService.initializePayment({
    amount: totalAmount,
    email: data.customerEmail || 'guest@example.com',
    currency: 'USD',
  });

  // 3. Create Order and Transaction records in a transaction
  const order = await prisma.$transaction(async (tx) => {
    // Decrement stock
    await tx.product.update({
      where: { id: product.id },
      data: { stock: { decrement: data.quantity } }
    });

    const newOrder = await tx.order.create({
      data: {
        productId: product.id,
        sellerId: product.sellerId,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerEmail: data.customerEmail,
        deliveryAddress: data.deliveryAddress,
        quantity: data.quantity,
        unitPrice,
        total: totalAmount,
        status: 'PENDING',
        transaction: {
          create: {
            amount: totalAmount,
            currency: 'USD',
            status: 'PENDING',
            paymentMethod: 'CARD', // default for now
            // We use the reference string from paymentInit somehow, 
            // but our schema doesn't have a reference column in Transaction.
            // In a real app we would store the reference.
          }
        }
      },
      include: { transaction: true }
    });

    return newOrder;
  });

  return {
    order,
    paymentUrl: paymentInit.authorizationUrl,
    reference: paymentInit.reference
  };
};
