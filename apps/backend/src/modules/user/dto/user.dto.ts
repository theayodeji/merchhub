import { z } from 'zod';

export const updateProfileSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").optional(),
  bio: z.string().optional(),
  creatorCategoryId: z.string().uuid("Invalid category ID").optional(),
  displayUsername: z.string().optional(),
  socialLinks: z.preprocess((val) => {
    if (typeof val === 'string') {
      try {
        return JSON.parse(val);
      } catch (e) {
        return val;
      }
    }
    return val;
  }, z.record(z.string(), z.string().url("Must be a valid URL")).optional()),
  image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  role: z.enum(['CUSTOMER', 'CREATOR']).optional(),
});

export type UpdateProfileDto = z.infer<typeof updateProfileSchema>;
