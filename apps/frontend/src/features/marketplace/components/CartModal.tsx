import { ShoppingCart, X, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "../../../store/useCartStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { usePlaceOrder } from "../../storefront/hooks/useStorefront";
import { OrderPlacementModal } from "./OrderPlacementModal";
import { useState } from "react";

export const CartModal = () => {
  const { items, removeItem, updateQuantity, getCartTotal, clearCart } = useCartStore();
  const placeOrderMutation = usePlaceOrder();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckout = () => {
    if (items.length === 0) return;
    setIsCheckoutOpen(true);
    setIsOpen(false);
  };

  const handleOrderSubmit = (data: any) => {
    placeOrderMutation.mutate(data, {
      onSuccess: (res: any) => {
        clearCart();
        setIsCheckoutOpen(false);
        window.location.href = res.paymentUrl;
      }
    });
  };

  // Hardcoded shipping for UI purposes since shipping logic isn't fully implemented in the backend yet
  const shippingCost = items.length > 0 ? 3200 : 0; 
  const subtotal = getCartTotal();
  const total = subtotal + shippingCost;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer focus:outline-none">
            <div className="relative">
              <ShoppingCart className="size-6" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black border border-neutral-800">
                  {items.length}
                </span>
              )}
            </div>
            <span className="font-bold text-sm hidden sm:block">
              ${(subtotal / 100).toFixed(2)}
            </span>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] md:max-w-[500px] p-0 overflow-hidden bg-white/95 backdrop-blur-xl border-neutral-100 shadow-2xl rounded-2xl">
          <div className="p-6">
            <DialogHeader className="mb-6 flex flex-row items-center justify-between space-y-0">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-neutral-400">
                  {items.length < 10 ? `0${items.length}` : items.length} / {items.reduce((acc: number, item: any) => acc + item.quantity, 0) < 10 ? `0${items.reduce((acc: number, item: any) => acc + item.quantity, 0)}` : items.reduce((acc: number, item: any) => acc + item.quantity, 0)}
                </span>
                <DialogTitle className="text-xl font-medium tracking-tight">Final Cart</DialogTitle>
              </div>
              <DialogClose className="rounded-full bg-neutral-100 p-2 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900 transition-colors">
                <X className="h-4 w-4" />
              </DialogClose>
            </DialogHeader>

            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <ShoppingCart className="h-12 w-12 text-neutral-200 mb-4" />
                <p className="text-lg font-medium text-neutral-400">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="space-y-4 max-h-[35vh] overflow-y-auto pr-2 custom-scrollbar">
                  {items.map((item: any) => (
                    <div key={item.id} className="flex items-center gap-4 group">
                      <div className="h-12 w-16 flex-shrink-0 overflow-hidden rounded-md bg-neutral-50 flex items-center justify-center border border-neutral-100">
                        {item.images?.[0] ? (
                          <img src={item.images[0]} alt={item.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full bg-neutral-100" />
                        )}
                      </div>
                      
                      <div className="flex flex-1 flex-col justify-center">
                        <h4 className="text-sm font-medium text-neutral-900 line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1">{item.id.slice(0,4)} - {item.name}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-3 bg-neutral-50 rounded-full px-2 py-1">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-neutral-400 hover:text-neutral-900 disabled:opacity-50 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-4 text-center text-xs font-medium text-neutral-700">
                            {item.quantity < 10 ? `0${item.quantity}` : item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-neutral-400 hover:text-neutral-900 disabled:opacity-50 transition-colors"
                            disabled={item.quantity >= item.stock}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        
                        <div className="w-16 text-right flex flex-col items-end gap-2">
                          <span className="text-sm font-medium text-neutral-900">
                            ${(item.price / 100).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-neutral-300 hover:text-red-500 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-neutral-900">Delivery Options</h4>
                    <button className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors">Learn more {'>'}</button>
                  </div>
                  
                  <div className="flex items-center justify-between bg-neutral-50 rounded-xl p-3 border border-neutral-100 cursor-pointer hover:border-neutral-200 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center border border-neutral-100">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-600"><path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19M23 13v-2M11 6l-4 6h6l-4 6"/></svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-neutral-900">2-7 working days</span>
                        <span className="text-[10px] text-neutral-400">Express</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-neutral-900">${(shippingCost / 100).toFixed(2)}</span>
                      <span className="text-neutral-300">{'>'}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">Quantity</span>
                    <span className="font-medium text-neutral-900">{items.reduce((acc: number, item: any) => acc + item.quantity, 0) < 10 ? `0${items.reduce((acc: number, item: any) => acc + item.quantity, 0)}` : items.reduce((acc: number, item: any) => acc + item.quantity, 0)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">Shipping</span>
                    <span className="font-medium text-neutral-900">${(shippingCost / 100).toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-5 pt-4 border-t border-neutral-100">
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-neutral-900">Total</span>
                      <span className="text-[10px] text-neutral-400 flex items-center gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"/><path d="M12 3v6"/></svg>
                        Free returns within 30 days
                      </span>
                    </div>
                    <span className="text-xl font-semibold tracking-tight text-neutral-900">
                      ${(total / 100).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1 bg-neutral-50/50 border-neutral-100 hover:bg-neutral-100 text-neutral-600 rounded-xl h-12"
                      onClick={() => setIsOpen(false)}
                    >
                      Continue shopping
                    </Button>
                    <Button 
                      className="flex-[1.5] bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl h-12"
                      onClick={handleCheckout}
                    >
                      Complete order {'>'}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <OrderPlacementModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={items.map((i: any) => ({
          id: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity
        }))}
        onSubmit={handleOrderSubmit}
        isSubmitting={placeOrderMutation.isPending}
      />
    </>
  );
};
