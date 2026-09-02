import { useState } from "react";
import {
  useCreatorOrders,
  useUpdateOrderStatus,
  type OrderStatus,
} from "../hooks/useOrders";
import { format } from "date-fns";
import { CopyButton } from "@/components/ui/copy-button";

export const OrderList = () => {
  const { data: orders, isLoading, isError } = useCreatorOrders();
  const updateStatusMutation = useUpdateOrderStatus();
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setUpdatingOrderId(orderId);
    updateStatusMutation.mutate(
      { orderId, status: newStatus },
      { onSettled: () => setUpdatingOrderId(null) },
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
        Failed to load orders. Please try again later.
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 py-16 text-center">
        <h3 className="mb-1 text-lg font-semibold text-gray-900">
          No orders yet
        </h3>
        <p className="text-sm text-gray-500">
          When customers buy your products, their orders will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm text-gray-600">
        <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th className="px-6 py-4 font-semibold">Order Ref</th>
            <th className="px-6 py-4 font-semibold">Product</th>
            <th className="px-6 py-4 font-semibold">Customer</th>
            <th className="px-6 py-4 font-semibold">Date</th>
            <th className="px-6 py-4 font-semibold text-right">Total</th>
            <th className="px-6 py-4 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50/50">
              <td className="px-6 py-4">
                <CopyButton 
                  value={order.id} 
                  displayText={`${order.id.slice(0, 8)}...`} 
                  className="-ml-2"
                />
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md bg-gray-100">
                    {order.items?.[0]?.product?.images?.[0] && (
                      <img
                        src={order.items[0].product.images[0]}
                        alt={order.items[0].product.name}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900 line-clamp-1">
                        {order.items?.[0]?.product?.name || "Unknown Product"}
                      </p>
                      {order.items?.length > 1 && (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
                          +{order.items.length - 1} more
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      Qty: {order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <p className="font-medium text-gray-900">
                  {order.customerName}
                </p>
                <p className="text-xs text-gray-500">
                  {order.customerEmail || order.customerPhone}
                </p>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {format(new Date(order.createdAt), "MMM d, yyyy")}
              </td>
              <td className="px-6 py-4 text-right font-medium text-gray-900">
                ${(order.total / 100).toFixed(2)}
              </td>
              <td className="px-6 py-4">
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order.id, e.target.value as OrderStatus)
                  }
                  disabled={updatingOrderId === order.id}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider outline-none transition-colors ${
                    order.status === "PENDING"
                      ? "border-yellow-200 bg-yellow-50 text-yellow-700"
                      : order.status === "PROCESSING"
                        ? "border-blue-200 bg-blue-50 text-blue-700"
                        : order.status === "SHIPPED"
                          ? "border-purple-200 bg-purple-50 text-purple-700"
                          : order.status === "DELIVERED"
                            ? "border-green-200 bg-green-50 text-green-700"
                            : "border-red-200 bg-red-50 text-red-700"
                  } disabled:opacity-50`}
                >
                  <option value="PENDING">Pending</option>
                  <option value="PROCESSING">Processing</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
