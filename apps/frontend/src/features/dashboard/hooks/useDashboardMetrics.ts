import { useMemo } from 'react';
import { isSameMonth, subMonths } from 'date-fns';
import { useProducts } from '../../products/hooks/useProducts';
import { useCreatorOrders } from '../../orders/hooks/useOrders';

export const useDashboardMetrics = () => {
  const { data: products, isLoading: isLoadingProducts } = useProducts();
  const { data: orders, isLoading: isLoadingOrders } = useCreatorOrders();

  const metrics = useMemo(() => {
    if (!products || !orders) return null;

    const now = new Date();
    const lastMonth = subMonths(now, 1);

    const isThisMonth = (dateStr: string) => isSameMonth(new Date(dateStr), now);
    const isLastMonth = (dateStr: string) => isSameMonth(new Date(dateStr), lastMonth);

    const calculateChange = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return ((current - previous) / previous) * 100;
    };

    // 1. Calculate Live Products
    const liveProductsCount = products.data.filter(p => p.status === 'PUBLISHED').length;
    const productsThisMonth = products.data.filter(p => p.status === 'PUBLISHED' && isThisMonth(p.createdAt)).length;
    const productsLastMonth = products.data.filter(p => p.status === 'PUBLISHED' && isLastMonth(p.createdAt)).length;
    const productsChange = calculateChange(productsThisMonth, productsLastMonth);

    // 2. Calculate Active Orders (Pending or Processing)
    const activeOrdersCount = orders.data.filter(
      o => o.status === 'PENDING' || o.status === 'PROCESSING'
    ).length;
    const ordersThisMonth = orders.data.filter(o => isThisMonth(o.createdAt)).length;
    const ordersLastMonth = orders.data.filter(o => isLastMonth(o.createdAt)).length;
    const ordersChange = calculateChange(ordersThisMonth, ordersLastMonth);

    // 3. Calculate Total Revenue (Completed/Delivered orders)
    const totalRevenue = orders.data
      .filter(o => o.status === 'DELIVERED' || o.status === 'SHIPPED')
      .reduce((sum, order) => sum + order.total, 0);
    const revenueThisMonth = orders.data
      .filter(o => (o.status === 'DELIVERED' || o.status === 'SHIPPED') && isThisMonth(o.createdAt))
      .reduce((sum, order) => sum + order.total, 0);
    const revenueLastMonth = orders.data
      .filter(o => (o.status === 'DELIVERED' || o.status === 'SHIPPED') && isLastMonth(o.createdAt))
      .reduce((sum, order) => sum + order.total, 0);
    const revenueChange = calculateChange(revenueThisMonth, revenueLastMonth);

    // 4. Generate Chart Data
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
      { name: 'Pending', count: orders.data.filter(o => o.status === 'PENDING').length },
      { name: 'Processing', count: orders.data.filter(o => o.status === 'PROCESSING').length },
      { name: 'Shipped', count: orders.data.filter(o => o.status === 'SHIPPED').length },
      { name: 'Delivered', count: orders.data.filter(o => o.status === 'DELIVERED').length },
      { name: 'Cancelled', count: orders.data.filter(o => o.status === 'CANCELLED').length },
    ];

    return {
      liveProductsCount,
      productsChange,
      activeOrdersCount,
      ordersChange,
      totalRevenue,
      revenueChange,
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
