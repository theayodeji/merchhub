import { useMemo } from 'react';
import { useProduct } from '../../products/hooks/useProducts';
import { useCreatorOrders } from '../../orders/hooks/useOrders';

export const useProductDetailsPage = (productId: string) => {
  const { data: product, isLoading: isLoadingProduct, isError: isProductError } = useProduct(productId);
  const { data: allOrders, isLoading: isLoadingOrders } = useCreatorOrders();

  const details = useMemo(() => {
    if (!product || !allOrders) return null;

    // Filter orders that contain this specific product
    const productOrders = allOrders.filter(order => 
      order.items.some(item => item.product.name === product.name)
    );

    // Calculate total units sold and revenue for this product across all orders
    let totalUnitsSold = 0;
    let totalRevenue = 0;

    productOrders.forEach(order => {
      // Find the specific item(s) in this order that match this product
      // We match by name since the backend items array only has product.name and product.images, not product.id
      const matchingItems = order.items.filter(item => item.product.name === product.name);
      
      matchingItems.forEach(item => {
        // Only count revenue for completed/paid orders
        if (order.status !== 'CANCELLED') {
          totalUnitsSold += item.quantity;
          totalRevenue += item.total;
        }
      });
    });

    return {
      productOrders,
      totalUnitsSold,
      totalRevenue
    };
  }, [product, allOrders]);

  return {
    product,
    details,
    isLoading: isLoadingProduct || isLoadingOrders,
    isError: isProductError
  };
};
