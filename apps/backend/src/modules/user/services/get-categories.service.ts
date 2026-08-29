import { prisma } from '../../../lib/prisma';

export const getCategories = async () => {
  return prisma.creatorCategory.findMany({
    orderBy: { name: 'asc' },
  });
};
