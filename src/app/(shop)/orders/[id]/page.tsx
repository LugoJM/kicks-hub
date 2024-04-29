import Image from "next/image";
import { redirect } from "next/navigation";
import { PaymentStatus, SummaryDetails, Title } from "@/components";
import { getOrderDetails } from "@/actions";
import { currencyFormat } from "@/utils";

interface Props {
  params : {
    id : string;
  }
}
  
export default async function OrderPage( {params} : Props) {
  const { id } = params;

  const displayId = id.split("-").at(-1)

  const { ok, order } = await getOrderDetails(id);

  if(!ok) redirect("/");

  const address = order!.orderAddress;

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${displayId}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <PaymentStatus isPayed={order!.isPaid} />

            {/* Items */}
            {order!.orderItems.map((item) => (
              <div key={`${item.product.slug} - ${item.size}`} className="flex mb-5">
                <Image
                  src={`/products/${item.product.ProductImage[0].url}`}
                  width={100}
                  height={100}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  alt={item.product.ProductImage[0].url}
                  className="mr-5 rounded"
                />

                <div>
                  <span>{item.product.title}</span>
                  <p className="text-sm my-1">Size: {item.size}</p>
                  <p className="text-sm my-1">Quantity: {item.quantity}</p>
                  <p className="font-bold">{currencyFormat(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2 font-bold">Delivery Address</h2>
            <div className="mb-10">
              <p className="underline">
                {address!.name} {address!.lastName}
              </p>
              <p>{address!.address}</p>
              <p>{address!.additionalAddress}</p>
              <p>
                {address!.city}, {address!.countryId}
              </p>
              <p>{address!.postalCode}</p>
              <p>{address!.phone}</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Order Summary</h2>
            <SummaryDetails items={order!.itemsInOrder} subTotal={order!.subTotal} total={order!.total} tax={order!.tax} />
            
            <div className="mt-5 mb-2 w-full">
              <PaymentStatus isPayed={order!.isPaid} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}