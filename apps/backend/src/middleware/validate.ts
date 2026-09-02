import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny, ZodIssue } from 'zod';
import { BadRequestError } from '../errors/AppError';
import asyncHandler from 'express-async-handler';

export const validateRequest = (schema: ZodTypeAny) => {
  return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      // Map Zod issues into a clear prompt of what is missing/invalid
      const issueMessages = result.error.issues.map((issue: ZodIssue) => {
        return `${issue.path.join('.')}: ${issue.message}`;
      });

      res.status(400);
      throw new BadRequestError(`Validation failed: ${issueMessages.join(', ')}`);
    }

    // Replace req.body with the successfully parsed and potentially coerced data
    req.body = result.data;
    next();
  });
};
