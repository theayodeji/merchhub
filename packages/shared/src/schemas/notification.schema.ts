import { z } from 'zod';

export const baseNotificationSchema = z.object({
  id: z.string().cuid(),
  userId: z.string().uuid(),
  actorId: z.string().uuid().nullable(),
  type: z.string(),
  title: z.string(),
  message: z.string().nullable(),
  actionUrl: z.string().nullable(),
  isRead: z.boolean(),
  metadata: z.any().nullable(),
  createdAt: z.date(),
});

export const updateNotificationSchema = z.object({
  isRead: z.boolean(),
});

export type NotificationResponseDTO = z.infer<typeof baseNotificationSchema>;
export type UpdateNotificationDTO = z.infer<typeof updateNotificationSchema>;
