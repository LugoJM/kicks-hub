"use client";

import { useState } from "react";
import { QuantitySelector, SizeSelector } from "@/components";
import type { CartProduct, Product } from "@/interfaces";
import { useCartStore } from "@/store";

interface Props {
  product: Product;
}

export const AddToCartSelectors = ({ product }: Props) => {
  const { sizes } = product;

  const addProductToCart = useCartStore(state => state.addProductToCart);

  const [posted, setPosted] = useState(false);
  const [size, setSize] = useState<string | undefined>();
  const [quantity, setQuantity] = useState<number>(1);

  const addToCart = () => {
    setPosted(true);

    if(!size) return;

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity,
      size,
      image: product.images[0],
    };

    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  };

  return (
    <>
      {posted && !size &&  (
        <span className="mt-2 text-red-500 fade-in">You must pick a size*</span>
      )}
      <SizeSelector
        selectedSize={size}
        availableSizes={sizes}
        onSizeSelected={setSize}
      />
      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

      <button onClick={addToCart} className="btn-primary py-2 my-5">
        Add to cart
      </button>
    </>
  );
};
