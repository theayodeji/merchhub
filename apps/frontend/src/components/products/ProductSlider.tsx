import { type Product } from "../../features/products/hooks/useProducts";
import { MarketplaceProductCard } from "../../features/marketplace/components/MarketplaceProductCard";
import { EmptyState } from "../ui/EmptyState";
import { PackageX } from "lucide-react";

interface ProductSliderProps {
  products: Product[];
  isLoading: boolean;
}

export const ProductSlider = ({ products, isLoading }: ProductSliderProps) => {
  if (isLoading) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="w-[240px] md:w-[280px] flex-shrink-0 aspect-[4/5] animate-pulse rounded-2xl bg-gray-100 snap-start"
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
    <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar">
      {products.map((product) => (
        <div
          key={product.id}
          className="w-[240px] md:w-[280px] flex-shrink-0 snap-start h-full"
        >
          <MarketplaceProductCard product={product} />
        </div>
      ))}
    </div>
  );
};
