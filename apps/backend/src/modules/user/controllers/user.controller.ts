import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getProfile as fetchProfile } from '../services/get-profile.service';
import { updateProfile as editProfile } from '../services/update-profile.service';
import { getCategories as fetchCategories } from '../services/get-categories.service';
import { updateProfileSchema } from '../dto/user.dto';
import { storageService } from '../../../lib/storage';
import { prisma } from '../../../lib/prisma';

// req.user is set by the requireAuth middleware
export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  
  const profile = await fetchProfile(userId);
  if (!profile) {
    res.status(404);
    throw new Error('Profile not found');
  }
  
  if (profile.image && !profile.image.startsWith('http')) {
    profile.image = storageService.getFileUrl(profile.image);
  }
  
  res.json(profile);
});

export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  
  const data = updateProfileSchema.parse(req.body);
  
  if (req.file) {
    // Only storing path/key in database
    const imagePath = await storageService.uploadFile(req.file, 'avatars');
    data.image = imagePath;
  }
  
  if (data.username) {
    const existingUser = await prisma.user.findFirst({
      where: { username: data.username, id: { not: userId } }
    });
    if (existingUser) {
      res.status(400);
      throw new Error('Username is already taken');
    }
  }

  const profile = await editProfile(userId, data);
  
  if (profile.image && !profile.image.startsWith('http')) {
    profile.image = storageService.getFileUrl(profile.image);
  }
  
  res.json(profile);
});

export const getCategories = asyncHandler(async (req: Request, res: Response) => {
  const categories = await fetchCategories();
  res.json(categories);
});
