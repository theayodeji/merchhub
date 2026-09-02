import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../../lib/api-client';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string | null;
  category: { id: string; name: string; slug: string } | null;
  images: string[];
  status: 'DRAFT' | 'PUBLISHED';
  sellerId: string;
  seller?: { username: string; displayUsername: string | null; image: string | null };
  createdAt: string;
  updatedAt: string;
}

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => apiClient.get<Product[]>('/api/products'),
  });
};

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
}

export const useProductCategories = () => {
  return useQuery({
    queryKey: ['productCategories'],
    queryFn: () => apiClient.get<ProductCategory[]>('/api/products/categories'),
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => apiClient.get<Product>(`/api/products/${id}`),
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      // Use fetch directly for FormData since apiClient is currently set up for JSON
      const token = document.cookie.split('; ').find(row => row.startsWith('better-auth.session_token='))?.split('=')[1];
      
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'}/api/products`, {
        method: 'POST',
        body: formData,
        headers: {
           // Don't set Content-Type here, let the browser set it with the boundary
           ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Failed to create product');
      }
      
      return response.json() as Promise<Product>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: 'Product created',
        description: 'Your product has been successfully created.',
        variant: "success",
      });
      navigate('/dashboard/products');
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Failed to create product',
        description: error.message,
      });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: FormData }) => {
      const token = document.cookie.split('; ').find(row => row.startsWith('better-auth.session_token='))?.split('=')[1];
      
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'}/api/products/${id}`, {
        method: 'PUT',
        body: formData,
        headers: {
           ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Failed to update product');
      }
      
      return response.json() as Promise<Product>;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['products', variables.id] });
      toast({
        title: 'Product updated',
        description: 'Your product has been successfully updated.',
      });
      navigate('/dashboard/products');
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Failed to update product',
        description: error.message,
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/api/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: 'Product deleted',
        description: 'The product has been removed from your store.',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Failed to delete product',
        description: error.message,
      });
    },
  });
};
