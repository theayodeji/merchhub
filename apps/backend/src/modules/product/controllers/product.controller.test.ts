import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../../../types/request';
import * as productController from './product.controller';
import * as productService from '../services/product.service';
import { storageService } from '../../../lib/storage';
import { processImages } from '../../../utils/image.utils';
import { BadRequestError, NotFoundError } from '../../../errors/AppError';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('../services/product.service');
vi.mock('../../../lib/storage');
vi.mock('../../../utils/image.utils');

describe('Product Controller', () => {
  let mockReq: Partial<AuthenticatedRequest>;
  let mockRes: Partial<Response>;
  let mockNext = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockReq = {
      user: { id: 'seller-1' } as any,
      params: {},
      body: {},
    };
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
  });

  describe('createProduct', () => {
    it('should throw BadRequestError if no images are provided', async () => {
      mockReq.files = [];

      await productController.createProduct(mockReq as AuthenticatedRequest, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledTimes(1);
      const error = mockNext.mock.calls[0][0];
      expect(error).toBeInstanceOf(BadRequestError);
      expect(error.message).toBe('At least one product image is required');
    });

    it('should create product and return 201', async () => {
      const mockFiles = [{ originalname: 'test.jpg' }] as any[];
      mockReq.files = mockFiles;
      mockReq.body = { name: 'Test Product' };

      vi.mocked(processImages).mockResolvedValue(['processed.jpg']);
      vi.mocked(productService.createProduct).mockResolvedValue({
        id: 'prod-1',
        name: 'Test Product',
        images: ['processed.jpg'],
      } as any);

      await productController.createProduct(mockReq as AuthenticatedRequest, mockRes as Response, mockNext);

      expect(processImages).toHaveBeenCalledWith(mockFiles);
      expect(productService.createProduct).toHaveBeenCalledWith('seller-1', { name: 'Test Product', images: ['processed.jpg'] });
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalled();
    });
  });

  describe('getProduct', () => {
    it('should throw NotFoundError if product not found', async () => {
      mockReq.params = { id: 'prod-not-found' };
      vi.mocked(productService.getProductById).mockResolvedValue(null);

      await productController.getProduct(mockReq as AuthenticatedRequest, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledTimes(1);
      const error = mockNext.mock.calls[0][0];
      expect(error).toBeInstanceOf(NotFoundError);
      expect(error.message).toBe('Product not found');
    });

    it('should return product if found', async () => {
      mockReq.params = { id: 'prod-1' };
      const productMock = { id: 'prod-1', images: [] } as any;
      vi.mocked(productService.getProductById).mockResolvedValue(productMock);

      await productController.getProduct(mockReq as AuthenticatedRequest, mockRes as Response, mockNext);

      expect(mockRes.json).toHaveBeenCalled();
    });
  });

  describe('deleteProduct', () => {
    it('should throw NotFoundError if product not found', async () => {
      mockReq.params = { id: 'prod-not-found' };
      vi.mocked(productService.getProductById).mockResolvedValue(null);

      await productController.deleteProduct(mockReq as AuthenticatedRequest, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledTimes(1);
      const error = mockNext.mock.calls[0][0];
      expect(error).toBeInstanceOf(NotFoundError);
    });

    it('should archive product and preserve its images', async () => {
      mockReq.params = { id: 'prod-1' };
      const productMock = { id: 'prod-1', images: ['img1.jpg', 'img2.jpg'] } as any;
      vi.mocked(productService.getProductById).mockResolvedValue(productMock);

      await productController.deleteProduct(mockReq as Request, mockRes as Response, mockNext);

      expect(productService.deleteProduct).toHaveBeenCalledWith('prod-1', 'seller-1');
      expect(storageService.deleteFile).not.toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith({ success: true, message: 'Product archived successfully' });
    });
  });
});
