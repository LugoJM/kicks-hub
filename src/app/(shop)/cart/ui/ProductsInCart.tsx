"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import { redirect } from "next/navigation";

export const ProductsInCart = () => {
  const [loading, setLoading] = useState(false);
  const productsInCart = useCartStore(state => state.productsInCart);
  const updateProductQuantity = useCartStore(state => state.changeItemQuantity);
  const removeProduct = useCartStore(state => state.removeProductFromCart);

  useEffect(() => {
    setLoading(true);
  },[])

  if(!loading){
    return <p>Loading...</p>
  }
  
  if(productsInCart.length === 0) redirect('/empty');;

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`}>
          <div className="flex fade-in duration-300">
            <Image
              src={`/products/${product.image}`}
              width={100}
              height={100}
              style={{
                width: "100px",
                height: "100px",
              }}
              alt={product.title}
              className="mr-5 rounded"
            />

            <div>
              <Link href={`/product/${product.slug}`} className="font-medium hover:underline">
                {product.title}
              </Link>
              <p className="text-sm my-1">Size: {product.size}</p>
              <p>${product.price}</p>
              <QuantitySelector
                quantity={product.quantity}
                onQuantityChange={(quantity) => updateProductQuantity(product, quantity)}
              />
              <button onClick={() => removeProduct(product)} className="underline mt-3">Remove</button>
            </div>
          </div>
          <div className="w-full h-px bg-gray-400 my-4" />
        </div>
      ))}
    </>
  );
};
