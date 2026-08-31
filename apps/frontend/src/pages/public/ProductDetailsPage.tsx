import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStorefrontProduct, usePlaceOrder } from '@/features/storefront/hooks/useStorefront';
import { ProductDetails } from '@/features/marketplace/components/ProductDetails';
import { OrderPlacementModal } from '@/features/marketplace/components/OrderPlacementModal';

export const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError } = useStorefrontProduct(id || '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const placeOrderMutation = usePlaceOrder();

  const handleOrderSubmit = (data: any) => {
    placeOrderMutation.mutate(data, {
      onSuccess: (res) => {
        // Redirect to mock payment gateway
        window.location.href = res.paymentUrl;
      }
    });
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-16 animate-pulse bg-neutral-100 dark:bg-neutral-900 h-96 rounded-xl"></div>;
  }

  if (isError || !product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">Product not found</h2>
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
          product={product}
          onSubmit={handleOrderSubmit}
          isSubmitting={placeOrderMutation.isPending}
        />
      )}
    </div>
  );
};
