import { useMarketplaceFeed } from '@/features/marketplace/hooks/useMarketplace';
import { MarketplaceFeed } from '@/features/marketplace/components/MarketplaceFeed';

export const MarketplacePage = () => {
  // Hardcoded page 1, limit 20 for MVP
  const { data, isLoading } = useMarketplaceFeed(1, 20);

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 md:text-5xl">
          Discover Creator Merch
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-neutral-500">
          Support your favorite creators by purchasing their exclusive products.
        </p>
      </div>
      
      <MarketplaceFeed 
        products={data?.data || []} 
        isLoading={isLoading} 
      />
    </div>
  );
};
