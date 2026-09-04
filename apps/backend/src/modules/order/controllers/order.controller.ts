import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as orderService from '../services/order.service';
import { formatProductUrls } from '../../../utils/image.utils';

import { auth } from '../../../config/auth';

export const placeOrder = asyncHandler(async (req: Request, res: Response) => {
  const data = req.body;
  
  // Check for active session for authenticated buyers
  const session = await auth.api.getSession({
    headers: req.headers as Record<string, string>
  });
  
  const buyerId = session?.user?.id;
  
  const result = await orderService.createOrderWithPayment(data, buyerId);
  
  res.status(201).json(result);
});

interface AuthenticatedRequest extends Request {
  sellerId?: string;
  user?: any;
}

export const getMyOrders = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const buyerId = req.user!.id;
  const orders = await orderService.findOrdersByBuyerId(buyerId);
  
  const formattedOrders = orders.map(order => ({
    ...order,
    items: order.items.map(item => ({
      ...item,
      product: formatProductUrls(item.product)
    }))
  }));

  res.json({ status: 'success', data: formattedOrders });
});

import { DashboardOrderFilterSchema } from '@merchhub/shared';

export const getCreatorOrders = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const sellerId = req.sellerId!;
  const query = DashboardOrderFilterSchema.parse(req.query || {});
  const result = await orderService.findOrdersBySellerId(sellerId, query);
  
  // Format the nested product images for each order item
  const formattedOrders = result.data.map((order: any) => ({
    ...order,
    items: order.items.map((item: any) => ({
      ...item,
      product: formatProductUrls(item.product)
    }))
  }));

  res.json({ status: 'success', data: formattedOrders, meta: result.meta });
});

export const getCreatorOrder = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const sellerId = req.sellerId!;
  const id = req.params.id as string;
  const order = await orderService.findOrderByIdAndSellerId(id, sellerId);
  
  // Format the nested product images for the order items
  const formattedOrder = {
    ...order,
    items: order.items.map(item => ({
      ...item,
      product: formatProductUrls(item.product)
    }))
  };

  res.json({ status: 'success', data: formattedOrder });
});

export const updateOrderStatus = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const sellerId = req.sellerId!;
  const id = req.params.id as string;
  const { status } = req.body;
  
  const updatedOrder = await orderService.changeOrderStatus(id as string, sellerId, status);
  res.json({ status: 'success', data: updatedOrder });
});

export const getPublicOrder = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const order = await orderService.findOrderById(id);
  
  // Format the nested product images for the order items
  const formattedOrder = {
    ...order,
    items: order.items.map(item => ({
      ...item,
      product: formatProductUrls(item.product)
    }))
  };

  res.json({ status: 'success', data: formattedOrder });
});
