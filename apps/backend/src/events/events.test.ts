import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EmitterDriver } from './drivers/emitter.driver';
import { initEventBus, getEventBus } from './event-bus';
import { registerAllHandlers } from './registry';

describe('Event System', () => {
  beforeEach(() => {
    // Re-initialize the bus with a fresh driver for each test
    initEventBus(new EmitterDriver());
    vi.restoreAllMocks();
  });

  describe('Event Bus & Driver', () => {
    it('should correctly initialize and return the singleton instance', () => {
      const bus = getEventBus();
      expect(bus).toBeDefined();
      expect(bus).toBeInstanceOf(EmitterDriver);
    });

    it('should publish events and trigger subscribed handlers synchronously', () => {
      const bus = getEventBus();
      const mockHandler = vi.fn();

      bus.subscribe('order.created', mockHandler);

      const payload = {
        orderId: 'order_1',
        sellerId: 'seller_1',
        customerName: 'Test Buyer',
        customerEmail: 'test@example.com',
        total: 100,
        items: []
      };

      bus.publish({
        type: 'order.created',
        payload
      });

      expect(mockHandler).toHaveBeenCalledTimes(1);
      expect(mockHandler).toHaveBeenCalledWith(payload);
    });

    it('should support multiple subscribers for the same event type', () => {
      const bus = getEventBus();
      const handlerOne = vi.fn();
      const handlerTwo = vi.fn();

      bus.subscribe('user.registered', handlerOne);
      bus.subscribe('user.registered', handlerTwo);

      const payload = {
        userId: 'user_1',
        email: 'hello@world.com',
        name: 'Hello World'
      };

      bus.publish({
        type: 'user.registered',
        payload
      });

      expect(handlerOne).toHaveBeenCalledTimes(1);
      expect(handlerOne).toHaveBeenCalledWith(payload);
      
      expect(handlerTwo).toHaveBeenCalledTimes(1);
      expect(handlerTwo).toHaveBeenCalledWith(payload);
    });

    it('should catch errors thrown by handlers to prevent crashing the publisher', async () => {
      const bus = getEventBus();
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      const failingHandler = vi.fn().mockRejectedValue(new Error('Handler failed'));
      const successfulHandler = vi.fn();

      bus.subscribe('product.archived', failingHandler);
      bus.subscribe('product.archived', successfulHandler);

      bus.publish({
        type: 'product.archived',
        payload: { productId: 'prod_1', sellerId: 'seller_1' }
      });

      // Wait a tick for the promise catch block to execute
      await new Promise(process.nextTick);

      expect(failingHandler).toHaveBeenCalledTimes(1);
      expect(successfulHandler).toHaveBeenCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledWith(
        '[EventBus] Handler error for "product.archived":',
        expect.any(Error)
      );
    });
  });

  describe('Handler Registry', () => {
    it('should register domain handlers without throwing', () => {
      // Spy on the bus to verify subscriptions happen
      const bus = getEventBus();
      const subscribeSpy = vi.spyOn(bus, 'subscribe');

      // Should run successfully without throwing
      expect(() => registerAllHandlers()).not.toThrow();

      // Ensure that subscriptions were made across multiple domains
      expect(subscribeSpy).toHaveBeenCalledWith('order.created', expect.any(Function));
      expect(subscribeSpy).toHaveBeenCalledWith('product.published', expect.any(Function));
      expect(subscribeSpy).toHaveBeenCalledWith('user.onboarded', expect.any(Function));
      
      // Total subscriptions should be exactly 7 based on our current handler stubs
      expect(subscribeSpy).toHaveBeenCalledTimes(7);
    });
  });
});
