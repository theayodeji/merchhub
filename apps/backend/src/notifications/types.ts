import { ReactElement } from 'react';

export interface EmailPayload {
  subject: string;
  template: ReactElement;
}

export interface INotification {
  toEmail(): EmailPayload;
}

export interface IEmailProvider {
  send(to: string, subject: string, html: string): Promise<void>;
}
