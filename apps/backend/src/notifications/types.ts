import { ReactElement } from 'react';

export interface EmailPayload {
  subject: string;
  template: ReactElement;
}

export interface DatabasePayload {
  type: string;
  title: string;
  message?: string;
  actionUrl?: string;
  actorId?: string | null;
  metadata?: any;
  targetRole?: 'CREATOR' | 'CUSTOMER' | 'ALL';
}

export interface INotification {
  toEmail?(): EmailPayload;
  toDatabase?(): DatabasePayload;
}

export interface IEmailProvider {
  send(to: string, subject: string, html: string): Promise<void>;
}
