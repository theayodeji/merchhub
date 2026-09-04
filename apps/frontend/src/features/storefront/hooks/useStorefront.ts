import { useQuery, useMutation } from '@tanstack/react-query';
import { apiClient } from '../../../lib/api-client';
import { useToast } from '@/components/ui/use-toast';
import { type Product } from '../../products/hooks/useProducts';

export interface CreatorProfileData {
  id: string;
  name: string;
  username: string;
  displayUsername: string | null;
  image: string | null;
  bio: string | null;
  socialLinks: Record<string, string> | null;
  products: Product[];
}

export const useCreatorStorefront = (username: string) => {
  return useQuery({
    queryKey: ['storefront', username],
    queryFn: () => apiClient.get<CreatorProfileData>(`/api/storefront/creators/${username}`),
    enabled: !!username,
  });
};

export const useStorefrontProduct = (id: string) => {
  return useQuery({
    queryKey: ['storefrontProduct', id],
    queryFn: () => apiClient.get<Product>(`/api/storefront/products/${id}`),
    enabled: !!id,
  });
};

export interface CreateOrderPayload {
  productId: string;
  quantity: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress: string;
}

export interface OrderResponse {
  orders: any[];
  paymentUrl: string;
  reference: string;
}

export const usePlaceOrder = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CreateOrderPayload) => apiClient.post<OrderResponse>('/api/orders', data as unknown as Record<string, unknown>),
    onSuccess: () => {
      toast({
        title: 'Order Placed!',
        description: 'Redirecting you to payment gateway...',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Order Failed',
        description: error.message || 'Something went wrong while placing your order.',
        variant: 'destructive',
      });
    }
  });
};
