import { z } from 'zod';
import { PaginationQuerySchema } from './pagination';

export const ProductStatus = z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']);
export const OrderStatus = z.enum(['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']);

export const DashboardProductFilterSchema = PaginationQuerySchema.extend({
  search: z.string().optional(),
  status: ProductStatus.optional(),
});

export const DashboardOrderFilterSchema = PaginationQuerySchema.extend({
  search: z.string().optional(),
  status: OrderStatus.optional(),
  dateRange: z.string().optional(), // e.g. "30d", "7d", "all"
});

export type DashboardProductFilterDTO = z.infer<typeof DashboardProductFilterSchema>;
export type DashboardOrderFilterDTO = z.infer<typeof DashboardOrderFilterSchema>;
