import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Product } from "../../products/hooks/useProducts";

import { Heart } from "lucide-react";
import { useCartStore } from "../../../store/useCartStore";
import { useWishlistStore } from "../../../store/useWishlistStore";
import { useToast } from "@/components/ui/use-toast";

interface ProductDetailsProps {
  product: Product;
  onOrderClick: () => void;
}

export const ProductDetails = ({
  product,
  onOrderClick,
}: ProductDetailsProps) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const {
    isInWishlist,
    addItem: addWishlist,
    removeItem: removeWishlist,
  } = useWishlistStore();
  const { toast } = useToast();

  const isLiked = isInWishlist(product.id);

  const toggleWishlist = () => {
    if (isLiked) {
      removeWishlist(product.id);
    } else {
      addWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0],
      });
      toast({
        title: "Added to Wishlist",
        description: `${product.name} saved for later.`,
      });
    }
  };

  const handleAddToCart = () => {
    addItem(product, 1);
    toast({
      title: "Added to Cart",
      description: `${product.name} was added to your cart.`,
    });
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Left: Image Gallery */}
        <div className="flex flex-col gap-4">
          <div className="aspect-square w-full overflow-hidden bg-neutral-100 flex items-center justify-center rounded-sm">
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="rounded-3xl h-full w-full object-cover object-top"
              />
            ) : (
              <div className="text-neutral-400">No Image</div>
            )}
          </div>

          {product.images && product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative h-20 w-20 flex-shrink-0 overflow-hidden bg-neutral-100 transition-all ${
                    activeImage === idx
                      ? "opacity-100 ring-2 ring-primary ring-offset-2"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="h-full w-full object-cover object-top"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div className="flex flex-col pt-2 md:pl-8">
          <div className="mb-2 flex items-center justify-between">
            <div className="uppercase text-xs font-bold tracking-wider text-primary">
              {product.category?.name.toUpperCase() || "UNCATEGORIZED"}
            </div>
            <button
              onClick={toggleWishlist}
              className="group relative transition-transform hover:scale-110 p-2 -mr-2"
              title={isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <Heart
                className={`size-6 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-300"}`}
              />
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-neutral-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
                {isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
              </span>
            </button>
          </div>

          <h1 className="mb-4 text-3xl font-bold tracking-tight text-neutral-900">
            {product.name}
          </h1>

          <div className="mb-8 flex flex-col items-start gap-1">
            <div className="text-4xl font-semibold tracking-tight text-neutral-900">
              ${(product.price / 100).toFixed(2)}{" "}
              <small className="text-sm font-light tracking-normal text-gray-400">
                (+ tax & fees)
              </small>
            </div>
          </div>

          <div className="mb-10 flex gap-4 flex-col sm:flex-row">
            <Button
              size="default"
              className="cursor-pointer flex-1 bg-neutral-200 hover:bg-neutral-200/80 text-neutral-900 font-bold tracking-widest border-0 transition-colors shadow-none"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              ADD TO CART
            </Button>
            <Button
              size="default"
              className="cursor-pointer flex-1 bg-primary hover:bg-primary/90 text-white font-bold tracking-widest shadow-none"
              onClick={onOrderClick}
              disabled={product.stock <= 0}
            >
              BUY NOW
            </Button>
          </div>
          {/* {product.stock > 0 && (
            <p className="text-xs font-bold text-neutral-500 mt-[-1rem] mb-6 text-center sm:text-left">
              {product.stock} in stock
            </p>
          )} */}

          <div className="space-y-8">
            {/* Product Details */}
            <div>
              <h3 className="text-base mb-2 font-bold text-black uppercase tracking-wider">
                Product Details
              </h3>
              <div className="relative">
                <div
                  className={`prose prose-strong:text-neutral-500 prose-sm text-neutral-500 max-w-none prose-p:leading-[1.6] prose-p:mb-3 prose-ul:space-y-3 prose-li:leading-relaxed overflow-hidden transition-all duration-300 ${!isDescExpanded ? "max-h-[160px]" : ""}`}
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
                {!isDescExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#f9fafb] to-transparent pointer-events-none" />
                )}
              </div>
              <button
                onClick={() => setIsDescExpanded(!isDescExpanded)}
                className="mt-3 text-xs font-bold text-black hover:text-primary transition-colors uppercase tracking-wider"
              >
                {isDescExpanded ? "Read Less" : "Read More"}
              </button>
            </div>

            {/* Seller Info */}
            {product.seller && (
              <div className="pt-6 border-t border-neutral-100">
                <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                  Sold By
                </h3>
                <div className="flex items-center gap-3 mt-4">
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-neutral-100">
                    {product.seller.image && (
                      <img
                        src={product.seller.image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-primary">
                      {product.seller.displayUsername ||
                        product.seller.username}
                    </div>
                    <p className="text-xs font-medium text-neutral-500">
                      @{product.seller.username}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
