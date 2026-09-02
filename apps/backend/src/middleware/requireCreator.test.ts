import { describe, it, expect, vi, beforeEach } from 'vitest';
import { requireCreator } from './requireCreator';
import { auth } from '../config/auth';
import { prisma } from '../lib/__mocks__/prisma';
import { ForbiddenError, UnAuthorizedError } from '../errors/AppError';
import { Request, Response, NextFunction } from 'express';

vi.mock('../config/auth', () => ({
  auth: {
    api: {
      getSession: vi.fn(),
    },
  },
}));

vi.mock('../lib/prisma');

describe('requireCreator Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    vi.clearAllMocks();
    req = { headers: {} };
    res = {
      status: vi.fn().mockReturnThis(),
    };
    next = vi.fn();
  });

  it('should pass UnAuthorizedError to next if no session exists', async () => {
    (auth.api.getSession as any).mockResolvedValue(null);

    await requireCreator(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).toHaveBeenCalledWith(expect.any(UnAuthorizedError));
  });

  it('should pass ForbiddenError to next if user does not exist in database', async () => {
    (auth.api.getSession as any).mockResolvedValue({ user: { id: 'user_1' } });
    prisma.user.findUnique.mockResolvedValue(null);

    await requireCreator(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).toHaveBeenCalledWith(expect.any(ForbiddenError));
  });

  it('should pass ForbiddenError to next if user is not a creator (no creatorCategoryId)', async () => {
    (auth.api.getSession as any).mockResolvedValue({ user: { id: 'user_1' } });
    prisma.user.findUnique.mockResolvedValue({ creatorCategoryId: null } as any);

    await requireCreator(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).toHaveBeenCalledWith(expect.any(ForbiddenError));
  });

  it('should attach sellerId to request and call next if user is a valid creator', async () => {
    (auth.api.getSession as any).mockResolvedValue({ user: { id: 'user_1' } });
    prisma.user.findUnique.mockResolvedValue({ creatorCategoryId: 'cat_1' } as any);

    await requireCreator(req as Request, res as Response, next);

    expect((req as any).sellerId).toBe('user_1');
    expect(next).toHaveBeenCalledOnce();
  });
});
