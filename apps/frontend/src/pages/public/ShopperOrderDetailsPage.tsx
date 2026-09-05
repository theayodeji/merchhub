import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { usePublicOrder } from '@/features/orders/hooks/usePublicOrder';
import { OrderTimeline } from '@/features/orders/components/OrderTimeline';
import { OrderSellerDetails } from '@/features/orders/components/OrderSellerDetails';
import { OrderItemsList } from '@/features/orders/components/OrderItemsList';
import { useVerifiedOrdersStore } from '@/store/useVerifiedOrdersStore';
import { ShopperSignupModal } from '@/components/ShopperSignupModal';
import { Button } from '@/components/ui/button';

export const ShopperOrderDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const orderId = id || '';
  
  const { isOrderVerified, getVerifiedEmail, addVerifiedOrder } = useVerifiedOrdersStore();
  
  const [emailInput, setEmailInput] = useState('');
  
  // If the order is already in the local store, populate the email to trigger fetching immediately
  const [emailToVerify, setEmailToVerify] = useState<string | undefined>(
    isOrderVerified(orderId) ? getVerifiedEmail(orderId) : undefined
  );

  const { data: order, isLoading, isError } = usePublicOrder(orderId, emailToVerify);

  // Once the order successfully loads, ensure it's saved in the verified store
  useEffect(() => {
    if (order && emailToVerify) {
      addVerifiedOrder(orderId, emailToVerify);
    }
  }, [order, emailToVerify, orderId, addVerifiedOrder]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setEmailToVerify(emailInput.trim());
    }
  };

  // Render the email verification form if we don't have an email yet, or if verification failed
  if (!emailToVerify || isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-md w-full">
          <h2 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Track Your Order</h2>
          <p className="text-gray-500 mb-6 text-sm font-medium">
            Enter the email address you used during checkout to view your order details.
          </p>
          <form onSubmit={handleVerify} className="flex flex-col gap-4">
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Email Address"
              className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              required
            />
            <Button type="submit" disabled={isLoading} className="w-full h-12 rounded-xl text-base font-medium">
              {isLoading ? "Verifying..." : "View Order"}
            </Button>
            {isError && emailToVerify && (
              <p className="text-red-500 text-sm text-center font-medium mt-2">
                Could not verify order. Please check your email and try again.
              </p>
            )}
          </form>
          <div className="mt-8 text-center">
            <Link to="/" className="text-gray-500 text-sm font-medium hover:text-black transition-colors">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!order) {
    return null;
  }

  const shortOrderId = order.id.split('-')[0] || '';

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <ShopperSignupModal />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
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

        {/* Order Details container */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          
          <div className="p-6 sm:p-8">
            <OrderItemsList order={order} />
          </div>

          <div className="border-t border-gray-100">
            <OrderTimeline status={order.status} />
          </div>
          
          <div className="p-6 sm:p-8 border-t border-gray-100">
            <OrderSellerDetails order={order} shortOrderId={shortOrderId} />
          </div>

        </div>

      </div>
    </div>
  );
};
