import { prisma } from '../../../lib/prisma';
import { PaginationQuerySchema } from '@merchhub/shared';

export const getNotifications = async (userId: string, query: { page?: number; limit?: number; role?: 'CREATOR' | 'CUSTOMER' }) => {
  const { page, limit } = PaginationQuerySchema.parse(query || {});
  const skip = (page - 1) * limit;

  const where: any = { userId };
  if (query.role) {
    // Return notifications targeting this specific role OR notifications meant for ALL roles
    where.targetRole = { in: [query.role, 'ALL'] };
  }

  const [total, notifications] = await prisma.$transaction([
    prisma.notification.count({ where }),
    prisma.notification.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        actor: {
          select: { id: true, name: true, image: true },
        },
      },
    }),
  ]);

  return {
    data: notifications,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const markAsRead = async (id: string, userId: string) => {
  const notification = await prisma.notification.findFirst({
    where: { id, userId },
  });

  if (!notification) {
    return null; // Will trigger 404 in controller
  }

  return prisma.notification.update({
    where: { id },
    data: { isRead: true },
  });
};
