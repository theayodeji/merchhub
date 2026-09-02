import { z } from 'zod';
import { PaginationQuerySchema } from './pagination';

export const ProductFilterSchema = PaginationQuerySchema.extend({
  search: z.string().optional(),
  categoryId: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
});
