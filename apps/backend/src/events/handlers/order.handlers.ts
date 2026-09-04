import { getEventBus } from '../event-bus';

export const registerOrderHandlers = (): void => {
  const bus = getEventBus();

  bus.subscribe('order.created', async (payload) => {
    console.log(`[OrderHandler] order.created — orderId: ${payload.orderId}, customer: ${payload.customerEmail}`);
    // TODO (Notifications Phase): Send buyer confirmation email
    // TODO (Notifications Phase): Alert creator of new order
  });

  bus.subscribe('order.status_changed', async (payload) => {
    console.log(`[OrderHandler] order.status_changed — orderId: ${payload.orderId}, status: ${payload.previousStatus} → ${payload.newStatus}`);
    // TODO (Notifications Phase): Notify buyer of status change
  });
};
