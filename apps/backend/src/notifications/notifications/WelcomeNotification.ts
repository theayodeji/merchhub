import * as React from 'react';
import type { INotification, EmailPayload } from '../types';
import { WelcomeEmailTemplate } from '../templates/WelcomeEmail';

export class WelcomeNotification implements INotification {
  constructor(private name: string) {}

  public toEmail(): EmailPayload {
    return {
      subject: 'Welcome to MerchHub!',
      template: React.createElement(WelcomeEmailTemplate, { name: this.name })
    };
  }
}
