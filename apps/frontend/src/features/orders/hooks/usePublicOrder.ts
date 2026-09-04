import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type { CreatorOrder as PublicOrder } from './useOrders';

export type { PublicOrder };

export const usePublicOrder = (orderId: string) => {
  return useQuery({
    queryKey: ['publicOrder', orderId],
    queryFn: async (): Promise<PublicOrder> => {
      const response = await apiClient.get<{ status: string; data: PublicOrder }>(`/api/orders/public/${orderId}`);
      return response.data;
    },
    enabled: !!orderId,
  });
};
