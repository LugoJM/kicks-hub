"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store";
import { redirect } from "next/navigation";
import { currencyFormat } from "@/utils";

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
