import { registerOrderHandlers } from './handlers/order.handlers';
import { registerProductHandlers } from './handlers/product.handlers';
import { registerUserHandlers } from './handlers/user.handlers';

export const registerAllHandlers = (): void => {
  registerOrderHandlers();
  registerProductHandlers();
  registerUserHandlers();
  console.log('[EventBus] All handlers registered.');
};
