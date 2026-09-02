import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "../../products/hooks/useProducts";
import { useWishlistStore } from "../../../store/useWishlistStore";

interface MarketplaceProductCardProps {
  product: Product;
}

export const MarketplaceProductCard = ({
  product,
}: MarketplaceProductCardProps) => {
  const [activeImage, setActiveImage] = useState(0);
  const { isInWishlist, addItem, removeItem } = useWishlistStore();
  const isLiked = isInWishlist(product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLiked) {
      removeItem(product.id);
    } else {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0],
      });
    }
  };

  const images = product.images?.length ? product.images : [];
  const hasMultipleImages = images.length > 1;

  return (
    <div className="cursor-pointer group flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-lg">
      {/* Image Section */}
      <Link
        to={`/product/${product.id}`}
        className="relative block w-full p-3 pb-0"
      >
        {/* Creator avatar in top-left */}
        {product.seller?.image && (
          <div className="absolute top-6 left-6 z-10 size-10 overflow-hidden rounded-full border-2 border-white bg-white shadow-sm">
            <img
              src={product.seller.image}
              alt={product.seller.username}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* Product image */}
        <div className="flex aspect-square items-center justify-center">
          {images.length > 0 ? (
            <img
              src={images[activeImage]}
              alt={product.name}
              className="rounded-3xl max-h-full max-w-full object-contain"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* Dot indicators */}
        {hasMultipleImages && (
          <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveImage(idx);
                }}
                className={`size-2 rounded-full transition-colors ${
                  activeImage === idx ? "bg-primary" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </Link>

      {/* Details Section */}
      <div className="flex flex-1 flex-col px-3 pb-5 pt-3">
        {/* Badge + Heart Row */}
        <div className="mb-2 flex items-center justify-between">
          {product.category?.name ? (
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {product.category.name}
            </span>
          ) : (
            <span />
          )}
          <button
            onClick={toggleWishlist}
            className="transition-transform hover:scale-110 z-20 relative"
          >
            <Heart
              className={`size-5 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-300"}`}
            />
          </button>
        </div>

        {/* Product Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="line-clamp-2 text-base font-semibold text-gray-900 transition-colors group-hover:text-primary">
            {product.name}
          </h3>
        </Link>

        {/* Creator Link */}
        {product.seller && (
          <Link
            to={`/${product.seller.username}`}
            className="mb-2 text-xs text-gray-500 hover:text-primary/60 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            By {product.seller.displayUsername || product.seller.username}
          </Link>
        )}

        {/* Price + Add to Cart */}
        <div className="mt-auto flex items-end justify-between">
          <div>
            <span className="text-xl font-semibold text-primary">
              ${(product.price / 100).toFixed(2)}
            </span>
          </div>
          <Button
            size="sm"
            className="rounded-full bg-gray-900 px-5 text-white hover:bg-gray-800"
            asChild
          >
            <Link to={`/product/${product.id}`}>
              <ShoppingCart className="mr-1.5 size-4" />
              Buy Now
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
