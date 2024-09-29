import Link from "next/link";
import React from "react";

const RecentOrders = ({ orders }) => {
  return (
    <div className="flex-1 bg-white p-5 rounded-xl shadow-md pb-7">
      <div className="flex justify-between items-baseline mb-4">
        <h2 className="text-2xl md:text-3xl font-bold">Recent Orders</h2>
        <Link href={"/dashboard/orders"} className="block self-end text-sm underline font-semibold text-red-500">See All...</Link>
      </div>
      <table className="min-w-full bg-white overflow-hidden">
        <thead>
          <tr>
            <th className="px-[2vw] sm:px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-bold text-black uppercase tracking-wider">
              Product
            </th>
            <th className="px-[2vw] sm:px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-bold text-black uppercase tracking-wider">
              Buyer
            </th>
            <th className="px-[2vw] sm:px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-bold text-black uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="px-[2vw] sm:px-6 py-4 border-b border-gray-200 text-sm">
                <Link href={`/dashboard/orders/${index}`}>
                  <div className="block w-full h-full">{order.product}</div>
                </Link>
              </td>
              <td className="px-[2vw] sm:px-6 py-4 border-b border-gray-200 text-sm text-red-500">
                <Link href={`/dashboard/orders/${index}`}>
                  <div className="block w-full h-full">@{order.username}</div>
                </Link>
              </td>
              <td className="px-[2vw] sm:px-6 py-4 border-b border-gray-200 text-sm">
                <Link href={`/dashboard/orders/${index}`}>
                  <div className="block w-full h-full">
                    <span
                      className={`inline-flex items-center px-2 py-1 leading-none rounded-full text-xs font-semibold italic ${
                        order.status === "Shipped"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                    </ div>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrders;
