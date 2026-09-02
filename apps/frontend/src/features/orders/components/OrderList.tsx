import { useCreatorOrders } from "../hooks/useOrders";
import { format } from "date-fns";
import { CopyButton } from "@/components/ui/copy-button";
import { useNavigate } from "react-router-dom";

export const OrderList = () => {
  const { data: orders, isLoading, isError } = useCreatorOrders();
  const navigate = useNavigate();

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
            <tr 
              key={order.id} 
              className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 cursor-pointer group"
              onClick={() => navigate(`/dashboard/orders/${order.id}`)}
            >
              <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
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
                <span className={`inline-flex items-center rounded-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${
                  order.status === "PENDING"
                    ? "bg-gray-100 text-gray-500"
                    : order.status === "PROCESSING"
                      ? "bg-gray-800 text-white"
                      : order.status === "SHIPPED"
                        ? "bg-gray-200 text-gray-800"
                        : order.status === "DELIVERED"
                          ? "bg-[#FF3333] text-white"
                          : "bg-red-50 text-red-700"
                }`}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
