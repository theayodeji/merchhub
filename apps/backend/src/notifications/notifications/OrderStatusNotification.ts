import * as React from 'react';
import type { INotification, EmailPayload, DatabasePayload } from '../types';
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

  public toDatabase(): DatabasePayload {
    return {
      type: 'ORDER_STATUS',
      title: 'Order Update 📦',
      message: `Your order status has been updated to ${this.newStatus.replace(/_/g, ' ')}.`,
      actionUrl: `/profile/purchases?orderId=${this.orderId}`,
      actorId: null,
      targetRole: 'CUSTOMER',
      metadata: { orderId: this.orderId, status: this.newStatus }
    };
  }
}
