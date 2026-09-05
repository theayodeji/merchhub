import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft, Loader2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useOrderDetailsPage } from "../../features/orders/hooks/useOrderDetailsPage";
import { OrderCustomerDetails } from "../../features/orders/components/OrderCustomerDetails";
import { OrderItemsList } from "../../features/orders/components/OrderItemsList";
import { OrderStatusAction } from "../../features/orders/components/OrderStatusAction";
import { OrderTimeline } from "../../features/orders/components/OrderTimeline";

export default function OrderDetails() {
  const { 
    order, 
    isLoading, 
    isError, 
    isUpdating, 
    handleUpdateStatus, 
    nextAction, 
    shortOrderId 
  } = useOrderDetailsPage();

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-[#FF3333]" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
        <p className="text-gray-500 mb-6">This order doesn't exist or you don't have permission to view it.</p>
        <Button asChild>
          <Link to="/dashboard/orders">Back to Orders</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-20 animate-slide-in">
      {/* Top Navigation */}
      <div className="flex justify-between items-center">
        <Link 
          to="/dashboard/orders" 
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="mr-2 size-4" />
          Back to Orders
        </Link>
        
        <Button variant="outline" asChild className="gap-2">
          <a href={`/orders/${order.id}`} target="_blank" rel="noreferrer">
            <Eye className="size-4" /> Preview Customer View
          </a>
        </Button>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Order #{shortOrderId}
        </h1>
        <p className="text-sm font-medium text-gray-500 mt-2">
          Placed on {format(new Date(order.createdAt), "MMMM d, yyyy 'at' h:mm a")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        
        {/* MAIN CONTENT (Left - 8 columns) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Order Items */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            <OrderItemsList order={order} />
          </div>

          {/* Status & Action Hero */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FF3333]" />
            <OrderStatusAction 
              order={order} 
              nextAction={nextAction} 
              isUpdating={isUpdating} 
              handleUpdateStatus={handleUpdateStatus} 
            />
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            <h2 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-widest">Timeline</h2>
            <div className="px-2">
              <OrderTimeline status={order.status} />
            </div>
          </div>
          
        </div>

        {/* SIDEBAR (Right - 4 columns) */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 sticky top-8">
            <OrderCustomerDetails order={order} shortOrderId={shortOrderId} />
          </div>
        </div>

      </div>
    </div>
  );
}
