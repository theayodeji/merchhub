import { prisma } from '../../../lib/prisma';
import { NotFoundError } from '../../../errors/AppError';

export const getCreatorByUsername = async (username: string) => {
  const creator = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      name: true,
      username: true,
      displayUsername: true,
      image: true,
      bio: true,
      socialLinks: true,
      products: {
        where: { status: 'PUBLISHED' },
        include: { 
          category: true,
          _count: {
            select: { orderItems: true }
          }
        },
        orderBy: { 
          orderItems: { _count: 'desc' }
        }
      }
    }
  });

  if (!creator) {
    throw new NotFoundError('Creator not found');
  }

  return creator;
};

export const getPublishedProducts = async (page: number = 1, limit: number = 20) => {
  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where: { status: 'PUBLISHED' },
      include: { 
        category: true,
        seller: {
          select: {
            username: true,
            displayUsername: true,
            image: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.product.count({ where: { status: 'PUBLISHED' } })
  ]);

  return {
    data: products,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};

export const getPublishedProductById = async (id: string) => {
  const product = await prisma.product.findFirst({
    where: { id, status: 'PUBLISHED' },
    include: {
      category: true,
      seller: {
        select: {
          username: true,
          displayUsername: true,
          image: true,
        }
      }
    }
  });

  if (!product) {
    throw new NotFoundError('Product not found');
  }

  return product;
};
