import { EventEmitter } from 'events';
import type { IEventBus } from '../event-bus';
import type { AppEvent, EventType, EventPayload } from '../event-types';

export class EmitterDriver implements IEventBus {
  private emitter = new EventEmitter();

  constructor() {
    this.emitter.setMaxListeners(50);
  }

  publish(event: AppEvent): void {
    console.log(`[EventBus] Publishing: ${event.type}`);
    this.emitter.emit(event.type, event.payload);
  }

  subscribe<T extends EventType>(
    eventType: T,
    handler: (payload: EventPayload<T>) => void | Promise<void>
  ): void {
    this.emitter.on(eventType, (payload: EventPayload<T>) => {
      Promise.resolve(handler(payload)).catch(err => {
        console.error(`[EventBus] Handler error for "${eventType}":`, err);
      });
    });
  }
}
