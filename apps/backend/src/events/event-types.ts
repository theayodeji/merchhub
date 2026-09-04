// ============================================================
// MerchHub Event Contracts
// All application events are defined here as a discriminated union.
// To add a new event: add a Payload type + a new union member.
// ============================================================

// --- Order Events ---
export type OrderCreatedPayload = {
  orderId: string;
  sellerId: string;
  buyerId?: string;
  customerName: string;
  customerEmail: string;
  total: number;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
  }>;
};

export type OrderStatusChangedPayload = {
  orderId: string;
  previousStatus: string;
  newStatus: string;
  sellerId: string;
  buyerId?: string;
  customerEmail: string;
  customerName: string;
};

// --- Product Events ---
export type ProductCreatedPayload = {
  productId: string;
  productName: string;
  sellerId: string;
  status: string;
};

export type ProductPublishedPayload = {
  productId: string;
  productName: string;
  sellerId: string;
};

export type ProductArchivedPayload = {
  productId: string;
  sellerId: string;
};

// --- User Events ---
export type UserRegisteredPayload = {
  userId: string;
  email: string;
  name: string;
};

export type UserOnboardedPayload = {
  userId: string;
  role: string; // 'CREATOR' | 'CUSTOMER'
};

// --- Payment Events ---
export type PaymentCompletedPayload = {
  transactionId: string;
  reference: string;
  amount: number;
  orderIds: string[];
};

// ============================================================
// Master Union — extend this when adding new events
// ============================================================
export type AppEvent =
  | { type: 'order.created';        payload: OrderCreatedPayload }
  | { type: 'order.status_changed'; payload: OrderStatusChangedPayload }
  | { type: 'product.created';      payload: ProductCreatedPayload }
  | { type: 'product.published';    payload: ProductPublishedPayload }
  | { type: 'product.archived';     payload: ProductArchivedPayload }
  | { type: 'user.registered';      payload: UserRegisteredPayload }
  | { type: 'user.onboarded';       payload: UserOnboardedPayload }
  | { type: 'payment.completed';    payload: PaymentCompletedPayload };

export type EventType = AppEvent['type'];
export type EventPayload<T extends EventType> = Extract<AppEvent, { type: T }>['payload'];
