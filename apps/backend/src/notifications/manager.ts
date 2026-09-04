import { render } from '@react-email/render';
import type { IEmailProvider, INotification } from './types';
import logger from '../lib/logger';

export class NotificationManager {
  constructor(private emailProvider: IEmailProvider) {}

  /**
   * Async send. Currently executes immediately but awaits resolution.
   * In the future, this method signature will remain identical, but 
   * internally it will enqueue a BullMQ/SQS job instead.
   */
  async send(user: { email: string; name?: string }, notification: INotification): Promise<void> {
    try {
      const emailPayload = notification.toEmail();
      const html = await render(emailPayload.template);
      
      await this.emailProvider.send(user.email, emailPayload.subject, html);
      logger.info(`[NotificationManager] Successfully sent notification to ${user.email}`);
    } catch (error) {
      // Basic fault tolerance: log the error so we can find it in Datadog/Sentry,
      // but do not crash the caller (e.g. don't block order placement).
      logger.error(`[NotificationManager] Failed to send notification to ${user.email}:`, error);
    }
  }
}
