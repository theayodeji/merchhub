import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { CreatorOrder, OrderStatus } from "../hooks/useOrders";

interface OrderStatusActionProps {
  order: CreatorOrder;
  nextAction: { label: string; value: OrderStatus; description: string } | null;
  isUpdating: boolean;
  handleUpdateStatus: (status: OrderStatus) => void;
}

export const OrderStatusAction = ({ order, nextAction, isUpdating, handleUpdateStatus }: OrderStatusActionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const confirmAction = () => {
    if (nextAction) {
      handleUpdateStatus(nextAction.value);
      setIsOpen(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 w-full">
      {nextAction ? (
        <>
          <div>
            <h3 className="font-bold text-gray-900 text-xl tracking-tight mb-1">Next Step</h3>
            <p className="text-sm font-medium text-gray-500">
              {nextAction.description}
            </p>
          </div>
          
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                disabled={isUpdating}
                className="h-12 rounded-xl w-full sm:w-auto font-bold tracking-widest uppercase transition-all disabled:opacity-50 bg-[#FF3333] hover:bg-red-600 text-white px-8 shadow-sm hover:shadow-md shrink-0"
              >
                {isUpdating ? "Updating..." : nextAction.label}
              </Button>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Confirm Status Update</DialogTitle>
                <DialogDescription className="pt-4">
                  Are you sure you want to mark this order as <strong className="text-gray-900 capitalize">{nextAction.value.toLowerCase()}</strong>?
                  <br /><br />
                  An automated email will be sent to the customer to notify them of this update.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-6 flex gap-3 sm:gap-0">
                <Button variant="outline" onClick={() => setIsOpen(false)} className="w-full sm:w-auto">
                  Cancel
                </Button>
                <Button onClick={confirmAction} className="bg-[#FF3333] hover:bg-red-600 text-white w-full sm:w-auto">
                  Yes, Update Order
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <div className="flex items-center gap-4 w-full">
          {order.status === 'CANCELLED' ? (
            <>
              <div className="size-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <X className="size-6 text-red-500" />
              </div>
              <div>
                <span className="font-bold text-red-500 tracking-tight text-lg block">Order Cancelled</span>
                <p className="text-sm font-medium text-gray-500">No further action is required.</p>
              </div>
            </>
          ) : (
            <>
              <div className="size-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                <Check className="size-6 text-green-600" />
              </div>
              <div>
                <span className="font-bold text-green-600 tracking-tight text-lg block">Order Completed</span>
                <p className="text-sm font-medium text-gray-500">This order has been fully fulfilled.</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

