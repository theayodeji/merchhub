import { render } from '@react-email/render';
import type { IEmailProvider, INotification } from './types';
import logger from '../lib/logger';
import { prisma } from '../lib/prisma';

export class NotificationManager {
  constructor(private emailProvider: IEmailProvider) {}

  /**
   * Async send. Currently executes immediately but awaits resolution.
   * In the future, this method signature will remain identical, but 
   * internally it will enqueue a BullMQ/SQS job instead.
   */
  async send(user: { id?: string; email: string; name?: string }, notification: INotification): Promise<void> {
    try {
      // 1. Send Email (Push) if supported
      if (notification.toEmail) {
        const emailPayload = notification.toEmail();
        const html = await render(emailPayload.template);
        await this.emailProvider.send(user.email, emailPayload.subject, html);
      }
      
      // 2. Save to DB (Pull) if supported and user has an ID
      if (notification.toDatabase && user.id) {
        const dbPayload = notification.toDatabase();
        await prisma.notification.create({
          data: {
            userId: user.id,
            type: dbPayload.type,
            title: dbPayload.title,
            message: dbPayload.message,
            actionUrl: dbPayload.actionUrl,
            actorId: dbPayload.actorId,
            targetRole: dbPayload.targetRole ?? 'ALL',
            metadata: dbPayload.metadata || {},
          }
        });
      }

      logger.info(`[NotificationManager] Successfully processed notification for ${user.email}`);
    } catch (error) {
      // Basic fault tolerance: log the error so we can find it in Datadog/Sentry,
      // but do not crash the caller (e.g. don't block order placement).
      logger.error(`[NotificationManager] Failed to send notification to ${user.email}:`, error);
    }
  }
}
