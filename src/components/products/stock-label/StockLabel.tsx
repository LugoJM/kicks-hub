"use client";

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
  className?: string;
}

export const StockLabel = ({ slug, className }: Props) => {
  const [stock, setStock] = useState<number>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStock();
  }, []);

  const getStock = async () => {
    const productStock = await getStockBySlug(slug);
    setStock(productStock);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <h1 className={`${titleFont.className} ${className} antialiased bg-gray-300 animate-pulse`}>
          &nbsp;
        </h1>
      ) : (
        <h1 className={`${titleFont.className} ${className} antialiased`}>
          Available Stock: {stock}
        </h1>
      )}
    </>
  );
};
