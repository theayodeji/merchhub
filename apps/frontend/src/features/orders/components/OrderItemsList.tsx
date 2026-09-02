import { Package } from "lucide-react";
import type { CreatorOrder } from "../hooks/useOrders";

interface OrderItemsListProps {
  order: CreatorOrder;
}

export const OrderItemsList = ({ order }: OrderItemsListProps) => {
  return (
    <div>
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Order Items</h3>
      <div className="bg-gray-50 rounded-xl p-4 space-y-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex gap-4 items-start">
            <div className="size-12 rounded-lg bg-white border border-gray-200 shrink-0 overflow-hidden">
              {item.product.images[0] ? (
                <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="size-4 text-gray-400" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <p className="font-bold text-gray-900 text-sm truncate">{item.product.name}</p>
              <p className="font-medium text-gray-500 text-xs mt-0.5">
                {item.quantity} × ${(item.unitPrice / 100).toFixed(2)}
              </p>
            </div>
            <div className="text-right shrink-0 pt-0.5">
              <p className="font-bold text-gray-900 text-sm">${(item.total / 100).toFixed(2)}</p>
            </div>
          </div>
        ))}
        
        <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
          <span className="font-bold text-gray-500 text-sm">Total Paid</span>
          <span className="font-black text-gray-900">${(order.total / 100).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
