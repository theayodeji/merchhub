import { type Product } from "../../features/products/hooks/useProducts";
import { MarketplaceProductCard } from "../../features/marketplace/components/MarketplaceProductCard";
import { EmptyState } from "../ui/EmptyState";
import { PackageX } from "lucide-react";
import { Pagination } from "../ui/Pagination";

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export const ProductGrid = ({
  products,
  isLoading,
  currentPage,
  totalPages,
  onPageChange,
}: ProductGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[4/5] animate-pulse rounded-2xl bg-gray-100"
          />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <EmptyState
        icon={PackageX}
        title="No products found"
        description="The vault is currently empty. Exclusive drops are on the horizon—check back soon."
      />
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {products.map((product) => (
          <MarketplaceProductCard key={product.id} product={product} />
        ))}
      </div>
      {totalPages && totalPages > 1 && onPageChange && currentPage && (
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};
