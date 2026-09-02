import { storageService } from '../lib/storage';

export const processImages = async (
  files: Express.Multer.File[] | undefined,
  existingImages: string[] = [],
): Promise<string[]> => {
  if (!files || files.length === 0) return existingImages;

  const uploadPromises = files.map((file) =>
    storageService.uploadFile(file, 'products'),
  );
  const newImages = await Promise.all(uploadPromises);

  return [...existingImages, ...newImages];
};

export const formatProductUrls = (product: any) => {
  if (product && product.images && Array.isArray(product.images)) {
    product.images = product.images.map((img: string) =>
      img.startsWith('http') ? img : storageService.getFileUrl(img),
    );
  }
  return product;
};
