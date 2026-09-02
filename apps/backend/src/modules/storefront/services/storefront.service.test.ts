import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as storefrontService from './storefront.service';
import { prisma } from '../../../lib/__mocks__/prisma';
import { NotFoundError } from '../../../errors/AppError';

vi.mock('../../../lib/prisma');

describe('Storefront Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getCreatorByUsername', () => {
    it('should return creator profile with published products', async () => {
      const mockCreator = {
        id: 'creator_1',
        username: 'testcreator',
        products: [{ id: 'prod_1', status: 'PUBLISHED' }]
      };
      
      prisma.user.findUnique.mockResolvedValue(mockCreator as any);

      const result = await storefrontService.getCreatorByUsername('testcreator');

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { username: 'testcreator' },
        select: expect.any(Object)
      });
      expect(result).toEqual(mockCreator);
    });

    it('should throw NotFoundError if creator does not exist', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(storefrontService.getCreatorByUsername('nonexistent')).rejects.toThrow(NotFoundError);
    });
  });

  describe('getPublishedProducts', () => {
    it('should return paginated published products', async () => {
      const mockProducts = [{ id: 'prod_1' }, { id: 'prod_2' }];
      
      // Mock Promise.all resolving for findMany and count
      prisma.product.findMany.mockResolvedValue(mockProducts as any);
      prisma.product.count.mockResolvedValue(2);

      const result = await storefrontService.getPublishedProducts(1, 20);

      expect(prisma.product.findMany).toHaveBeenCalledWith({
        where: { status: 'PUBLISHED' },
        include: expect.any(Object),
        orderBy: { createdAt: 'desc' },
        skip: 0,
        take: 20
      });
      expect(prisma.product.count).toHaveBeenCalledWith({ where: { status: 'PUBLISHED' } });
      expect(result.data).toEqual(mockProducts);
      expect(result.meta.total).toBe(2);
    });
  });

  describe('getPublishedProductById', () => {
    it('should return a published product', async () => {
      const mockProduct = { id: 'prod_1', status: 'PUBLISHED' };
      prisma.product.findFirst.mockResolvedValue(mockProduct as any);

      const result = await storefrontService.getPublishedProductById('prod_1');

      expect(prisma.product.findFirst).toHaveBeenCalledWith({
        where: { id: 'prod_1', status: 'PUBLISHED' },
        include: expect.any(Object)
      });
      expect(result).toEqual(mockProduct);
    });

    it('should throw NotFoundError if product is not found or not published', async () => {
      prisma.product.findFirst.mockResolvedValue(null);

      await expect(storefrontService.getPublishedProductById('prod_missing')).rejects.toThrow(NotFoundError);
    });
  });
});
