import { prisma } from '../../../lib/prisma';
import type { CreateProductDTO, UpdateProductDTO, DashboardProductFilterDTO } from '@merchhub/shared';
import { NotFoundError } from '../../../errors/AppError';
import { getEventBus } from '../../../events/event-bus';

export const createProduct = async (sellerId: string, data: CreateProductDTO) => {
  const product = await prisma.product.create({
    data: {
      ...data,
      sellerId,
    },
  });
  getEventBus().publish({
    type: 'product.created',
    payload: { productId: product.id, productName: product.name, sellerId, status: product.status }
  });
  return product;
};

export const getCategories = async () => {
  return prisma.category.findMany({
    orderBy: { name: 'asc' },
  });
};

export const getProductsBySeller = async (sellerId: string, query: DashboardProductFilterDTO) => {
  const { page, limit, search, status } = query;
  const skip = (page - 1) * limit;
  const take = limit;

  const where: any = { sellerId };

  if (status) {
    where.status = status;
  } else {
    where.status = { not: 'ARCHIVED' };
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
      include: { category: true },
    })
  ]);

  return {
    data: products,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};

export const getProductById = async (id: string, sellerId: string) => {
  return prisma.product.findUnique({
    where: { id, sellerId },
    include: { category: true },
  });
};

export const updateProduct = async (id: string, sellerId: string, data: UpdateProductDTO) => {
  const updatedProduct = await prisma.product.update({
    where: { id, sellerId },
    data,
  });
  if (updatedProduct.status === 'PUBLISHED') {
    getEventBus().publish({
      type: 'product.published',
      payload: { productId: updatedProduct.id, productName: updatedProduct.name, sellerId }
    });
  }
  return updatedProduct;
};

export const deleteProduct = async (id: string, sellerId: string) => {
  const archivedProduct = await prisma.product.update({
    where: { id, sellerId },
    data: { status: 'ARCHIVED' }
  });
  getEventBus().publish({
    type: 'product.archived',
    payload: { productId: id, sellerId }
  });
  return archivedProduct;
};
