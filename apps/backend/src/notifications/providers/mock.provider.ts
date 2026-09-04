import logger from '../../lib/logger';
import type { IEmailProvider } from '../types';

export class MockEmailProvider implements IEmailProvider {
  async send(to: string, subject: string, html: string): Promise<void> {
    logger.info(`[MockEmailProvider] Pretending to send email to: ${to}`);
    logger.info(`[MockEmailProvider] Subject: ${subject}`);
    // console.log('[MockEmailProvider] HTML Preview:\\n', html);
  }
}
