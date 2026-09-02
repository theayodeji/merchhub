import { z } from 'zod';

export const baseProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().max(2000).default(''),
  price: z.coerce.number().min(0.01, 'Price must be greater than 0'),
  stock: z.coerce.number().int().min(0, 'Stock cannot be negative'),
  images: z.array(z.string()).optional(),
  categoryId: z.string().uuid('Invalid category ID').optional().nullable(),
  sellerId: z.string().uuid('Invalid seller ID'),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createProductSchema = baseProductSchema.omit({
  id: true,
  sellerId: true, // Derived from auth token on backend
  createdAt: true,
  updatedAt: true,
}).extend({
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional().default('DRAFT'),
});

export const updateProductSchema = createProductSchema.partial();

export const productFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().max(2000).optional(),
  price: z.coerce.number().min(0.01, 'Price must be greater than 0'),
  stock: z.coerce.number().int().min(0, 'Stock cannot be negative'),
  categoryId: z.string().min(1, 'Category is required'),
  status: z.enum(['DRAFT', 'PUBLISHED']),
});

// Types going out (Responses)
export type ProductResponseDTO = z.infer<typeof baseProductSchema>;

// Types going in (Requests)
export type CreateProductDTO = z.infer<typeof createProductSchema>;
export type UpdateProductDTO = z.infer<typeof updateProductSchema>;
export type ProductFormData = z.infer<typeof productFormSchema>;
