import * as React from 'react';
import type { INotification, EmailPayload } from '../types';
import { NewOrderAlertEmail } from '../templates/NewOrderAlertEmail';

export class NewOrderAlertNotification implements INotification {
  constructor(
    private orderId: string,
    private total: number
  ) {}

  public toEmail(): EmailPayload {
    return {
      subject: `New Order Received! #${this.orderId}`,
      template: React.createElement(NewOrderAlertEmail, {
        orderId: this.orderId,
        total: this.total
      })
    };
  }
}
