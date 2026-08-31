import type { Product } from '../../products/hooks/useProducts';
import { MarketplaceProductCard } from '../../marketplace/components/MarketplaceProductCard';

interface CreatorProductGridProps {
  products: Product[];
}

export const CreatorProductGrid = ({ products }: CreatorProductGridProps) => {
  if (!products || products.length === 0) {
    return (
      <div className="flex min-h-[30vh] items-center justify-center text-neutral-500">
        This creator hasn't published any products yet.
      </div>
    );
  }

  return (
    <div className="py-12">
      <h2 className="mb-8 text-2xl font-semibold text-neutral-900 dark:text-neutral-50">Latest Products</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <MarketplaceProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
