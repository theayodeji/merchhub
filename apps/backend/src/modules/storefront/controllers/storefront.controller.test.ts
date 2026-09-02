import { Request, Response } from 'express';
import * as storefrontController from './storefront.controller';
import * as storefrontService from '../services/storefront.service';
import { NotFoundError } from '../../../errors/AppError';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('../services/storefront.service');

describe('Storefront Controller', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockReq = {
      params: {},
      query: {},
    };
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
  });

  describe('getCreatorStorefront', () => {
    it('should throw NotFoundError if creator not found', async () => {
      mockReq.params = { username: 'unknown' };
      vi.mocked(storefrontService.getCreatorByUsername).mockRejectedValue(new NotFoundError('Creator not found'));

      await storefrontController.getCreatorStorefront(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledTimes(1);
      const error = mockNext.mock.calls[0][0];
      expect(error).toBeInstanceOf(NotFoundError);
      expect(error.message).toBe('Creator not found');
    });

    it('should return storefront data if creator found', async () => {
      mockReq.params = { username: 'creator1' };
      const mockCreator = { id: 'c-1', displayUsername: 'Creator One', products: [] };
      vi.mocked(storefrontService.getCreatorByUsername).mockResolvedValue(mockCreator as any);

      await storefrontController.getCreatorStorefront(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.json).toHaveBeenCalledWith(mockCreator);
    });
  });

  describe('getMarketplaceFeed', () => {
    it('should return marketplace feed', async () => {
      const mockResponse = { data: [], meta: {} };
      vi.mocked(storefrontService.getPublishedProducts).mockResolvedValue(mockResponse as any);

      await storefrontController.getMarketplaceFeed(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.json).toHaveBeenCalledWith(mockResponse);
    });
  });

  describe('getProductDetails', () => {
    it('should throw NotFoundError if product not found', async () => {
      mockReq.params = { id: 'unknown-prod' };
      vi.mocked(storefrontService.getPublishedProductById).mockRejectedValue(new NotFoundError('Product not found'));

      await storefrontController.getProductDetails(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledTimes(1);
      const error = mockNext.mock.calls[0][0];
      expect(error).toBeInstanceOf(NotFoundError);
      expect(error.message).toBe('Product not found');
    });

    it('should return product details', async () => {
      mockReq.params = { id: 'prod-1' };
      const mockProduct = { id: 'prod-1', images: [] };
      vi.mocked(storefrontService.getPublishedProductById).mockResolvedValue(mockProduct as any);

      await storefrontController.getProductDetails(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.json).toHaveBeenCalled();
    });
  });
});
