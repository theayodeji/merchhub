import { Request, Response, NextFunction } from 'express';
import { auth } from '../config/auth';
import { UnAuthorizedError } from '../errors/AppError';
import asyncHandler from 'express-async-handler';

export const requireAuth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // Extract headers required for better-auth
  const session = await auth.api.getSession({
    headers: req.headers as Record<string, string>
  });

  if (!session) {
    throw new UnAuthorizedError();
  }

  // Attach session and user to request
  (req as any).user = session.user;
  (req as any).session = session.session;

  next();
});
