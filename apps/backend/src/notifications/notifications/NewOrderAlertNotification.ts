import * as React from 'react';
import type { INotification, EmailPayload, DatabasePayload } from '../types';
import { NewOrderAlertEmail } from '../templates/NewOrderAlertEmail';

export class NewOrderAlertNotification implements INotification {
  constructor(
    private orderId: string,
    private total: number,
    private buyerId?: string
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

  public toDatabase(): DatabasePayload {
    return {
      type: 'NEW_ORDER',
      title: 'New Order Received! 🎉',
      message: `You just received a new order for $${(this.total / 100).toFixed(2)}.`,
      actionUrl: `/dashboard/orders/${this.orderId}`,
      actorId: this.buyerId || null,
      targetRole: 'CREATOR',
      metadata: { orderId: this.orderId, total: this.total }
    };
  }
}
