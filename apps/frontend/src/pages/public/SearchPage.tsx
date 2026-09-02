import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { usePublicProducts } from "../../features/products/hooks/usePublicProducts";
import { ProductGrid } from "../../components/products/ProductGrid";
import { ProductFilters } from "../../components/products/ProductFilters";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "12";
  const search = searchParams.get("search") || "";
  const categoryId = searchParams.get("categoryId") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  const queryParams = {
    page,
    limit,
    ...(search && { search }),
    ...(categoryId && { categoryId }),
    ...(minPrice && { minPrice }),
    ...(maxPrice && { maxPrice }),
  };

  const { data, isLoading } = usePublicProducts(queryParams);

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage.toString());
    navigate(`/search?${newParams.toString()}`);
  };

  return (
    <div className="w-full pb-16 pt-24 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col gap-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            {search ? `Search results for "${search}"` : "All Products"}
          </h1>
          <ProductFilters />
        </div>

        <ProductGrid
          products={data?.data || []}
          isLoading={isLoading}
          currentPage={data?.meta?.page}
          totalPages={data?.meta?.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
