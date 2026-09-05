import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type { CreatorOrder as PublicOrder } from './useOrders';

export type { PublicOrder };

export const usePublicOrder = (orderId: string, email?: string) => {
  return useQuery({
    queryKey: ['publicOrder', orderId, email],
    queryFn: async (): Promise<PublicOrder> => {
      if (!email) throw new Error("Email is required to verify the order");
      const response = await apiClient.post<{ status: string; data: PublicOrder }>(
        `/api/orders/public/${orderId}/verify`,
        { email }
      );
      return response.data;
    },
    enabled: !!orderId && !!email,
    retry: false, // Don't keep retrying if verification fails (e.g. 403)
  });
};
