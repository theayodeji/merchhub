import { IPaymentService } from './PaymentService.interface';
import { MockPaymentProvider } from './MockPaymentProvider';
import { AppError } from '../../errors/AppError';

let paymentService: IPaymentService;

const provider = process.env.PAYMENT_PROVIDER || 'mock';

if (provider === 'mock') {
  paymentService = new MockPaymentProvider();
} else if (provider === 'paystack') {
  // paymentService = new PaystackPaymentService(process.env.PAYSTACK_SECRET_KEY);
  throw new AppError('Paystack provider not yet fully implemented.', 501);
} else if (provider === 'stripe') {
  // paymentService = new StripePaymentService(process.env.STRIPE_SECRET_KEY);
  throw new AppError('Stripe provider not yet fully implemented.', 501);
} else {
  throw new AppError(`Unsupported PAYMENT_PROVIDER: ${provider}. Check your .env file.`, 500);
}

export { paymentService };
export type { IPaymentService };
