import { getEventBus } from '../event-bus';
import { notificationManager } from '../../notifications';
import { WelcomeNotification } from '../../notifications/notifications/WelcomeNotification';

export const registerUserHandlers = (): void => {
  const bus = getEventBus();

  bus.subscribe('user.registered', async (payload) => {
    console.log(`[UserHandler] user.registered — userId: ${payload.userId}, email: ${payload.email}`);
    
    // Trigger Welcome Email
    const notification = new WelcomeNotification(payload.name || 'Creator');
    await notificationManager.send({ email: payload.email, name: payload.name || 'Creator' }, notification);
  });

  bus.subscribe('user.onboarded', async (payload) => {
    console.log(`[UserHandler] user.onboarded — userId: ${payload.userId}, role: ${payload.role}`);
  });
};
