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
      prisma.order.create.mockResolvedValue({ id: 'order_1' } as any);

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
