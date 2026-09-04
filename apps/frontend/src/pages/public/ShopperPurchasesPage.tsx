import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Package, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';
import { useMyOrders } from '@/features/orders/hooks/useMyOrders';
import { EmptyState } from '@/components/ui/EmptyState';

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'PENDING':
      return <Clock className="w-4 h-4 text-amber-500" />;
    case 'PROCESSING':
      return <Package className="w-4 h-4 text-blue-500" />;
    case 'SHIPPED':
      return <Truck className="w-4 h-4 text-indigo-500" />;
    case 'DELIVERED':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'CANCELLED':
      return <XCircle className="w-4 h-4 text-red-500" />;
    default:
      return <Clock className="w-4 h-4 text-gray-500" />;
  }
};

export const ShopperPurchasesPage: React.FC = () => {
  const { data: orders, isLoading, isError } = useMyOrders();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <p className="text-gray-500 mb-4">Failed to load purchases.</p>
        <Link to="/" className="text-black font-medium hover:underline">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link 
            to="/" 
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-gray-900">My Purchases</h1>
            <p className="text-sm font-medium text-gray-500">
              View your past orders and their status
            </p>
          </div>
        </div>

        {(!orders || orders.length === 0) ? (
          <div className="bg-white rounded-3xl shadow-sm">
            <EmptyState
              icon={Package}
              title="No purchases yet"
              description="When you buy something, it will appear here."
            />
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link 
                key={order.id} 
                to={`/orders/${order.id}`}
                className="block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-gray-900">
                        Order #{order.id.split('-')[0]}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-50 border border-gray-100">
                        <StatusIcon status={order.status} />
                        <span className="capitalize">{order.status.toLowerCase()}</span>
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-lg font-black text-gray-900">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(order.total)}
                  </div>
                </div>

                <div className="flex items-center gap-3 overflow-hidden">
                  {order.items.slice(0, 4).map((item, idx) => (
                    <div key={idx} className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden flex-shrink-0">
                      {item.product?.images?.[0] ? (
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <Package className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                  ))}
                  {order.items.length > 4 && (
                    <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-sm font-bold text-gray-500 flex-shrink-0">
                      +{order.items.length - 4}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
