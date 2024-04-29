import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  productsInCart: CartProduct[];
  addProductToCart: (product: CartProduct) => void;
  getCartItems : () => number;
  changeItemQuantity : (product : CartProduct, quantity : number) => void;
  removeProductFromCart : (product : CartProduct) => void;
  getOrderSummary : () => { totalItems : number, subtotal : number, taxes : number, total : number};
  clearCart : () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      productsInCart: [],

      addProductToCart: (product: CartProduct) => {
        const { productsInCart } = get();
        /* Check if the product exist on the cart and what size */

        const productExists = productsInCart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        /* If the product doesn't exist, add to cart */
        if (!productExists) {
          set({ productsInCart: [...productsInCart, product] });
          return;
        }

        /* If the product does exist, increment the product based on the size */
        const updatedCartProducts = productsInCart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });

        set({ productsInCart: updatedCartProducts });
      },
      getCartItems : () => {
        const { productsInCart } = get();
        return productsInCart.reduce( (total, item) => total + item.quantity, 0);
      },
      changeItemQuantity : (product : CartProduct, quantity : number) =>{
        const { productsInCart } = get();
        const updatedProducts = productsInCart.map(item => {
          if(item.id === product.id && item.size === product.size){
            return {...item, quantity}
          }
        return item;
        });

        set({productsInCart : updatedProducts });
      },
      removeProductFromCart : (product : CartProduct) =>{
        const { productsInCart } = get();

        const updatedProducts = productsInCart.filter(item => item.id !== product.id || item.size !== product.size);

        set({productsInCart : updatedProducts});
      },
      getOrderSummary : () => {
        const { productsInCart } = get();
        const totalItems = productsInCart.reduce( (total, item) => total + item.quantity, 0);
        const subtotal = productsInCart.reduce((subtotal, item) => subtotal + (item.quantity * item.price), 0);
        const taxes = subtotal * 0.15;
        const total = subtotal + taxes;

        return {
          totalItems, subtotal, taxes, total
        };
      },
      clearCart : () => {
        set({productsInCart : []})
      }
    }),
    {
      name: "shopping-cart",
    }
  )
);
