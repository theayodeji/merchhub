import { Heart, X, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "../../../store/useWishlistStore";
import { useCartStore } from "../../../store/useCartStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Link } from "react-router-dom";

export const WishlistModal = () => {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const addItemToCart = useCartStore((state) => state.addItem);
  const [isOpen, setIsOpen] = useState(false);

  const handleMoveToCart = (item: any) => {
    // Add to cart with quantity 1
    addItemToCart({ ...item, stock: 10 }, 1); // Mock stock if not provided
    removeItem(item.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="relative hover:text-primary transition-colors focus:outline-none">
          <Heart className="size-6" />
          <span
            className={`absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full text-[10px] font-bold text-white transition-colors ${
              items.length > 0 ? "bg-primary" : "bg-neutral-600"
            }`}
          >
            {items.length}
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[500px] p-0 overflow-hidden bg-white/95 backdrop-blur-xl border-neutral-100 shadow-2xl rounded-2xl">
        <div className="p-6">
          <DialogHeader className="mb-6 flex flex-row items-center justify-between space-y-0">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-neutral-400">
                {items.length < 10 ? `0${items.length}` : items.length} ITEM{items.length !== 1 ? 'S' : ''}
              </span>
              <DialogTitle className="text-xl font-medium tracking-tight">Your Wishlist</DialogTitle>
            </div>
            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => clearWishlist()}
                  className="text-xs text-neutral-400 hover:text-red-500 hover:bg-red-50"
                >
                  Clear All
                </Button>
              )}
              <DialogClose className="rounded-full bg-neutral-100 p-2 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900 transition-colors">
                <X className="h-4 w-4" />
              </DialogClose>
            </div>
          </DialogHeader>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Heart className="h-12 w-12 text-neutral-200 mb-4" />
              <p className="text-lg font-medium text-neutral-400">Your wishlist is empty</p>
              <Button 
                variant="outline" 
                className="mt-6 rounded-xl border-neutral-200"
                onClick={() => setIsOpen(false)}
              >
                Discover products
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item: any) => (
                  <div key={item.id} className="flex gap-4 group p-3 rounded-xl border border-neutral-100 bg-white hover:border-neutral-200 transition-all shadow-sm">
                    <Link to={`/product/${item.id}`} onClick={() => setIsOpen(false)}>
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-50 flex items-center justify-center border border-neutral-100 cursor-pointer">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full bg-neutral-100" />
                        )}
                      </div>
                    </Link>
                    
                    <div className="flex flex-1 flex-col justify-between py-1">
                      <div>
                        <Link to={`/product/${item.id}`} onClick={() => setIsOpen(false)}>
                          <h4 className="text-sm font-bold text-neutral-900 line-clamp-1 hover:text-primary transition-colors cursor-pointer">{item.name}</h4>
                        </Link>
                        <p className="text-sm font-medium text-neutral-900 mt-1">
                          ${(item.price / 100).toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <Button
                          size="sm"
                          className="h-8 text-xs font-semibold px-3 bg-neutral-900 text-white hover:bg-neutral-800 rounded-lg shadow-none"
                          onClick={() => handleMoveToCart(item)}
                        >
                          <ShoppingCart className="h-3 w-3 mr-1.5" />
                          Move to Cart
                        </Button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-neutral-400 hover:text-red-500 transition-colors p-1"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
