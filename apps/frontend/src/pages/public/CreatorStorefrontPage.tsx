import { useParams } from 'react-router-dom';
import { useCreatorStorefront } from '@/features/storefront/hooks/useStorefront';
import { CreatorProfile } from '@/features/storefront/components/CreatorProfile';
import { CreatorProductGrid } from '@/features/storefront/components/CreatorProductGrid';

export const CreatorStorefrontPage = () => {
  const { username } = useParams<{ username: string }>();
  const { data: creator, isLoading, isError } = useCreatorStorefront(username || '');

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto mb-6 h-32 w-32 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800" />
        <div className="mx-auto h-8 w-48 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
      </div>
    );
  }

  if (isError || !creator) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">Creator not found</h2>
        <p className="mt-2 text-neutral-500">The storefront you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <CreatorProfile creator={creator} />
      <CreatorProductGrid products={creator.products || []} />
    </div>
  );
};
