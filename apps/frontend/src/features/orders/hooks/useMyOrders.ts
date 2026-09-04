import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type { CreatorOrder as Order } from './useOrders';

export const useMyOrders = () => {
  return useQuery({
    queryKey: ['myOrders'],
    queryFn: async (): Promise<Order[]> => {
      const response = await apiClient.get<{ status: string; data: Order[] }>('/api/orders/my-orders');
      return response.data;
    }
  });
};
