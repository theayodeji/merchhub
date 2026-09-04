import * as React from 'react';
import type { INotification, EmailPayload } from '../types';
import { OrderConfirmationEmail } from '../templates/OrderConfirmationEmail';

export class OrderConfirmationNotification implements INotification {
  constructor(
    private customerName: string,
    private orderId: string,
    private total: number,
    private items: Array<{ productName: string; quantity: number; unitPrice: number }>
  ) {}

  public toEmail(): EmailPayload {
    return {
      subject: `Order Confirmation #${this.orderId}`,
      template: React.createElement(OrderConfirmationEmail, {
        customerName: this.customerName,
        orderId: this.orderId,
        total: this.total,
        items: this.items
      })
    };
  }
}
