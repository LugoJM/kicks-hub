import Link from "next/link";
import { Title } from "@/components";
import { ProductsInCheckout } from "./ui/ProductsInCheckout";
import { PlaceOrder } from "./ui/PlaceOrder";

export const metadata = {
 title: 'Checkout',
 description: 'Checkout Page',
};

export default function CheckOutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Verify Order" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Cart */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Change items</span>
            <Link href="/cart" className="underline mb-5">
              Edit Cart
            </Link>

            {/* Items */}
            <ProductsInCheckout />
          </div>
          {/* Order Summary */}
          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}
