import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useStorefrontProduct,
  usePlaceOrder,
} from "@/features/storefront/hooks/useStorefront";
import { ProductDetails } from "@/features/marketplace/components/ProductDetails";
import { OrderPlacementModal } from "@/features/marketplace/components/OrderPlacementModal";

export const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError } = useStorefrontProduct(id || "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const placeOrderMutation = usePlaceOrder();

  const handleOrderSubmit = (data: any) => {
    placeOrderMutation.mutate(data, {
      onSuccess: (res) => {
        // Redirect to mock payment gateway, appending the newly created order ID
        const orderId =
          res.orders && res.orders.length > 0 ? res.orders[0].id : "";
        window.location.href = `${res.paymentUrl}&orderId=${orderId}`;
      },
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {/* Left: Image Skeleton */}
            <div className="flex flex-col gap-4 animate-pulse">
              <div className="aspect-square w-full rounded-3xl bg-neutral-100 dark:bg-neutral-800" />
              <div className="flex gap-4 overflow-x-auto pb-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-20 w-20 flex-shrink-0 rounded-lg bg-neutral-100 dark:bg-neutral-800"
                  />
                ))}
              </div>
            </div>

            {/* Right: Details Skeleton */}
            <div className="flex flex-col pt-2 md:pl-8 animate-pulse">
              <div className="mb-2 flex items-center justify-between">
                <div className="h-4 w-24 rounded bg-neutral-100 dark:bg-neutral-800" />
                <div className="size-6 rounded-full bg-neutral-100 dark:bg-neutral-800" />
              </div>
              <div className="mb-4 h-10 w-3/4 rounded-lg bg-neutral-100 dark:bg-neutral-800" />
              <div className="mb-8 h-10 w-1/3 rounded-lg bg-neutral-100 dark:bg-neutral-800" />

              <div className="mb-10 flex gap-4 flex-col sm:flex-row">
                <div className="h-10 flex-1 rounded bg-neutral-100 dark:bg-neutral-800" />
                <div className="h-10 flex-1 rounded bg-neutral-100 dark:bg-neutral-800" />
              </div>

              <div className="space-y-8">
                <div>
                  <div className="mb-4 h-4 w-32 rounded bg-neutral-100 dark:bg-neutral-800" />
                  <div className="space-y-3">
                    <div className="h-4 w-full rounded bg-neutral-100 dark:bg-neutral-800" />
                    <div className="h-4 w-5/6 rounded bg-neutral-100 dark:bg-neutral-800" />
                    <div className="h-4 w-4/6 rounded bg-neutral-100 dark:bg-neutral-800" />
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800">
                  <div className="mb-4 h-3 w-20 rounded bg-neutral-200 dark:bg-neutral-800" />
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-neutral-200 dark:bg-neutral-800" />
                    <div className="space-y-2">
                      <div className="h-4 w-24 rounded bg-neutral-200 dark:bg-neutral-800" />
                      <div className="h-3 w-16 rounded bg-neutral-200 dark:bg-neutral-800" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
          Product not found
        </h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <ProductDetails
        product={product}
        onOrderClick={() => setIsModalOpen(true)}
      />

      {isModalOpen && (
        <OrderPlacementModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          items={[
            {
              id: product.id,
              name: product.name,
              price: product.price,
              quantity: 1,
            },
          ]}
          onSubmit={handleOrderSubmit}
          isSubmitting={placeOrderMutation.isPending}
        />
      )}
    </div>
  );
};
