import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../lib/api-client';
import { type Product } from '../../products/hooks/useProducts';

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const useMarketplaceFeed = (page: number = 1, limit: number = 20) => {
  return useQuery({
    queryKey: ['marketplaceFeed', page, limit],
    queryFn: () => apiClient.get<PaginatedResponse<Product>>(`/api/storefront/products?page=${page}&limit=${limit}`),
  });
};
