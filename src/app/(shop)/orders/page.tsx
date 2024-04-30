export const dynamic = "force-dynamic";

import Link from "next/link";
import { Pagination, Title } from "@/components";
import { IoCardOutline } from "react-icons/io5";
import { getPaginatedOrders } from "@/actions";
import { redirect } from "next/navigation";
import clsx from "clsx";

interface Props {
  searchParams : {
    page : number
  }
}

export default async function OrdersPage( { searchParams } : Props) {
  const page = searchParams.page ? +searchParams.page : 1;
  const {ok, totalPages = 1, orders = []} = await getPaginatedOrders({page});
  if(!ok) redirect("/");
  return (
    <>
      <Title title="Orders" />
      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                #ID
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Full Name
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Status
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.id.split("-").at(-1)}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {order.orderAddress?.name} {order.orderAddress?.lastName}
                </td>

                <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <IoCardOutline
                    className={clsx({
                      "text-green-800": order.isPaid,
                      "text-red-800": !order.isPaid,
                    })}
                  />
                  <span className="mx-2 text-green-800">
                    {order.isPaid ? "Payed" : "Payment pending"}
                  </span>
                </td>

                <td className="text-sm text-gray-900 font-light px-6 ">
                  <Link
                    href={`/orders/${order.id}`}
                    className="hover:underline"
                  >
                    View Order
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination totalPages={totalPages}/>
      </div>
    </>
  );
}
