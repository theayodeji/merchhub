import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import logger from './lib/logger';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Request logging with Morgan
app.use(morgan('combined', {
  stream: { write: (message) => logger.info(message.trim()) }
}));

// Setup modules (routes) here...
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Global error handler
app.use(errorHandler);

export default app;
