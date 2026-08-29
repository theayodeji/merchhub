import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import logger from './lib/logger';
import { errorHandler } from './middleware/errorHandler';

import { toNodeHandler } from 'better-auth/node';
import { auth } from './config/auth';
import { userRouter } from './modules/user/routes';
import { productRouter } from './modules/product/routes';

const app = express();

// Middlewares
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));

// --- BETTER AUTH MUST BE MOUNTED BEFORE express.json() ---
app.all('/api/auth/*', toNodeHandler(auth));
// ---------------------------------------------------------

app.use(express.json());

// Request logging with Morgan
app.use(morgan('combined', {
  stream: { write: (message) => logger.info(message.trim()) }
}));

// Setup modules (routes) here...
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Global error handler
app.use(errorHandler);

export default app;
