import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as notificationService from '../services/notification.service';
import { NotFoundError } from '../../../errors/AppError';
import { storageService } from '../../../lib/storage';

const formatActorImage = (notification: any) => {
  if (notification.actor) {
    let profileImage = notification.actor.image;
    if (profileImage && !profileImage.startsWith('http')) {
      profileImage = storageService.getFileUrl(profileImage);
    }
    return {
      ...notification,
      actor: {
        id: notification.actor.id,
        name: notification.actor.name,
        profileImage,
      }
    };
  }
  return notification;
};

export const getNotifications = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const result = await notificationService.getNotifications(userId, req.query);
  
  res.json({
    data: result.data.map(formatActorImage),
    meta: result.meta
  });
});

export const markAsRead = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { id } = req.params;
  
  const notification = await notificationService.markAsRead(id, userId);
  
  if (!notification) {
    throw new NotFoundError('Notification not found');
  }
  
  res.json(notification);
});
