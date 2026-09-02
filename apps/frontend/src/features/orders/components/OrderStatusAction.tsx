import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CreatorOrder, OrderStatus } from "../hooks/useOrders";

interface OrderStatusActionProps {
  order: CreatorOrder;
  nextAction: { label: string; value: OrderStatus; description: string } | null;
  isUpdating: boolean;
  handleUpdateStatus: (status: OrderStatus) => void;
}

export const OrderStatusAction = ({ order, nextAction, isUpdating, handleUpdateStatus }: OrderStatusActionProps) => {
  return (
    <div className="bg-zinc-50 py-6 px-6 sm:px-8 border-b border-gray-100">
      {nextAction ? (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-gray-900 text-lg tracking-tight">Update Status</h3>
            <p className="text-sm font-medium text-gray-500">
              {nextAction.description}
            </p>
          </div>
          
          <Button
            onClick={() => handleUpdateStatus(nextAction.value)}
            disabled={isUpdating}
            className="h-12 rounded-lg w-full sm:w-auto font-bold tracking-widest uppercase transition-all disabled:opacity-50 bg-[#FF3333] hover:bg-red-600 text-white shrink-0 px-8"
          >
            {isUpdating ? "Updating..." : nextAction.label}
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {order.status === 'CANCELLED' ? (
            <>
              <X className="size-5 text-red-500" />
              <span className="font-bold text-red-500 tracking-tight">Order Cancelled</span>
            </>
          ) : (
            <>
              <Check className="size-5 text-green-600" />
              <span className="font-bold text-green-600 tracking-tight">Order Completed</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};
