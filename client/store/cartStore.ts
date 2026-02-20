import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product: any) => {
        const existing = get().cart.find(
          (item: any) => item._id === product._id,
        );

        if (existing) {
          set({
            cart: get().cart.map((item: any) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          });
        } else {
          set({
            cart: [...get().cart, { ...product, quantity: 1 }],
          });
        }
      },

      removeFromCart: (id: string) =>
        set({
          cart: get().cart.filter((item: any) => item._id !== id),
        }),

      increaseQty: (id: string) =>
        set({
          cart: get().cart.map((item: any) =>
            item._id === id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        }),

      decreaseQty: (id: string) =>
        set({
          cart: get()
            .cart.map((item: any) =>
              item._id === id
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                  }
                : item,
            )
            .filter((item: any) => item.quantity > 0),
        }),
    }),
    {
      name: "orioncart-storage",
    },
  ),
);
