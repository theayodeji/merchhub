import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useOrderDetailsPage } from "../../features/orders/hooks/useOrderDetailsPage";
import { OrderCustomerDetails } from "../../features/orders/components/OrderCustomerDetails";
import { OrderItemsList } from "../../features/orders/components/OrderItemsList";
import { OrderStatusAction } from "../../features/orders/components/OrderStatusAction";

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
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      {/* Top Navigation */}
      <div>
        <Link 
          to="/dashboard/orders" 
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="mr-2 size-4" />
          Back to Orders
        </Link>
      </div>

      {/* Main Single Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        
        {/* Broad Heading */}
        <div className="border-b border-gray-100 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Order #{shortOrderId} details
            </h1>
            <p className="text-sm font-medium text-gray-500 mt-1">
              Placed on {format(new Date(order.createdAt), "MMMM d, yyyy 'at' h:mm a")}
            </p>
          </div>
          <span className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest rounded-md shrink-0 w-max ${
            order.status === "PENDING" ? "bg-gray-100 text-gray-500" :
            order.status === "PROCESSING" ? "bg-gray-800 text-white" :
            order.status === "SHIPPED" ? "bg-gray-200 text-gray-800" :
            order.status === "DELIVERED" ? "bg-[#FF3333] text-white" :
            "bg-red-50 text-red-700"
          }`}>
            {order.status}
          </span>
        </div>

        <OrderStatusAction 
          order={order} 
          nextAction={nextAction} 
          isUpdating={isUpdating} 
          handleUpdateStatus={handleUpdateStatus} 
        />

        <div className="p-6 sm:p-8 space-y-10">
          <OrderCustomerDetails order={order} shortOrderId={shortOrderId} />
          <OrderItemsList order={order} />
        </div>
      </div>
    </div>
  );
}
