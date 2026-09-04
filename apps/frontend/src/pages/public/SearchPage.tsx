import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { usePublicProducts } from "../../features/products/hooks/usePublicProducts";
import { ProductGrid } from "../../components/products/ProductGrid";
import { ProductFilters } from "../../components/products/ProductFilters";
import { Filter, X } from "lucide-react";
import { Button } from "../../components/ui/button";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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
    <div className="w-full pb-16 pt-12 min-h-screen bg-neutral-50/30">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1400px]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-neutral-200 pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-neutral-900">
              {search ? (
                <>
                  Search results for{" "}
                  <span className="font-semibold">"{search}"</span>
                </>
              ) : (
                "Browse Collections"
              )}
            </h1>
            {!isLoading && data?.meta && (
              <p className="text-neutral-500 mt-3 font-medium text-xs tracking-widest uppercase">
                {data.meta.total} {data.meta.total === 1 ? "Item" : "Items"}
              </p>
            )}
          </div>

          <Button
            variant="outline"
            className="md:hidden flex items-center gap-2 border-neutral-200 hover:bg-neutral-100 transition-all duration-300 h-11 px-6 rounded-xl"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          >
            {mobileFiltersOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Filter className="w-4 h-4" />
            )}
            {mobileFiltersOpen ? "Close Filters" : "Filters"}
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 lg:gap-10 items-start">
          {/* Sidebar Filters */}
          <div
            className={`
            w-full md:w-40 lg:w-56 shrink-0 md:sticky md:top-28
            ${mobileFiltersOpen ? "block mb-8 md:mb-0" : "hidden md:block"}
          `}
          >
            <ProductFilters />
          </div>

          {/* Product Grid */}
          <div className="flex-1 w-full min-w-0">
            <ProductGrid
              products={data?.data || []}
              isLoading={isLoading}
              currentPage={data?.meta?.page}
              totalPages={data?.meta?.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
