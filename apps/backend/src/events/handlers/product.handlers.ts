import { getEventBus } from '../event-bus';

export const registerProductHandlers = (): void => {
  const bus = getEventBus();

  bus.subscribe('product.created', async (payload) => {
    console.log(`[ProductHandler] product.created — productId: ${payload.productId}, status: ${payload.status}`);
  });

  bus.subscribe('product.published', async (payload) => {
    console.log(`[ProductHandler] product.published — productId: ${payload.productId}`);
    // TODO (V2 — Follows): Notify creator's followers
  });

  bus.subscribe('product.archived', async (payload) => {
    console.log(`[ProductHandler] product.archived — productId: ${payload.productId}`);
  });
};
