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
import { storefrontRouter } from './modules/storefront/routes';
import { orderRouter } from './modules/order/routes';
import { notificationRouter } from './modules/notification/routes/notification.routes';

import { initEventBus } from './events/event-bus';
import { EmitterDriver } from './events/drivers/emitter.driver';
import { registerAllHandlers } from './events/registry';

const app = express();

// Initialize Event Bus before anything else
initEventBus(new EmitterDriver());
registerAllHandlers();

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
app.use('/api/storefront', storefrontRouter);
app.use('/api/orders', orderRouter);
app.use('/api/notifications', notificationRouter);
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Global error handler
app.use(errorHandler);

export default app;
