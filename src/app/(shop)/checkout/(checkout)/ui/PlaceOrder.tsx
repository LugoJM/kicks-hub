"use client";

import { useEffect, useState } from "react";
import { placeOrder } from "@/actions";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { SummaryDetails } from "@/components";

export const PlaceOrder = () => {
  // TODO: Router gives error after a global state change(clearCart())
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const address = useAddressStore((state) => state.address);
  const cart = useCartStore(state => state.productsInCart);
  const clearCart = useCartStore(state => state.clearCart);

  const { total, subtotal, taxes, totalItems } = useCartStore((state) =>
    state.getOrderSummary()
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlacedOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map(product => ({
        productId : product.id,
        quantity : product.quantity,
        size : product.size
    }));

    const response = await placeOrder(productsToOrder, address);

    if(!response.ok){
      setIsPlacingOrder(false);
      setErrorMessage(response.message);
      return;
    }
    clearCart();
    window.location.replace("/orders/" + response.orderId);

  };

  if (!loaded) return <p>Loading...</p>;

  return (
    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
      <h2 className="text-2xl mb-2 font-bold">Delivery Address</h2>
      <div className="mb-10">
        <p className="underline">
          {address.name} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.additionalAddress}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.postalCode}</p>
        <p>{address.phone}</p>
      </div>

      {/* Divider */}
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

      <h2 className="text-2xl mb-2">Order Summary</h2>
      <SummaryDetails items={totalItems} subTotal={subtotal} total={total} tax={taxes} />

      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          {/* Disclaimer */}
          <span className="text-xs">
            {`By clicking "Place order", you accept our `}
            <a href="#" className="underline">
              terms and conditions of use
            </a>{" & "}
            <a href="#" className="underline">
              our privacy policy.
            </a>
          </span>
        </p>

        <p className="text-red-500 italic mb-2">{errorMessage}</p>

        <button
          disabled={isPlacingOrder}
          onClick={onPlacedOrder}
          className={clsx("flex justify-center items-center gap-2 w-full", {
            "btn-primary": !isPlacingOrder,
            "btn-disabled": isPlacingOrder,
          })}
        >
            <IoCheckmarkCircleOutline size={25}/> Place Order
        </button>
      </div>
    </div>
  );
};
