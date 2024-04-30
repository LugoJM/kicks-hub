"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store";
import { redirect } from "next/navigation";
import { currencyFormat } from "@/utils";
import { ProductImage } from "@/components";

export const ProductsInCheckout = () => {
  const [loading, setLoading] = useState(false);
  const productsInCart = useCartStore(state => state.productsInCart);

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
            <ProductImage
              src={product.image}
              width={100}
              height={100}
              alt={product.title}
              className="mr-5 rounded h-28 w-28"
            />

            <div>
              <span>{product.title}</span>
              <p className="text-sm my-1">Size: {product.size}</p>
              <p className="text-sm my-1">Quantity: {product.quantity}</p>
              <p className="font-bold">{currencyFormat(product.price * product.quantity)}</p>
            </div>
          </div>
          <div className="w-full h-px bg-gray-400 my-4" />
        </div>
      ))}
    </>
  );
};
