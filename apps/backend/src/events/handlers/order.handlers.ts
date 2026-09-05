import { getEventBus } from '../event-bus';
import { notificationManager } from '../../notifications';
import { OrderConfirmationNotification } from '../../notifications/notifications/OrderConfirmationNotification';
import { NewOrderAlertNotification } from '../../notifications/notifications/NewOrderAlertNotification';
import { OrderStatusNotification } from '../../notifications/notifications/OrderStatusNotification';
import { prisma } from '../../lib/prisma'; // Need prisma to get the seller email

export const registerOrderHandlers = (): void => {
  const bus = getEventBus();

  bus.subscribe('order.created', async (payload) => {
    console.log(`[OrderHandler] order.created — orderId: ${payload.orderId}, customer: ${payload.customerEmail}`);
    // Note: Emails are NOT sent here because the payment is still PENDING.
    // The buyer might abandon the checkout. Emails are sent on 'payment.completed'.
  });

  bus.subscribe('order.status_changed', async (payload) => {
    console.log(`[OrderHandler] order.status_changed — orderId: ${payload.orderId}, status: ${payload.previousStatus} → ${payload.newStatus}`);
    
    // Notify buyer of status change
    const statusUpdate = new OrderStatusNotification(
      payload.customerName,
      payload.orderId,
      payload.newStatus
    );
    await notificationManager.send({ id: payload.buyerId || undefined, email: payload.customerEmail, name: payload.customerName }, statusUpdate);
  });
};
