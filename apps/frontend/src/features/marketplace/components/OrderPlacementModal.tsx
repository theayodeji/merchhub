import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Product } from '../../products/hooks/useProducts';
import type { CreateOrderPayload } from '../../storefront/hooks/useStorefront';

interface OrderPlacementModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onSubmit: (data: CreateOrderPayload) => void;
  isSubmitting: boolean;
}

export const OrderPlacementModal = ({ isOpen, onClose, product, onSubmit, isSubmitting }: OrderPlacementModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    deliveryAddress: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      productId: product.id,
      quantity,
      ...formData
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Complete Your Order</DialogTitle>
          <DialogDescription>
            You are ordering <strong>{product.name}</strong> for \${((product.price * quantity) / 100).toFixed(2)}.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Quantity</label>
            <input 
              type="number" 
              min={1} 
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="rounded-md border border-neutral-200 bg-transparent px-3 py-2 text-sm dark:border-neutral-800"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Full Name</label>
            <input 
              type="text" 
              value={formData.customerName}
              onChange={(e) => setFormData(p => ({ ...p, customerName: e.target.value }))}
              className="rounded-md border border-neutral-200 bg-transparent px-3 py-2 text-sm dark:border-neutral-800"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Email Address (Optional)</label>
            <input 
              type="email" 
              value={formData.customerEmail}
              onChange={(e) => setFormData(p => ({ ...p, customerEmail: e.target.value }))}
              className="rounded-md border border-neutral-200 bg-transparent px-3 py-2 text-sm dark:border-neutral-800"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Phone Number</label>
            <input 
              type="tel" 
              value={formData.customerPhone}
              onChange={(e) => setFormData(p => ({ ...p, customerPhone: e.target.value }))}
              className="rounded-md border border-neutral-200 bg-transparent px-3 py-2 text-sm dark:border-neutral-800"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Delivery Address</label>
            <textarea 
              value={formData.deliveryAddress}
              onChange={(e) => setFormData(p => ({ ...p, deliveryAddress: e.target.value }))}
              className="min-h-20 rounded-md border border-neutral-200 bg-transparent px-3 py-2 text-sm dark:border-neutral-800"
              required
            />
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
