import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { prisma } from '../../../lib/prisma';
import * as productService from "../services/product.service";
import { storageService } from "../../../lib/storage";
import { processImages, formatProductUrls } from '../../../utils/image.utils';
import { BadRequestError, NotFoundError } from "../../../errors/AppError";

export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const sellerId = (req as any).user.id;
    const data = req.body;

    // Handle multiple images upload
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      throw new BadRequestError("At least one product image is required");
    }

    data.images = await processImages(files);

    const product = await productService.createProduct(sellerId, data);
    res.status(201).json(formatProductUrls(product));
  },
);

export const getProductCategories = asyncHandler(
  async (req: Request, res: Response) => {
    console.log("--> getProductCategories called");
    const categories = await productService.getCategories();
    res.json(categories);
  },
);

import { ProductFilterSchema, PaginatedResponse } from '@merchhub/shared';

export const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
  const query = ProductFilterSchema.parse(req.query);
  const { page, limit, search, categoryId, minPrice, maxPrice } = query;
  
  const skip = (page - 1) * limit;
  const take = limit;
  
  const where: any = {
    status: 'PUBLISHED',
  };
  
  if (categoryId) where.categoryId = categoryId;
  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {};
    if (minPrice !== undefined) where.price.gte = minPrice;
    if (maxPrice !== undefined) where.price.lte = maxPrice;
  }
  
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ];
  }
  
  const [total, products] = await prisma.$transaction([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: { seller: { select: { id: true, name: true, username: true } }, category: true }
    })
  ]);
  
  const response: PaginatedResponse<any> = {
    data: products.map(formatProductUrls),
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
  
  res.json(response);
});

export const getMyProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const sellerId = (req as any).user.id;
    const products = await productService.getProductsBySeller(sellerId);

    res.json(products.map(formatProductUrls));
  },
);

export const getProduct = asyncHandler(async (req: Request, res: Response) => {
  const sellerId = (req as any).user.id;
  const product = await productService.getProductById(
    req.params.id as string,
    sellerId,
  );

  if (!product) {
    throw new NotFoundError("Product not found");
  }

  res.json(formatProductUrls(product));
});

export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const sellerId = (req as any).user.id;

    const existingProduct = await productService.getProductById(
      req.params.id as string,
      sellerId,
    );
    if (!existingProduct) {
      throw new NotFoundError("Product not found");
    }

    const data = req.body;

    // Handle images if any were uploaded
    const files = req.files as Express.Multer.File[];

    // Parse existing images that are kept (sent as strings/array from frontend)
    // Usually frontends send existing image paths back. If they don't, we need to handle deletions.
    let keptImages: string[] = [];
    if (req.body.existingImages) {
      try {
        const parsed = JSON.parse(req.body.existingImages);
        if (Array.isArray(parsed)) {
          // Extract just the relative paths from the full URLs
          keptImages = parsed.map((url) => {
            if (!url.startsWith("http")) return url;
            const urlObj = new URL(url);
            return urlObj.pathname.replace(/^\/+/, ""); // try to extract the key
          });
        }
      } catch (e) {
        console.error("Failed to parse existingImages", e);
      }
    } else {
      keptImages = existingProduct.images;
    }

    data.images = await processImages(files, keptImages);

    // Find deleted images to remove from storage (optional but good for cleanup)
    const deletedImages = existingProduct.images.filter(
      (img) => !data.images?.includes(img),
    );
    for (const img of deletedImages) {
      await storageService.deleteFile(img).catch(console.error);
    }

    const updatedProduct = await productService.updateProduct(
      req.params.id as string,
      sellerId,
      data,
    );
    res.json(formatProductUrls(updatedProduct));
  },
);

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const sellerId = (req as any).user.id;

    const existingProduct = await productService.getProductById(
      req.params.id as string,
      sellerId,
    );
    if (!existingProduct) {
      throw new NotFoundError("Product not found");
    }

    await productService.deleteProduct(req.params.id as string, sellerId);

    // Delete all associated images
    for (const img of existingProduct.images) {
      await storageService.deleteFile(img).catch(console.error);
    }

    res.json({ success: true, message: "Product deleted" });
  },
);
