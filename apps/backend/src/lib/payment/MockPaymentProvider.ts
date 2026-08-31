import { IPaymentService, PaymentInitializeParams, PaymentInitializeResponse, PaymentVerifyResponse } from './PaymentService.interface';
import crypto from 'crypto';

/**
 * A mock payment provider for development and testing.
 * Automatically succeeds for any verification request.
 */
export class MockPaymentProvider implements IPaymentService {
  private mockTransactions = new Map<string, PaymentInitializeParams>();

  async initializePayment(params: PaymentInitializeParams): Promise<PaymentInitializeResponse> {
    const reference = `mock_txn_${crypto.randomBytes(8).toString('hex')}`;
    
    // Store for verification
    this.mockTransactions.set(reference, params);

    return {
      reference,
      authorizationUrl: `http://localhost:5173/payment/mock?reference=${reference}`
    };
  }

  async verifyPayment(reference: string): Promise<PaymentVerifyResponse> {
    const txn = this.mockTransactions.get(reference);

    if (!txn) {
      throw new Error(`Mock transaction not found for reference: ${reference}`);
    }

    return {
      success: true,
      reference,
      amount: txn.amount,
      currency: txn.currency || 'USD',
      status: 'SUCCESS',
      customer: {
        email: txn.email
      }
    };
  }
}
