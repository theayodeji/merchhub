import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as orderService from './order.service';
import { prisma } from '../../../lib/__mocks__/prisma';
import { paymentService } from '../../../lib/payment';
import { BadRequestError, NotFoundError } from '../../../errors/AppError';
import { OrderStatus } from '@merchhub/db';

vi.mock('../../../lib/prisma');
vi.mock('../../../lib/payment', () => ({
  paymentService: {
    initializePayment: vi.fn(),
  },
}));

vi.mock('../../../events/event-bus', () => ({
  getEventBus: () => ({ publish: vi.fn(), subscribe: vi.fn() })
}));

describe('Order Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock $transaction to just execute the callback with the prisma mock
    prisma.$transaction.mockImplementation(async (cb: any) => {
      return cb(prisma);
    });
  });

  describe('createOrderWithPayment', () => {
    const mockOrderData = {
      items: [{ productId: 'prod_1', quantity: 2 }],
      customerName: 'John Doe',
      customerPhone: '123456789',
      customerEmail: 'john@example.com',
      deliveryAddress: '123 Main St',
    };

    it('should throw NotFoundError if product does not exist', async () => {
      prisma.product.findMany.mockResolvedValue([]);

      await expect(orderService.createOrderWithPayment(mockOrderData)).rejects.toThrow(NotFoundError);
    });

    it('should throw BadRequestError if product stock is insufficient', async () => {
      prisma.product.findMany.mockResolvedValue([{
        id: 'prod_1',
        stock: 1, // Only 1 in stock, requested 2
        price: 1000,
        status: 'PUBLISHED',
      } as any]);

      await expect(orderService.createOrderWithPayment(mockOrderData)).rejects.toThrow(BadRequestError);
    });

    it('should successfully create an order and initialize payment', async () => {
      prisma.product.findMany.mockResolvedValue([{
        id: 'prod_1',
        sellerId: 'seller_1',
        stock: 5,
        price: 1000,
        status: 'PUBLISHED',
        name: 'Test Product'
      } as any]);

      (paymentService.initializePayment as any).mockResolvedValue({
        authorizationUrl: 'https://pay.example.com/123',
        reference: 'REF-123',
      });

      prisma.product.update.mockResolvedValue({} as any);
      prisma.order.create.mockResolvedValue({ id: 'order_1', sellerId: 'seller_1', buyerId: null, customerName: 'John Doe', customerEmail: 'john@example.com', total: 2000, items: [] } as any);
      prisma.transaction.create.mockResolvedValue({ id: 'txn_1' } as any);

      const result = await orderService.createOrderWithPayment(mockOrderData);

      expect(paymentService.initializePayment).toHaveBeenCalledWith({
        amount: 2000, // 2 * 1000
        email: 'john@example.com',
        currency: 'USD',
      });

      expect(prisma.product.update).toHaveBeenCalledWith({
        where: { id: 'prod_1' },
        data: { stock: { decrement: 2 } },
      });

      expect(prisma.order.create).toHaveBeenCalled();
      expect(result.paymentUrl).toBe('https://pay.example.com/123');
      expect(result.reference).toBe('REF-123');
    });

    it('should split items from different creators into separate orders', async () => {
      const multiCreatorOrderData = {
        ...mockOrderData,
        items: [
          { productId: 'prod_1', quantity: 1 },
          { productId: 'prod_2', quantity: 2 },
        ]
      };

      prisma.product.findMany.mockResolvedValue([
        {
          id: 'prod_1',
          sellerId: 'creator_A',
          stock: 5,
          price: 1000,
          status: 'PUBLISHED',
          name: 'Product A'
        },
        {
          id: 'prod_2',
          sellerId: 'creator_B',
          stock: 5,
          price: 2000,
          status: 'PUBLISHED',
          name: 'Product B'
        }
      ] as any);

      (paymentService.initializePayment as any).mockResolvedValue({
        authorizationUrl: 'https://pay.example.com/multi',
        reference: 'REF-MULTI',
      });

      prisma.product.update.mockResolvedValue({} as any);
      
      // Mock order creation to return a unique ID based on the seller to verify the output easily
      prisma.order.create.mockImplementation(({ data }: any) => Promise.resolve({ id: `order_${data.sellerId}`, sellerId: data.sellerId, buyerId: null, customerName: data.customerName, customerEmail: data.customerEmail, total: data.total, items: [] }));
      prisma.transaction.create.mockResolvedValue({ id: 'txn_multi' } as any);

      const result = await orderService.createOrderWithPayment(multiCreatorOrderData);

      // Verify payment was initialized for total amount (1000*1 + 2000*2 = 5000)
      expect(paymentService.initializePayment).toHaveBeenCalledWith(expect.objectContaining({
        amount: 5000,
      }));

      // Verify two orders were created, one for each creator
      expect(prisma.order.create).toHaveBeenCalledTimes(2);
      expect(prisma.order.create).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({
          sellerId: 'creator_A',
          total: 1000,
          items: {
            create: [
              expect.objectContaining({ productId: 'prod_1', quantity: 1 })
            ]
          }
        })
      }));
      
      expect(prisma.order.create).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({
          sellerId: 'creator_B',
          total: 4000,
          items: {
            create: [
              expect.objectContaining({ productId: 'prod_2', quantity: 2 })
            ]
          }
        })
      }));

      // Verify the result contains both orders
      expect(result.orders.length).toBe(2);
      expect(result.orders.some((o: any) => o.id === 'order_creator_A')).toBe(true);
      expect(result.orders.some((o: any) => o.id === 'order_creator_B')).toBe(true);
    });
  });

  describe('changeOrderStatus', () => {
    it('should throw NotFoundError if order does not exist', async () => {
      prisma.order.findUnique.mockResolvedValue(null);

      await expect(orderService.changeOrderStatus('order_1', 'seller_1', OrderStatus.SHIPPED)).rejects.toThrow(NotFoundError);
    });

    it('should throw BadRequestError if order belongs to a different seller', async () => {
      prisma.order.findUnique.mockResolvedValue({
        id: 'order_1',
        sellerId: 'wrong_seller',
      } as any);

      await expect(orderService.changeOrderStatus('order_1', 'seller_1', OrderStatus.SHIPPED)).rejects.toThrow(BadRequestError);
    });

    it('should successfully update order status', async () => {
      prisma.order.findUnique.mockResolvedValue({
        id: 'order_1',
        sellerId: 'seller_1',
        status: 'PENDING',
        buyerId: null,
        customerEmail: 'test@example.com',
        customerName: 'Test User',
      } as any);

      prisma.order.update.mockResolvedValue({} as any);

      await orderService.changeOrderStatus('order_1', 'seller_1', OrderStatus.SHIPPED);

      expect(prisma.order.update).toHaveBeenCalledWith({
        where: { id: 'order_1' },
        data: { status: OrderStatus.SHIPPED },
      });
    });
  });
});
