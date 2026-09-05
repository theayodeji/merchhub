import * as React from 'react';
import type { INotification, EmailPayload, DatabasePayload } from '../types';
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

  public toDatabase(): DatabasePayload {
    return {
      type: 'ORDER_CONFIRMED',
      title: 'Order Confirmed ✅',
      message: `Your order #${this.orderId} for $${(this.total / 100).toFixed(2)} has been confirmed.`,
      actionUrl: `/profile/purchases?orderId=${this.orderId}`,
      actorId: null,
      targetRole: 'CUSTOMER',
      metadata: { orderId: this.orderId, total: this.total }
    };
  }
}
