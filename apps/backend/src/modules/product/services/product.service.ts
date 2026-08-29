import { prisma } from '../../../lib/prisma';
import { CreateProductDto } from '../dto/product.dto';

export const createProduct = async (sellerId: string, data: CreateProductDto) => {
  return prisma.product.create({
    data: {
      ...data,
      sellerId,
    },
  });
};

export const getProductsBySeller = async (sellerId: string) => {
  return prisma.product.findMany({
    where: { sellerId },
    orderBy: { createdAt: 'desc' },
  });
};
