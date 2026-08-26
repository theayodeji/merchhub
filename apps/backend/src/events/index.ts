import { EventEmitter } from 'events';

class AppEventEmitter extends EventEmitter {}

export const eventEmitter = new AppEventEmitter();

// Define known event types here
export const EVENTS = {
  ORDER_CREATED: 'ORDER_CREATED',
  PRODUCT_PUBLISHED: 'PRODUCT_PUBLISHED'
} as const;
