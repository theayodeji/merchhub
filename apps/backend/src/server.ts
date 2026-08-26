import app from './app';
import logger from './lib/logger';

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  logger.info(`🔥 Server running on port ${PORT}`);
});

// Graceful shutdown
const shutdown = () => {
  logger.info('Shutting down server...');
  server.close(() => {
    logger.info('Server closed.');
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
