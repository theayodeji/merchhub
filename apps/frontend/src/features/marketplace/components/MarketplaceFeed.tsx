import { type Product } from "../../products/hooks/useProducts";
import { MarketplaceProductCard } from "./MarketplaceProductCard";

interface MarketplaceFeedProps {
  products: Product[];
  isLoading: boolean;
}

export const MarketplaceFeed = ({
  products,
  isLoading,
}: MarketplaceFeedProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 ">
        {Array.from({ length: 8 }).map((_, i) => (
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
      <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
        <h3 className="text-xl font-semibold text-gray-900">
          No products found
        </h3>
        <p className="mt-2 text-neutral-500">Check back later for new items.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <MarketplaceProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
