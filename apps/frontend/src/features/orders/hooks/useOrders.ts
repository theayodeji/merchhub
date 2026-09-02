import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { useToast } from '@/components/ui/use-toast';

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

export const useCreatorOrders = () => {
  return useQuery({
    queryKey: ['creatorOrders'],
    queryFn: async (): Promise<CreatorOrder[]> => {
      const response = await apiClient.get<{ status: string; data: CreatorOrder[] }>('/api/orders/creator');
      return response.data;
    }
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
