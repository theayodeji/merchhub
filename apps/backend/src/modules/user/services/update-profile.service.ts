import { prisma } from '../../../lib/prisma';
import type { UpdateProfileDTO } from '@merchhub/shared';
import { getEventBus } from '../../../events/event-bus';

export const updateProfile = async (userId: string, data: UpdateProfileDTO) => {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      username: data.username,
      bio: data.bio,
      creatorCategoryId: data.creatorCategoryId,
      displayUsername: data.displayUsername,
      socialLinks: data.socialLinks ?? undefined,
      image: data.image || undefined,
      role: data.role || undefined,
      isOnboarded: true
    },
  });
  if (data.role) {
    getEventBus().publish({
      type: 'user.onboarded',
      payload: { userId, role: data.role }
    });
  }
  return updatedUser;
};
