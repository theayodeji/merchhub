import { z } from 'zod';

export const profileSchema = z.object({
  displayUsername: z.string().min(1, 'Storefront name is required').max(100),
  bio: z.string().max(1000).optional().default(''),
  creatorCategoryId: z.string().min(1, 'Category is required'),
  instagram: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  twitter: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  youtube: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  tiktok: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
