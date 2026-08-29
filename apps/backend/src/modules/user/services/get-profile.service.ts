import { prisma } from '../../../lib/prisma';

export const getProfile = async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId },
    include: {
      creatorCategory: true,
    }
  });
};
