"use client";

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
  className?: string;
}

export const StockLabel = ({ slug, className }: Props) => {
  const [stock, setStock] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getStock = async () => {
      const productStock = await getStockBySlug(slug);
      setStock(productStock!);
      setIsLoading(false);
    };  
    getStock();
  }, [slug]);

  return (
    <>
      {isLoading ? (
        <h1 className={`${titleFont.className} ${className} antialiased bg-gray-300 animate-pulse`}>
          &nbsp;
        </h1>
      ) : (
        <h1 className={clsx(
          `${titleFont.className} ${className} antialiased`,{
            "text-red-600 underline" : stock === 0
          }
        )}>
          Available Stock: {stock}
        </h1>
      )}
    </>
  );
};
