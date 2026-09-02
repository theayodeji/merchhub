import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as productService from './product.service';
import { prisma } from '../../../lib/__mocks__/prisma';
import { NotFoundError } from '../../../errors/AppError';
import { ProductStatus } from '@merchhub/db';

vi.mock('../../../lib/prisma');

describe('Product Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getProductById', () => {
    it('should return a product when it exists and belongs to the seller', async () => {
      const mockProduct = {
        id: 'prod_1',
        name: 'Test Product',
        sellerId: 'seller_1',
        description: 'Test',
        price: 1000,
        status: ProductStatus.PUBLISHED,
        images: [],
        stock: 10,
        categoryId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Ensure mock resolves properly
      prisma.product.findUnique.mockResolvedValue(mockProduct as any);

      const result = await productService.getProductById('prod_1', 'seller_1');

      expect(prisma.product.findUnique).toHaveBeenCalledWith({
        where: { id: 'prod_1', sellerId: 'seller_1' },
        include: { category: true }
      });
      expect(result).toEqual(mockProduct);
    });

    it('should return null when the product does not exist for that seller', async () => {
      prisma.product.findUnique.mockResolvedValue(null);

      const result = await productService.getProductById('prod_1', 'wrong_seller');

      expect(prisma.product.findUnique).toHaveBeenCalledWith({
        where: { id: 'prod_1', sellerId: 'wrong_seller' },
        include: { category: true }
      });
      expect(result).toBeNull();
    });
  });

  describe('deleteProduct', () => {
    it('should successfully delete a product', async () => {
      prisma.product.delete.mockResolvedValue({} as any);

      await productService.deleteProduct('prod_1', 'seller_1');

      expect(prisma.product.delete).toHaveBeenCalledWith({
        where: { id: 'prod_1', sellerId: 'seller_1' },
      });
    });
  });
});
