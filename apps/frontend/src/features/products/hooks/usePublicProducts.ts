import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../lib/api-client";
import { type Product } from "./useProducts";

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const usePublicProducts = (params: Record<string, string>) => {
  return useQuery({
    queryKey: ["publicProducts", params],
    queryFn: async () => {
      const searchParams = new URLSearchParams(params);
      const queryString = searchParams.toString();
      return apiClient.get<PaginatedResponse<Product>>(
        `/api/products/public${queryString ? `?${queryString}` : ""}`
      );
    },
  });
};
