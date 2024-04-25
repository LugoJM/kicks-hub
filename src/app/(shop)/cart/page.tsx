import Link from "next/link";
import Image from "next/image";
import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import { redirect } from "next/navigation";


const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]
  

export default function CartPage() {  
  // redirect("/empty");
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
          {
            productsInCart.map( product => (
              <>
                <div key={ product.slug } className="flex">
                  <Image
                    src={ `/products/${ product.images[ 0 ] }` }
                    width={ 100 }
                    height={ 100 }
                    style={{
                      width: '100px',
                      height: '100px'
                    }}
                    alt={ product.title }
                    className="mr-5 rounded"
                    />

                  <div>
                    <Link href={`/product/${product.slug}`} className="font-medium">{product.title}</Link>
                    <p>${ product.price }</p>
                    <QuantitySelector quantity={ 3 } />
                    <button className="underline mt-3">
                      Remove
                    </button>
                  </div>
                </div>
                <div className="w-full h-px bg-gray-400 my-4"/>
              </>
            ))
          }
           </div>
          {/* Order Summary */ }
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-4 font-medium text-center">Order Summary</h2>
            <div className="grid grid-cols-2">

              <span># of Products</span>
              <span className="text-right">3 items</span>
              
              <span>Subtotal</span>
              <span className="text-right">$ 100</span>
              
              <span>Taxes (15%)</span>
              <span className="text-right">$ 100</span>
              
              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right font-bold">$ 100</span>
            </div>

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