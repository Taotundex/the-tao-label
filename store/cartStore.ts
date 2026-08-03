import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/product";

export interface CartItem {
  product: Product;
  quantity: number;
  color: string;
  size: string;
}

interface CartState {
  items: CartItem[];
  cartOpen: boolean;
  addToCart: (product: Product, color: string, size: string) => void;
  removeFromCart: (productId: number) => void;
  toggleCart: () => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      cartOpen: false,
      addToCart: (product, color, size) =>
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) =>
              item.product.id === product.id && item.color === color && item.size === size
          );

          if (existingIndex >= 0) {
            const items = [...state.items];
            items[existingIndex].quantity += 1;
            return { items };
          }

          return {
            items: [
              ...state.items,
              { product, quantity: 1, color, size },
            ],
          };
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        })),
      toggleCart: () => set((state) => ({ cartOpen: !state.cartOpen })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "tao-cart-storage",
      partialize: (state) => ({ items: state.items, cartOpen: state.cartOpen }),
    }
  )
);
