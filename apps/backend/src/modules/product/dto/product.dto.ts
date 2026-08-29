import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be positive"),
  stock: z.number().int().nonnegative("Stock cannot be negative"),
  images: z.array(z.string().url()).min(1, "At least one image is required"),
  categoryId: z.string().uuid("Invalid category ID").optional(),
});

export type CreateProductDto = z.infer<typeof createProductSchema>;
