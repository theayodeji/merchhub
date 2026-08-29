import { z } from 'zod';

export const updateProfileSchema = z.object({
  bio: z.string().optional(),
  creatorCategoryId: z.string().uuid("Invalid category ID").optional(),
  displayUsername: z.string().optional(),
  socialLinks: z.record(z.string(), z.url()).optional(),
  image: z.url("Must be a valid URL").optional().or(z.literal("")),
});

export type UpdateProfileDto = z.infer<typeof updateProfileSchema>;
