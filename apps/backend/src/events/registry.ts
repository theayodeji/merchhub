import { registerOrderHandlers } from './handlers/order.handlers';
import { registerProductHandlers } from './handlers/product.handlers';
import { registerUserHandlers } from './handlers/user.handlers';
import { registerPaymentHandlers } from './handlers/payment.handlers';

export const registerAllHandlers = (): void => {
  registerOrderHandlers();
  registerProductHandlers();
  registerUserHandlers();
  registerPaymentHandlers();
  console.log('[EventBus] All handlers registered.');
};
