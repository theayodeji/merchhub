import { Request, Response, NextFunction } from 'express';
import { validateRequest } from './validate';
import { z } from 'zod';
import { BadRequestError } from '../errors/AppError';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('validateRequest middleware', () => {
  const schema = z.object({
    name: z.string().min(2, 'Name is too short'),
    age: z.number().min(18, 'Must be at least 18'),
  });

  const mockNext = vi.fn();
  const mockRes = {
    status: vi.fn().mockReturnThis(),
  } as unknown as Response;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call next() if validation succeeds and update req.body', async () => {
    const middleware = validateRequest(schema);
    const mockReq = {
      body: { name: 'Alice', age: 25 },
    } as Request;

    await middleware(mockReq, mockRes, mockNext);

    expect(mockReq.body).toEqual({ name: 'Alice', age: 25 });
    expect(mockNext).toHaveBeenCalledWith();
    expect(mockNext).toHaveBeenCalledTimes(1);
  });

  it('should call next() with BadRequestError if validation fails', async () => {
    const middleware = validateRequest(schema);
    const mockReq = {
      body: { name: 'A', age: 15 },
    } as Request;

    await middleware(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledTimes(1);
    const errorArg = mockNext.mock.calls[0][0];
    expect(errorArg).toBeInstanceOf(BadRequestError);
    expect(errorArg.message).toContain('name: Name is too short');
    expect(errorArg.message).toContain('age: Must be at least 18');
  });
});
