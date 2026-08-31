export interface PaymentInitializeParams {
  amount: number; // In smallest currency unit (e.g., cents)
  email: string;
  currency?: string;
  metadata?: Record<string, any>;
}

export interface PaymentInitializeResponse {
  reference: string;
  authorizationUrl: string;
}

export interface PaymentVerifyResponse {
  success: boolean;
  reference: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
  customer: {
    email: string;
  };
}

export interface IPaymentService {
  /**
   * Initialize a payment transaction and return an authorization URL for the client.
   */
  initializePayment(params: PaymentInitializeParams): Promise<PaymentInitializeResponse>;

  /**
   * Verify a payment transaction using its reference.
   */
  verifyPayment(reference: string): Promise<PaymentVerifyResponse>;
}
