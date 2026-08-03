import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/product";

interface ToastState {
  message: string;
  visible: boolean;
  showToast: (message: string) => void;
  hideToast: () => void;
}

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

export const useCartStore = create<CartState & ToastState>()(
  persist(
    (set) => ({
      items: [],
      cartOpen: false,
      message: "",
      visible: false,
      showToast: (message) => set({ message, visible: true }),
      hideToast: () => set({ visible: false, message: "" }),
      addToCart: (product, color, size) =>
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) =>
              item.product.id === product.id && item.color === color && item.size === size
          );

          const nextItems = existingIndex >= 0
            ? state.items.map((item, index) =>
                index === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
              )
            : [
                ...state.items,
                { product, quantity: 1, color, size },
              ];

          return {
            items: nextItems,
            message: `${product.title} added to cart`,
            visible: true,
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
