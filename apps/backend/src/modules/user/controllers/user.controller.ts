import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getProfile as fetchProfile } from '../services/get-profile.service';
import { updateProfile as editProfile } from '../services/update-profile.service';
import { getCategories as fetchCategories } from '../services/get-categories.service';
import { storageService } from '../../../lib/storage';
import { prisma } from '../../../lib/prisma';
import { ForbiddenError, BadRequestError, NotFoundError } from '../../../errors/AppError';

// req.user is set by the requireAuth middleware
export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  
  const profile = await fetchProfile(userId);
  if (!profile) {
    res.status(404);
    throw new NotFoundError('Profile not found');
  }
  
  if (profile.image && !profile.image.startsWith('http')) {
    profile.image = storageService.getFileUrl(profile.image);
  }
  
  res.json(profile);
});

export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  
  const data = req.body;
  
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
      throw new BadRequestError('Username is already taken');
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

export const updateRole = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { role } = req.body;
  
  if (role !== 'CUSTOMER' && role !== 'CREATOR') {
    res.status(400);
    throw new BadRequestError('Invalid role specified.');
  }

  // Prevent users from switching to CREATOR if they haven't set up a creator profile
  if (role === 'CREATOR') {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user?.creatorCategoryId) {
      res.status(403);
      throw new ForbiddenError('You must set up your creator profile first.');
    }
  }

  const profile = await prisma.user.update({
    where: { id: userId },
    data: { role, isOnboarded: true }
  });

  res.json(profile);
});
