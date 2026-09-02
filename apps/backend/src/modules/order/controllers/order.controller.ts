import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as orderService from '../services/order.service';
import { formatProductUrls } from '../../../utils/image.utils';

export const placeOrder = asyncHandler(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await orderService.createOrderWithPayment(data);
  
  res.status(201).json(result);
});

interface AuthenticatedRequest extends Request {
  sellerId?: string;
}

export const getCreatorOrders = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const sellerId = req.sellerId!;
  const orders = await orderService.findOrdersBySellerId(sellerId);
  
  // Format the nested product images for each order item
  const formattedOrders = orders.map(order => ({
    ...order,
    items: order.items.map(item => ({
      ...item,
      product: formatProductUrls(item.product)
    }))
  }));

  res.json({ status: 'success', data: formattedOrders });
});

export const updateOrderStatus = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const sellerId = req.sellerId!;
  const id = req.params.id;
  const { status } = req.body;
  
  const updatedOrder = await orderService.changeOrderStatus(id as string, sellerId, status);
  res.json({ status: 'success', data: updatedOrder });
});
