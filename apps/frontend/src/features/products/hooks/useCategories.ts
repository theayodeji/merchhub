import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../lib/api-client";

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return apiClient.get<Category[]>("/api/products/categories");
    },
  });
};
