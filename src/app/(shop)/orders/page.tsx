import Link from 'next/link';
import { Title } from '@/components';
import { IoCardOutline } from 'react-icons/io5';

export default function OrdersPage() {
  return (
    <>
      <Title title="Orders" />
      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                #ID
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Full Name
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Status
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                JM. Lugo
              </td>

              <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <IoCardOutline className="text-green-800" />
                <span className='mx-2 text-green-800'>Payed</span>
              </td>

              <td className="text-sm text-gray-900 font-light px-6 ">
                <Link href="/orders/123" className="hover:underline">
                  View Order
                </Link>
              </td>
            </tr>

            <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                JM. Lugo
              </td>

              <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <IoCardOutline className="text-red-800" />
                <span className='mx-2 text-red-800'>Not Payed</span>
              </td>

              <td className="text-sm text-gray-900 font-light px-6 ">
                <Link href="/orders/123" className="hover:underline">
                  View Order
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}