import { Link } from 'react-router-dom';
import type { Product } from '../../products/hooks/useProducts';

interface MarketplaceProductCardProps {
  product: Product;
}

export const MarketplaceProductCard = ({ product }: MarketplaceProductCardProps) => {
  return (
    <Link to={`/product/${product.id}`} className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950">
      <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
        {product.images && product.images.length > 0 ? (
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-neutral-400">
            No Image
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-xs font-medium text-neutral-500">{product.category?.name}</span>
          <span className="font-semibold text-neutral-900 dark:text-neutral-50">${(product.price / 100).toFixed(2)}</span>
        </div>
        <h3 className="mb-2 line-clamp-1 font-medium text-neutral-900 dark:text-neutral-50">{product.name}</h3>
        {product.seller && (
          <div className="mt-auto flex items-center gap-2 pt-2 text-xs text-neutral-500 border-t border-neutral-100 dark:border-neutral-800">
            <span className="truncate">By @{product.seller.username}</span>
          </div>
        )}
      </div>
    </Link>
  );
};
