"use client";

import { useCartStore } from "@/store";
import { useEffect, useState } from "react";
import { currencyFormat } from '../../../../utils/currency-format';

export const OrderSummaryDetails = () => {
  const [loading, setLoading] = useState(true);
  const { total, subtotal, taxes, totalItems } = useCartStore((state) =>
    state.getOrderSummary()
  );

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-2">
      <span># of Products</span>
      <span className="text-right">{totalItems === 1 ? '1 item' : `${totalItems} items`}</span>

      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subtotal)}</span>

      <span>Taxes (15%)</span>
      <span className="text-right">{currencyFormat(taxes)}</span>

      <span className="mt-5 text-2xl">Total:</span>
      <span className="mt-5 text-2xl text-right font-bold">{currencyFormat(total)}</span>
    </div>
  );
};
