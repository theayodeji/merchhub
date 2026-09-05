import { useMemo } from 'react';
import { isSameMonth, subMonths } from 'date-fns';
import { useProduct } from '../../products/hooks/useProducts';
import { useCreatorOrders } from '../../orders/hooks/useOrders';

export const useProductDetailsPage = (productId: string) => {
  const { data: product, isLoading: isLoadingProduct, isError: isProductError } = useProduct(productId);
  const { data: allOrders, isLoading: isLoadingOrders } = useCreatorOrders();

  const details = useMemo(() => {
    if (!product || !allOrders) return null;

    // Filter orders that contain this specific product
    const productOrders = allOrders.data?.filter(order => 
      order.items.some(item => item.product.name === product.name)
    );

    const now = new Date();
    const lastMonth = subMonths(now, 1);
    
    const isThisMonth = (dateStr: string) => isSameMonth(new Date(dateStr), now);
    const isLastMonth = (dateStr: string) => isSameMonth(new Date(dateStr), lastMonth);

    const calculateChange = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return ((current - previous) / previous) * 100;
    };

    let totalUnitsSold = 0;
    let unitsThisMonth = 0;
    let unitsLastMonth = 0;

    let totalRevenue = 0;
    let revenueThisMonth = 0;
    let revenueLastMonth = 0;

    let ordersThisMonth = 0;
    let ordersLastMonth = 0;

    productOrders.forEach(order => {
      const orderThisMonth = isThisMonth(order.createdAt);
      const orderLastMonth = isLastMonth(order.createdAt);
      
      if (orderThisMonth) ordersThisMonth++;
      if (orderLastMonth) ordersLastMonth++;

      const matchingItems = order.items.filter(item => item.product.name === product.name);
      
      matchingItems.forEach(item => {
        if (order.status !== 'CANCELLED') {
          totalUnitsSold += item.quantity;
          totalRevenue += item.total;
          
          if (orderThisMonth) {
            unitsThisMonth += item.quantity;
            revenueThisMonth += item.total;
          } else if (orderLastMonth) {
            unitsLastMonth += item.quantity;
            revenueLastMonth += item.total;
          }
        }
      });
    });

    return {
      productOrders,
      totalUnitsSold,
      unitsSoldChange: calculateChange(unitsThisMonth, unitsLastMonth),
      totalRevenue,
      revenueChange: calculateChange(revenueThisMonth, revenueLastMonth),
      ordersChange: calculateChange(ordersThisMonth, ordersLastMonth)
    };
  }, [product, allOrders]);

  return {
    product,
    details,
    isLoading: isLoadingProduct || isLoadingOrders,
    isError: isProductError
  };
};
