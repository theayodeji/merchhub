import * as React from 'react';
import type { INotification, EmailPayload } from '../types';
import { OrderStatusEmail } from '../templates/OrderStatusEmail';

export class OrderStatusNotification implements INotification {
  constructor(
    private customerName: string,
    private orderId: string,
    private newStatus: string
  ) {}

  public toEmail(): EmailPayload {
    return {
      subject: `Update on your order #${this.orderId}`,
      template: React.createElement(OrderStatusEmail, {
        customerName: this.customerName,
        orderId: this.orderId,
        newStatus: this.newStatus
      })
    };
  }
}
