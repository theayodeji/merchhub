import { getEventBus } from '../event-bus';
import { notificationManager } from '../../notifications';
import { OrderConfirmationNotification } from '../../notifications/notifications/OrderConfirmationNotification';
import { NewOrderAlertNotification } from '../../notifications/notifications/NewOrderAlertNotification';
import { prisma } from '../../lib/prisma';

export const registerPaymentHandlers = (): void => {
  const bus = getEventBus();

  bus.subscribe('payment.completed', async (payload) => {
    console.log(`[PaymentHandler] payment.completed — transactionId: ${payload.transactionId}, amount: ${payload.amount}`);
    
    // The payment is complete! Now we can safely fetch the orders and send the emails.
    const orders = await prisma.order.findMany({
      where: { id: { in: payload.orderIds } },
      include: {
        items: {
          include: { product: true }
        },
        seller: true
      }
    });

    for (const order of orders) {
      // 1. Send buyer confirmation email (one per order to keep it simple, or group them later)
      const confirmation = new OrderConfirmationNotification(
        order.customerName,
        order.id,
        order.total,
        order.items.map(item => ({
          productName: item.product.name,
          quantity: item.quantity,
          unitPrice: item.unitPrice
        }))
      );
      await notificationManager.send({ id: order.buyerId || undefined, email: order.customerEmail || 'no-email@test.com', name: order.customerName }, confirmation);

      // 2. Alert creator of new order
      const alert = new NewOrderAlertNotification(order.id, order.total, order.buyerId || undefined);
      await notificationManager.send({ id: order.seller.id, email: order.seller.email, name: order.seller.name || 'Creator' }, alert);
    }
  });
};
