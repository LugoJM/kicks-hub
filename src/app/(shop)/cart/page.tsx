import Link from "next/link";
import { Title } from "@/components";
import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummaryDetails } from "./ui/OrderSummaryDetails";


export default function CartPage() {  
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">

        <Title title='Cart' />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Cart */ }
          <div className="flex flex-col mt-5">
            <span className="text-xl">Add more items</span>
            <Link href="/" className="underline mb-5 hover:text-blue-500">
              Keep shopping
            </Link>
         
          {/* Items */ }
          <ProductsInCart />

          </div>
          {/* Order Summary */ }
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-4 font-medium text-center">Order Summary</h2>
              <OrderSummaryDetails/>
            <div className="mt-5 mb-2 w-full">
              <Link 
                className="flex btn-primary justify-center"
                href="/checkout/address">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}