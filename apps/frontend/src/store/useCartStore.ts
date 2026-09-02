import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../features/products/hooks/useProducts';

export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product: Product, quantity: number = 1) => {
        set((state: CartStore) => {
          const existingItem = state.items.find((item: CartItem) => item.id === product.id);
          
          if (existingItem) {
            // Check stock limit
            const newQuantity = Math.min(existingItem.quantity + quantity, product.stock);
            
            return {
              items: state.items.map((item: CartItem) => 
                item.id === product.id 
                  ? { ...item, quantity: newQuantity } 
                  : item
              )
            };
          }
          
          // Add new item if stock is available
          if (product.stock > 0) {
            return {
              items: [...state.items, { ...product, quantity: Math.min(quantity, product.stock) }]
            };
          }
          
          return state;
        });
      },
      
      removeItem: (productId: string) => {
        set((state: CartStore) => ({
          items: state.items.filter((item: CartItem) => item.id !== productId)
        }));
      },
      
      updateQuantity: (productId: string, quantity: number) => {
        set((state: CartStore) => ({
          items: state.items.map((item: CartItem) => {
            if (item.id === productId) {
              return { ...item, quantity: Math.min(Math.max(1, quantity), item.stock) };
            }
            return item;
          })
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getCartTotal: () => {
        const { items } = get();
        return items.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0);
      },
      
      getCartCount: () => {
        const { items } = get();
        return items.reduce((count: number, item: CartItem) => count + item.quantity, 0);
      }
    }),
    {
      name: 'merchhub-cart',
    }
  )
);
