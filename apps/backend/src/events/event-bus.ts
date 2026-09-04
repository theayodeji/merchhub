import type { AppEvent, EventType, EventPayload } from './event-types';

export interface IEventBus {
  publish(event: AppEvent): void;
  subscribe<T extends EventType>(
    eventType: T,
    handler: (payload: EventPayload<T>) => void | Promise<void>
  ): void;
}

let _instance: IEventBus | null = null;

export const getEventBus = (): IEventBus => {
  if (!_instance) throw new Error('[EventBus] Not initialized. Try restarting the server.');
  return _instance;
};

export const initEventBus = (driver: IEventBus): void => {
  _instance = driver;
  console.log('[EventBus] Initialized.');
};
