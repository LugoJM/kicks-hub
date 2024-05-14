'use client';

import { Product } from "@/interfaces"
import Link from "next/link";
import { useState } from "react";
import { ProductImage } from "../product-image/ProductImage";

interface Props {
    product : Product;

}

export const ProductGridItem = ( { product } : Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);
  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.slug}`}>
      <ProductImage
          src={displayImage}
          alt={product.title}
          width={500}
          height={500}
          className="object-cover rounded h-[500px] w-full"
          onMouseEnter={() => setDisplayImage( product.images[1] )  }
          onMouseLeave={() => setDisplayImage( product.images[0] ) }
        />
      </Link>

        <div className="p-4 flex flex-col">
            <Link href={`/product/${product.slug}`} className="hover:text-blue-600">
                {product.title}
            </Link>
            <span className="font-bold">${product.price.toFixed(2)}</span>
        </div>
    </div>
  )
}
