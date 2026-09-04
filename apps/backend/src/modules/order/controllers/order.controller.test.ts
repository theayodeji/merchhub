import { Request, Response } from 'express';
import * as orderController from './order.controller';
import * as orderService from '../services/order.service';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('../services/order.service');

describe('Order Controller', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockReq = {
      body: {},
      params: {},
    };
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
  });

  describe('placeOrder', () => {
    it('should place an order and return 201', async () => {
      mockReq.headers = {};
      mockReq.body = { productId: 'prod-1', quantity: 2 };
      const createdOrder = { id: 'order-1' };
      vi.mocked(orderService.createOrderWithPayment).mockResolvedValue(createdOrder as any);

      await orderController.placeOrder(mockReq as Request, mockRes as Response, mockNext);

      expect(orderService.createOrderWithPayment).toHaveBeenCalledWith(mockReq.body, undefined);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(createdOrder);
    });
  });

  describe('getCreatorOrders', () => {
    it('should fetch creator orders and return them', async () => {
      (mockReq as any).sellerId = 'creator-1';
      (mockReq as any).query = {};
      const meta = { total: 0, page: 1, limit: 20, totalPages: 0 };
      vi.mocked(orderService.findOrdersBySellerId).mockResolvedValue({
        data: [],
        meta
      } as any);

      await orderController.getCreatorOrders(mockReq as Request, mockRes as Response, mockNext);

      expect(orderService.findOrdersBySellerId).toHaveBeenCalledWith('creator-1', { page: 1, limit: 20 });
      expect(mockRes.json).toHaveBeenCalledWith({ status: 'success', data: [], meta });
    });
  });

  describe('updateOrderStatus', () => {
    it('should update order status and return it', async () => {
      (mockReq as any).sellerId = 'creator-1';
      mockReq.params = { id: 'order-1' };
      mockReq.body = { status: 'SHIPPED' };
      vi.mocked(orderService.changeOrderStatus).mockResolvedValue({ id: 'order-1', status: 'SHIPPED' } as any);

      await orderController.updateOrderStatus(mockReq as Request, mockRes as Response, mockNext);

      expect(orderService.changeOrderStatus).toHaveBeenCalledWith('order-1', 'creator-1', 'SHIPPED');
      expect(mockRes.json).toHaveBeenCalledWith({ status: 'success', data: { id: 'order-1', status: 'SHIPPED' } });
    });
  });
});
