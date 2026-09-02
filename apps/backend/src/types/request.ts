import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    name?: string;
    username?: string;
    role?: string;
    [key: string]: any;
  };
  session: any;
}
