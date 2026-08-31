import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { auth } from '../config/auth';
import { prisma } from '../lib/prisma';
import { ForbiddenError, UnAuthorizedError } from '../errors/AppError';

export const requireCreator = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const session = await auth.api.getSession({ headers: new Headers(req.headers as any) });
  
  if (!session || !session.user) {
    res.status(401);
    throw new UnAuthorizedError('You are not authorized to access this');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { creatorCategoryId: true }
  });

  if (!user || !user.creatorCategoryId) {
    res.status(403);
    throw new ForbiddenError('Forbidden: You must set up a creator profile to access this resource.');
  }

  // Inject the creator's user ID into the request for downstream use
  (req as any).sellerId = session.user.id;
  
  next();
});
