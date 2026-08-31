import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { createOrderSchema } from '../dto/order.dto';
import * as orderService from '../services/order.service';

export const placeOrder = asyncHandler(async (req: Request, res: Response) => {
  const data = createOrderSchema.parse(req.body);
  const result = await orderService.createOrderWithPayment(data);
  
  res.status(201).json(result);
});
