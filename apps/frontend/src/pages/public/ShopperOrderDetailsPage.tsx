import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { usePublicOrder } from '@/features/orders/hooks/usePublicOrder';
import { OrderTimeline } from '@/features/orders/components/OrderTimeline';
import { OrderCustomerDetails } from '@/features/orders/components/OrderCustomerDetails';
import { OrderItemsList } from '@/features/orders/components/OrderItemsList';

export const ShopperOrderDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading, isError } = usePublicOrder(id || '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <p className="text-gray-500 mb-4">We couldn't find your order.</p>
        <Link to="/" className="text-black font-medium hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  const shortOrderId = order.id.split('-')[0] || '';

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link 
            to="/" 
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-gray-900">Order Details</h1>
            <p className="text-sm font-medium text-gray-500">
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Timeline */}
        <section>
          <OrderTimeline status={order.status} />
        </section>

        {/* Order Details container */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8 space-y-8">
            <OrderCustomerDetails order={order} shortOrderId={shortOrderId} />
            
            <div className="border-t border-gray-100 pt-8">
              <OrderItemsList order={order} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
