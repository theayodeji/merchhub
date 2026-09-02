import { processImages, formatProductUrls } from './image.utils';
import { storageService } from '../lib/storage';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('../lib/storage');

describe('Image Utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('processImages', () => {
    it('should upload files and return paths along with kept images', async () => {
      const mockFiles = [
        { originalname: 'new1.jpg' },
        { originalname: 'new2.png' }
      ] as Express.Multer.File[];
      const keptImages = ['existing1.jpg'];

      vi.mocked(storageService.uploadFile)
        .mockResolvedValueOnce('products/new1-123.jpg')
        .mockResolvedValueOnce('products/new2-456.png');

      const result = await processImages(mockFiles, keptImages);

      expect(storageService.uploadFile).toHaveBeenCalledTimes(2);
      expect(result).toEqual(['existing1.jpg', 'products/new1-123.jpg', 'products/new2-456.png']);
    });

    it('should return empty array if no files and no kept images', async () => {
      const result = await processImages([]);
      expect(result).toEqual([]);
    });
  });

  describe('formatProductUrls', () => {
    it('should convert relative paths to full URLs', () => {
      vi.mocked(storageService.getFileUrl).mockImplementation((key) => `https://bucket.s3.aws.com/${key}`);
      
      const product = {
        id: '1',
        images: ['path/to/img1.jpg', 'https://external.com/img2.jpg']
      };

      const result = formatProductUrls(product);

      expect(result.images).toEqual(['https://bucket.s3.aws.com/path/to/img1.jpg', 'https://external.com/img2.jpg']);
      expect(storageService.getFileUrl).toHaveBeenCalledWith('path/to/img1.jpg');
    });

    it('should return product unchanged if no images', () => {
      const product = { id: '1' };
      const result = formatProductUrls(product);
      expect(result).toEqual(product);
    });
  });
});
