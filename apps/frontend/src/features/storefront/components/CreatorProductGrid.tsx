import type { Product } from '../../products/hooks/useProducts';
import { MarketplaceProductCard } from '../../marketplace/components/MarketplaceProductCard';

interface CreatorProductGridProps {
  products: Product[];
}

export const CreatorProductGrid = ({ products }: CreatorProductGridProps) => {
  if (!products || products.length === 0) {
    return (
      <div className="flex min-h-[30vh] items-center justify-center text-neutral-500 font-medium">
        This creator hasn't published any products yet.
      </div>
    );
  }

  return (
    <div className="pb-24 max-w-4xl mx-auto px-4 sm:px-8">
      <h2 className="mb-8 text-xl font-bold tracking-tight text-neutral-900">Merch</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => {
          const isTopSeller = index < 2; // Since products are already sorted by sales volume
          return (
            <div key={product.id} className="relative group h-full">
              {isTopSeller && (
                <div className="absolute top-4 left-4 z-20">
                  <span className="inline-flex items-center rounded-full bg-[#FF3333] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-sm">
                    🔥 Hot
                  </span>
                </div>
              )}
              <MarketplaceProductCard product={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
