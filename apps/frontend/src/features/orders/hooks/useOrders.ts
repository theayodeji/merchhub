import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { useToast } from '@/components/ui/use-toast';
import type { DashboardOrderFilterDTO, PaginatedResponse } from '@merchhub/shared';

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface CreatorOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  deliveryAddress: string;
  total: number;
  status: OrderStatus;
  createdAt: string;
  items: Array<{
    id: string;
    quantity: number;
    unitPrice: number;
    total: number;
    product: {
      name: string;
      images: string[];
    };
  }>;
  transaction?: {
    id: string;
    status: string;
    paymentMethod: string;
  };
}

export const useCreatorOrders = (filters?: DashboardOrderFilterDTO) => {
  return useQuery({
    queryKey: ['creatorOrders', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.page) params.append('page', filters.page.toString());
      if (filters?.limit) params.append('limit', filters.limit.toString());
      if (filters?.search) params.append('search', filters.search);
      if (filters?.status) params.append('status', filters.status);
      if (filters?.dateRange) params.append('dateRange', filters.dateRange);

      const response = await apiClient.get<{ status: string; data: CreatorOrder[]; meta?: PaginatedResponse<CreatorOrder>['meta'] }>(`/api/orders/creator?${params.toString()}`);
      return response;
    }
  });
};

export const useCreatorOrder = (orderId: string) => {
  return useQuery({
    queryKey: ['creatorOrder', orderId],
    queryFn: async (): Promise<CreatorOrder> => {
      const response = await apiClient.get<{ status: string; data: CreatorOrder }>(`/api/orders/creator/${orderId}`);
      return response.data;
    },
    enabled: !!orderId,
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string, status: OrderStatus }) => {
      const response = await apiClient.patch<{ status: string; data: CreatorOrder }>(`/api/orders/creator/${orderId}/status`, { status });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creatorOrders'] });
      toast({
        title: 'Status Updated',
        description: 'The order status has been updated successfully.',
        variant: 'success',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Update Failed',
        description: error.message || 'Failed to update order status.',
        variant: 'destructive',
      });
    }
  });
};
