import { z } from 'zod';

export const createOrderSchema = z.object({
  productId: z.string().uuid('Invalid product ID'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
  customerName: z.string().min(2, 'Name is required').max(100),
  customerPhone: z.string().min(5, 'Phone is required').max(20),
  customerEmail: z.string().email('Invalid email address').optional(),
  deliveryAddress: z.string().min(5, 'Delivery address is required').max(500),
});

export type CreateOrderDto = z.infer<typeof createOrderSchema>;
