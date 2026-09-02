import { format } from "date-fns";
import { type CreatorOrder } from "../../orders/hooks/useOrders";
import { CopyButton } from "@/components/ui/copy-button";
import { useNavigate } from "react-router-dom";

interface ProductOrdersListProps {
  orders: CreatorOrder[];
  productName: string;
}

export const ProductOrdersList = ({ orders, productName }: ProductOrdersListProps) => {
  const navigate = useNavigate();

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 py-16 text-center">
        <h3 className="mb-1 text-lg font-semibold text-gray-900">
          No orders yet
        </h3>
        <p className="text-sm text-gray-500">
          When customers buy this product, their orders will appear here.
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
            <th className="px-6 py-4 font-semibold">Transaction ID</th>
            <th className="px-6 py-4 font-semibold">Customer</th>
            <th className="px-6 py-4 font-semibold">Date</th>
            <th className="px-6 py-4 font-semibold text-right">Qty</th>
            <th className="px-6 py-4 font-semibold text-right">Revenue</th>
            <th className="px-6 py-4 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orders.map((order) => {
            // Find the specific item(s) in this order that match this product to get the accurate qty and revenue
            const productItems = order.items.filter(item => item.product.name === productName);
            const totalQty = productItems.reduce((sum, item) => sum + item.quantity, 0);
            const totalRevenue = productItems.reduce((sum, item) => sum + item.total, 0);

            return (
              <tr 
                key={order.id} 
                className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer group"
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
                  {order.transaction?.id ? (
                    <CopyButton 
                      value={order.transaction.id} 
                      displayText={`${order.transaction.id.slice(0, 8)}...`} 
                      className="-ml-2"
                    />
                  ) : (
                    <span className="text-gray-400 font-mono text-xs">N/A</span>
                  )}
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
                  {totalQty}
                </td>
                <td className="px-6 py-4 text-right font-medium text-green-600">
                  ${(totalRevenue / 100).toFixed(2)}
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
