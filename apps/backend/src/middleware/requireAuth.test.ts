import { describe, it, expect, vi, beforeEach } from 'vitest';
import { requireAuth } from './requireAuth';
import { auth } from '../config/auth';
import { UnAuthorizedError } from '../errors/AppError';
import { Request, Response, NextFunction } from 'express';

vi.mock('../config/auth', () => ({
  auth: {
    api: {
      getSession: vi.fn(),
    },
  },
}));

describe('requireAuth Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    vi.clearAllMocks();
    req = { headers: {} };
    res = {};
    next = vi.fn();
  });

  it('should pass UnAuthorizedError to next if no session exists', async () => {
    (auth.api.getSession as any).mockResolvedValue(null);

    await requireAuth(req as Request, res as Response, next);
    expect(next).toHaveBeenCalledWith(expect.any(UnAuthorizedError));
  });

  it('should attach user and session to request and call next if session exists', async () => {
    const mockSessionData = {
      user: { id: 'user_1' },
      session: { id: 'sess_1' },
    };
    (auth.api.getSession as any).mockResolvedValue(mockSessionData);

    await requireAuth(req as Request, res as Response, next);

    expect((req as any).user).toEqual(mockSessionData.user);
    expect((req as any).session).toEqual(mockSessionData.session);
    expect(next).toHaveBeenCalledOnce();
  });
});
