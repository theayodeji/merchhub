import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { createProductSchema } from '../dto/product.dto';
import { createProduct as create, getProductsBySeller as getBySeller } from '../services/product.service';

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const sellerId = (req as any).sellerId;
  const data = createProductSchema.parse(req.body);
  
  const product = await create(sellerId, data);
  res.status(201).json(product);
});

export const getMyProducts = asyncHandler(async (req: Request, res: Response) => {
  const sellerId = (req as any).sellerId;
  
  const products = await getBySeller(sellerId);
  res.json(products);
});
