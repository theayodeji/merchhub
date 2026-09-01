import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Product } from "../../products/hooks/useProducts";

interface ProductDetailsProps {
  product: Product;
  onOrderClick: () => void;
}

export const ProductDetails = ({
  product,
  onOrderClick,
}: ProductDetailsProps) => {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
      {/* Image Gallery */}
      <div className="flex flex-col gap-4">
        <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-100">
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-neutral-400">
              No Image
            </div>
          )}
        </div>

        {product.images && product.images.length > 1 && (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 ${
                  activeImage === idx ? "border-primary" : "border-transparent"
                }`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col pt-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-primary">
            {product.category?.name}
          </span>
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight text-black">
          {product.name}
        </h1>

        <div className="mb-8 text-3xl font-semibold text-black">
          ${(product.price / 100).toFixed(2)}
        </div>

        {product.seller && (
          <div className="mb-8 flex items-center gap-3 rounded-xl border border-neutral-200 p-4">
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
              <p className="text-sm text-gray-500">Created by</p>
              <p className="font-medium text-black">
                @{product.seller.username}
              </p>
            </div>
          </div>
        )}

        <div
          className="prose prose-neutral mb-10 max-w-none"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />

        <div className="mt-auto flex flex-col gap-4 border-t border-neutral-200 pt-8">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-500">Availability</span>
            <span
              className={`text-sm font-medium ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}
            >
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>
          <Button
            size="lg"
            className="w-full text-lg"
            onClick={onOrderClick}
            disabled={product.stock <= 0}
          >
            {product.stock > 0 ? "Order Now" : "Out of Stock"}
          </Button>
        </div>
      </div>
    </div>
  );
};
