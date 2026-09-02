import { OrderList } from '@/features/orders/components/OrderList';

export const OrdersPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Orders</h1>
          <p className="mt-2 text-sm text-gray-500">
            View and manage the orders placed by your customers.
          </p>
        </div>
      </div>
      
      <OrderList />
    </div>
  );
};
