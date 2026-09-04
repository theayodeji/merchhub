import { NotificationManager } from './manager';
import { ResendProvider } from './providers/resend.provider';
import { MockEmailProvider } from './providers/mock.provider';

// Determine which provider to use based on environment
const isProd = process.env.NODE_ENV === 'production';
const provider = isProd ? new ResendProvider() : new MockEmailProvider();

export const notificationManager = new NotificationManager(provider);
