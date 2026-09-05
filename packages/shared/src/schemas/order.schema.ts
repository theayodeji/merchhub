import { z } from 'zod';

export const baseOrderSchema = z.object({
  id: z.string().uuid(),
  buyerId: z.string().uuid().nullable(),
  sellerId: z.string().uuid(),
  totalAmount: z.number().positive(),
  status: z.enum(['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']),
  customerName: z.string(),
  customerEmail: z.string().email(),
  customerPhone: z.string(),
  deliveryAddress: z.string(),
  paymentReference: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  items: z.array(z.object({
    id: z.string().uuid(),
    productId: z.string().uuid(),
    quantity: z.number().int().positive(),
    unitPrice: z.number().positive(),
    total: z.number().positive(),
  })).optional(),
});

export const createOrderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string().uuid(),
      quantity: z.number().int().positive(),
    })
  ).min(1, "Cart cannot be empty"),
  customerName: z.string(),
  customerEmail: z.string().email(),
  customerPhone: z.string(),
  deliveryAddress: z.string(),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'])
});

// Types going out (Responses)
export type OrderResponseDTO = z.infer<typeof baseOrderSchema>;

// Types going in (Requests)
export type CreateOrderDTO = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusDTO = z.infer<typeof updateOrderStatusSchema>;

export const verifyOrderSchema = z.object({
  email: z.string().email(),
});

export type VerifyOrderDTO = z.infer<typeof verifyOrderSchema>;
