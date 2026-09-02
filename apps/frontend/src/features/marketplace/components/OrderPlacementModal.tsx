import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { authClient } from "../../../lib/auth-client";

interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderPlacementModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CheckoutItem[];
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}

export const OrderPlacementModal = ({
  isOpen,
  onClose,
  items,
  onSubmit,
  isSubmitting,
}: OrderPlacementModalProps) => {
  const { data: session } = authClient.useSession();
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    deliveryAddress: "",
  });

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        customerName: session.user.name || prev.customerName,
        customerEmail: session.user.email || prev.customerEmail,
      }));
    }
  }, [session]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      items: items.map(i => ({ productId: i.id, quantity: i.quantity })),
      ...formData,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-125 bg-white text-black">
        <DialogHeader>
          <DialogTitle className="text-black">Complete Your Order</DialogTitle>
          <DialogDescription className="text-gray-600">
            You are ordering{" "}
            <strong className="text-black">{items.length} item(s)</strong> for $
            {(totalAmount / 100).toFixed(2)}.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-black">Full Name</label>
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) =>
                setFormData((p) => ({ ...p, customerName: e.target.value }))
              }
              className="rounded-md border border-neutral-200 bg-transparent px-3 py-2 text-sm text-black"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-black">
              Email Address (Optional)
            </label>
            <input
              type="email"
              value={formData.customerEmail}
              onChange={(e) =>
                setFormData((p) => ({ ...p, customerEmail: e.target.value }))
              }
              className="rounded-md border border-neutral-200 bg-transparent px-3 py-2 text-sm text-black"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-black">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.customerPhone}
              onChange={(e) =>
                setFormData((p) => ({ ...p, customerPhone: e.target.value }))
              }
              className="rounded-md border border-neutral-200 bg-transparent px-3 py-2 text-sm text-black"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-black">
              Delivery Address
            </label>
            <textarea
              value={formData.deliveryAddress}
              onChange={(e) =>
                setFormData((p) => ({ ...p, deliveryAddress: e.target.value }))
              }
              className="min-h-20 rounded-md border border-neutral-200 bg-transparent px-3 py-2 text-sm text-black"
              required
            />
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Proceed to Payment"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
