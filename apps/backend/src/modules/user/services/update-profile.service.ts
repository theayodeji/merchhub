import { prisma } from '../../../lib/prisma';
import { UpdateProfileDto } from '../dto/user.dto';

export const updateProfile = async (userId: string, data: UpdateProfileDto) => {
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
