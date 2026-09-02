import { prisma } from '../../../lib/prisma';
import type { UpdateProfileDTO } from '@merchhub/shared';

export const updateProfile = async (userId: string, data: UpdateProfileDTO) => {
  return prisma.user.update({
    where: { id: userId },
    data: {
      username: data.username,
      bio: data.bio,
      creatorCategoryId: data.creatorCategoryId,
      displayUsername: data.displayUsername,
      socialLinks: data.socialLinks ?? undefined,
      image: data.image || undefined,
      isOnboarded: true
    },
  });
};
