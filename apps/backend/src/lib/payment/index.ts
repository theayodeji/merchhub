import { IPaymentService } from './PaymentService.interface';
import { MockPaymentProvider } from './MockPaymentProvider';

let paymentService: IPaymentService;

const provider = process.env.PAYMENT_PROVIDER || 'mock';

if (provider === 'mock') {
  paymentService = new MockPaymentProvider();
} else if (provider === 'paystack') {
  // paymentService = new PaystackPaymentService(process.env.PAYSTACK_SECRET_KEY);
  throw new Error('Paystack provider not yet fully implemented.');
} else if (provider === 'stripe') {
  // paymentService = new StripePaymentService(process.env.STRIPE_SECRET_KEY);
  throw new Error('Stripe provider not yet fully implemented.');
} else {
  throw new Error(`Unsupported PAYMENT_PROVIDER: ${provider}. Check your .env file.`);
}

export { paymentService };
export type { IPaymentService };
