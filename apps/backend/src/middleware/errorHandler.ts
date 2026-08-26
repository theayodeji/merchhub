import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import logger from '../lib/logger';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    logger.error(`[AppError] ${err.statusCode} - ${err.message}`);
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  logger.error(`[UnhandledError] ${err.message}`, err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
};
