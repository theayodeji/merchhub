import { useMemo } from 'react';
import { useProducts } from '../../products/hooks/useProducts';
import { useCreatorOrders } from '../../orders/hooks/useOrders';

export const useDashboardMetrics = () => {
  const { data: products, isLoading: isLoadingProducts } = useProducts();
  const { data: orders, isLoading: isLoadingOrders } = useCreatorOrders();

  const metrics = useMemo(() => {
    if (!products || !orders) return null;

    // 1. Calculate Live Products
    const liveProductsCount = products.filter(p => p.status === 'PUBLISHED').length;

    // 2. Calculate Active Orders (Pending or Processing)
    const activeOrdersCount = orders.filter(
      o => o.status === 'PENDING' || o.status === 'PROCESSING'
    ).length;

    // 3. Calculate Total Revenue (Completed/Delivered orders)
    const totalRevenue = orders
      .filter(o => o.status === 'DELIVERED' || o.status === 'SHIPPED')
      .reduce((sum, order) => sum + order.total, 0);

    // 4. Generate Chart Data
    // We'll create mock historical data based on the total for visual purposes,
    // in a real app this would come from a backend time-series endpoint.
    const revenueData = [
      { name: 'Mon', revenue: totalRevenue * 0.1 },
      { name: 'Tue', revenue: totalRevenue * 0.15 },
      { name: 'Wed', revenue: totalRevenue * 0.05 },
      { name: 'Thu', revenue: totalRevenue * 0.2 },
      { name: 'Fri', revenue: totalRevenue * 0.25 },
      { name: 'Sat', revenue: totalRevenue * 0.15 },
      { name: 'Sun', revenue: totalRevenue * 0.1 },
    ];

    // Status distribution
    const statusData = [
      { name: 'Pending', count: orders.filter(o => o.status === 'PENDING').length },
      { name: 'Processing', count: orders.filter(o => o.status === 'PROCESSING').length },
      { name: 'Shipped', count: orders.filter(o => o.status === 'SHIPPED').length },
      { name: 'Delivered', count: orders.filter(o => o.status === 'DELIVERED').length },
      { name: 'Cancelled', count: orders.filter(o => o.status === 'CANCELLED').length },
    ];

    return {
      liveProductsCount,
      activeOrdersCount,
      totalRevenue,
      revenueData,
      statusData,
    };
  }, [products, orders]);

  return {
    products,
    orders,
    metrics,
    isLoading: isLoadingProducts || isLoadingOrders,
  };
};
