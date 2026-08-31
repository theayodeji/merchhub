import { prisma } from '../../../lib/prisma';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';

export const createProduct = async (sellerId: string, data: CreateProductDto) => {
  return prisma.product.create({
    data: {
      ...data,
      sellerId,
    },
  });
};

export const getCategories = async () => {
  return prisma.category.findMany({
    orderBy: { name: 'asc' },
  });
};

export const getProductsBySeller = async (sellerId: string) => {
  return prisma.product.findMany({
    where: { sellerId },
    orderBy: { createdAt: 'desc' },
    include: { category: true },
  });
};

export const getProductById = async (id: string, sellerId: string) => {
  return prisma.product.findUnique({
    where: { id, sellerId },
    include: { category: true },
  });
};

export const updateProduct = async (id: string, sellerId: string, data: UpdateProductDto) => {
  return prisma.product.update({
    where: { id, sellerId },
    data,
  });
};

export const deleteProduct = async (id: string, sellerId: string) => {
  return prisma.product.delete({
    where: { id, sellerId },
  });
};
