import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem, Cart, Product, ProductVariant, Coupon } from "@/types";
import { VAT_RATE } from "@/lib/constants";

interface CartState extends Cart {
  // Actions
  addItem: (product: Product, variant?: ProductVariant | null, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (coupon: Coupon) => void;
  removeCoupon: () => void;
  setShippingFee: (fee: number) => void;
  getItemCount: () => number;
  isInCart: (productId: string, variantId?: string) => boolean;
}

const calculateCart = (
  items: CartItem[],
  coupon: Coupon | null,
  shippingFee: number
): Pick<Cart, "subtotal" | "discount" | "shipping" | "vat" | "total"> => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let discount = 0;
  if (coupon) {
    if (coupon.type === "percentage") {
      discount = (subtotal * coupon.value) / 100;
    } else if (coupon.type === "fixed") {
      discount = Math.min(coupon.value, subtotal);
    } else if (coupon.type === "free_shipping") {
      shippingFee = 0;
    }
  }

  const afterDiscount = subtotal - discount;
  const vat = afterDiscount * VAT_RATE;
  const total = afterDiscount + vat + shippingFee;

  return {
    subtotal,
    discount,
    shipping: shippingFee,
    vat,
    total,
  };
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      subtotal: 0,
      discount: 0,
      shipping: 0,
      vat: 0,
      total: 0,
      coupon: null,

      addItem: (product, variant = null, quantity = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) =>
              item.product.id === product.id &&
              item.variant?.id === variant?.id
          );

          let newItems: CartItem[];

          if (existingIndex >= 0) {
            newItems = state.items.map((item, idx) =>
              idx === existingIndex
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            const newItem: CartItem = {
              id: `${product.id}-${variant?.id ?? "default"}-${Date.now()}`,
              product,
              variant: variant ?? null,
              quantity,
              price: variant?.price ?? product.price,
            };
            newItems = [...state.items, newItem];
          }

          const totals = calculateCart(newItems, state.coupon, state.shipping);
          return { items: newItems, ...totals };
        });
      },

      removeItem: (itemId) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== itemId);
          const totals = calculateCart(newItems, state.coupon, state.shipping);
          return { items: newItems, ...totals };
        });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set((state) => {
          const newItems = state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          );
          const totals = calculateCart(newItems, state.coupon, state.shipping);
          return { items: newItems, ...totals };
        });
      },

      clearCart: () =>
        set({ items: [], subtotal: 0, discount: 0, shipping: 0, vat: 0, total: 0, coupon: null }),

      applyCoupon: (coupon) => {
        set((state) => {
          const totals = calculateCart(state.items, coupon, state.shipping);
          return { coupon, ...totals };
        });
      },

      removeCoupon: () => {
        set((state) => {
          const totals = calculateCart(state.items, null, state.shipping);
          return { coupon: null, ...totals };
        });
      },

      setShippingFee: (fee) => {
        set((state) => {
          const totals = calculateCart(state.items, state.coupon, fee);
          return { ...totals };
        });
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      isInCart: (productId, variantId) => {
        return get().items.some(
          (item) =>
            item.product.id === productId &&
            (variantId ? item.variant?.id === variantId : true)
        );
      },
    }),
    {
      name: "flora-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
