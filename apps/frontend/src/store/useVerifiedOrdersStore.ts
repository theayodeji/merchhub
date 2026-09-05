import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface VerifiedOrdersState {
  verifiedOrders: Record<string, string>; // orderId -> email
  addVerifiedOrder: (orderId: string, email: string) => void;
  isOrderVerified: (orderId: string) => boolean;
  getVerifiedEmail: (orderId: string) => string | undefined;
}

export const useVerifiedOrdersStore = create<VerifiedOrdersState>()(
  persist(
    (set, get) => ({
      verifiedOrders: {},
      addVerifiedOrder: (orderId, email) =>
        set((state) => ({
          verifiedOrders: {
            ...state.verifiedOrders,
            [orderId]: email,
          },
        })),
      isOrderVerified: (orderId) => {
        return !!get().verifiedOrders[orderId];
      },
      getVerifiedEmail: (orderId) => {
        return get().verifiedOrders[orderId];
      }
    }),
    {
      name: 'verified-orders-storage',
    }
  )
);
