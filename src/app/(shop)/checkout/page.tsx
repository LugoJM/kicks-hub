import Link from "next/link";
import Image from "next/image";
import { Title } from "@/components";
import { initialData } from "@/seed/seed";


const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]
  
export default function CheckOutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">

        <Title title='Verify Order' />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Cart */ }
          <div className="flex flex-col mt-5">
            <span className="text-xl">Change items</span>
            <Link href="/cart" className="underline mb-5">
              Edit Cart
            </Link>
         
          {/* Items */ }
          {
            productsInCart.map( product => (

              <div key={ product.slug } className="flex mb-5">
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
                  <p>{ product.title }</p>
                  <p>${ product.price } x 3</p>
                  <p className='font-bold'>Subtotal: ${product.price*3}</p>
                </div>
              </div>
            ))
          }
           </div>
          {/* Order Summary */ }
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className='text-2xl mb-2 font-bold'>Delivery Address</h2>
            <div className='mb-10'>
              <p className='underline'>Jose M. Lugo</p>
              <p>Grand Ave. 999</p>
              <p>Nogales, AZ</p>
              <p>85621-2234</p>
              <p>+1(520) 111 1111</p>
            </div>

            {/* Divider */}
            <div className='w-full h-0.5 rounded bg-gray-200 mb-10'/>

            <h2 className="text-2xl mb-2">Order Summary</h2>
            <div className="grid grid-cols-2">

              <span># of Products</span>
              <span className="text-right">3 items</span>
              
              <span>Subtotal</span>
              <span className="text-right">$ 100</span>
              
              <span>Taxes (15%)</span>
              <span className="text-right">$ 100</span>
              
              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">$ 100</span>
            </div>

            <div className="mt-5 mb-2 w-full">

              <p className='mb-5'>
                {/* Disclaimer */}
                <span className='text-xs'>
                  {`By clicking "Place order", you accept our `} 
                  <a href="#" className='underline'>terms and conditions of use</a> {''}
                  & <a href="#" className='underline'> our privacy policy</a>
                </span>
              </p>

              <Link 
                className="flex btn-primary justify-center"
                href="/orders/123">
                Place Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}