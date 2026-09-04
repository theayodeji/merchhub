import { z } from 'zod';

export const baseUserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().nullable(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  role: z.enum(['CUSTOMER', 'CREATOR', 'ADMIN']),
  username: z.string().nullable(),
  displayUsername: z.string().nullable(),
  bio: z.string().nullable(),
  socialLinks: z.any().nullable(), // JSON in DB
  creatorCategoryId: z.string().uuid().nullable(),
  isOnboarded: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const updateProfileSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").optional(),
  displayUsername: z.string().min(1, "Display username cannot be empty").optional(),
  bio: z.string().optional(),
  socialLinks: z.preprocess(
    (val) => (typeof val === 'string' ? JSON.parse(val) : val),
    z.record(z.string(), z.string())
  ).optional(),
  creatorCategoryId: z.string().uuid().optional(),
  image: z.string().optional(),
  role: z.enum(['CUSTOMER', 'CREATOR', 'ADMIN']).optional(),
});

export const profileFormSchema = z.object({
  displayUsername: z.string().min(1, 'Storefront name is required').max(100),
  bio: z.string().max(1000).optional().default(''),
  creatorCategoryId: z.string().min(1, 'Category is required'),
  instagram: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  twitter: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  youtube: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  tiktok: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

export const updateRoleSchema = z.object({
  role: z.enum(['CUSTOMER', 'CREATOR', 'ADMIN']),
});

// Types going out (Responses)
export type UserResponseDTO = z.infer<typeof baseUserSchema>;

// Types going in (Requests)
export type UpdateProfileDTO = z.infer<typeof updateProfileSchema>;
export type UpdateRoleDTO = z.infer<typeof updateRoleSchema>;
export type ProfileFormData = z.infer<typeof profileFormSchema>;
