import { Resend } from 'resend';
import type { IEmailProvider } from '../types';

export class ResendProvider implements IEmailProvider {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY || 're_mock');
  }

  async send(to: string, subject: string, html: string): Promise<void> {
    await this.resend.emails.send({
      from: process.env.EMAIL_FROM || 'MerchHub <noreply@merchhub.app>',
      to,
      subject,
      html,
    });
  }
}
