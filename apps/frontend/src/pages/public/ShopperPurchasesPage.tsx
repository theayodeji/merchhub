import React, { useEffect, useRef } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Package } from "lucide-react";
import { useMyOrders } from "@/features/orders/hooks/useMyOrders";
import { EmptyState } from "@/components/ui/EmptyState";
import { format } from "date-fns";

const StatusDotBadge = ({ status }: { status: string }) => {
  const getStyles = () => {
    switch (status) {
      case "PENDING":
        return "text-amber-500";
      case "PROCESSING":
        return "text-blue-500";
      case "SHIPPED":
        return "text-orange-500"; // Like "Delivering" in the screenshot
      case "DELIVERED":
        return "text-green-500";
      case "CANCELLED":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div
      className={`flex items-center gap-2 text-sm font-medium ${getStyles()}`}
    >
      <div className="w-2.5 h-2.5 rounded-full bg-current" />
      <span className="capitalize">
        {status.replace("_", " ").toLowerCase()}
      </span>
    </div>
  );
};

export const ShopperPurchasesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const highlightedOrderId = searchParams.get("orderId");
  const highlightRef = useRef<HTMLTableRowElement>(null);
  const { data: orders, isLoading, isError } = useMyOrders();

  useEffect(() => {
    if (highlightedOrderId && highlightRef.current) {
      highlightRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [highlightedOrderId, orders]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <p className="text-gray-500 mb-4">Failed to load purchases.</p>
        <Link to="/" className="text-black font-medium hover:underline">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Expanded max-width to allow the table to breathe properly */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-gray-900">
              My Purchases
            </h1>
            <p className="text-sm font-medium text-gray-500">
              View your past orders and their status
            </p>
          </div>
        </div>

        {!orders || orders.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm">
            <EmptyState
              icon={Package}
              title="No purchases yet"
              description="When you buy something, it will appear here."
            />
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm mb-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="border-b border-gray-200 bg-primary/20 text-xs uppercase text-black">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-semibold">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-4 font-semibold">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-4 font-semibold">
                      Address
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-semibold text-right"
                    >
                      Total
                    </th>
                    <th scope="col" className="px-6 py-4 font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order) => {
                    const isHighlighted = order.id === highlightedOrderId;
                    const firstItem = order.items[0];
                    const extraItems = order.items.length - 1;

                    return (
                      <tr
                        key={order.id}
                        ref={isHighlighted ? highlightRef : null}
                        onClick={() => navigate(`/orders/${order.id}`)}
                        className={`transition-colors hover:bg-neutral-100/50 cursor-pointer ${
                          isHighlighted ? "bg-blue-50/30" : ""
                        }`}
                      >
                        <td className="px-6 py-2">
                          <div className="flex items-center gap-4 group min-w-[200px]">
                            <div className="size-10 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100 group-hover:border-gray-300 transition-colors flex items-center justify-center">
                              {firstItem?.product?.images?.[0] ? (
                                <img
                                  src={firstItem.product.images[0]}
                                  alt={firstItem.product.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <Package className="h-full w-full p-3 text-gray-400" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                                {firstItem?.product?.name || "Unknown Item"}
                              </div>
                              <div className="text-xs text-gray-500">
                                x{firstItem?.quantity || 1}
                                {extraItems > 0 && (
                                  <span className="ml-1">
                                    (+{extraItems} more)
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap">
                          {format(
                            new Date(order.createdAt),
                            "MMM d, yyyy, h:mm a",
                          )}
                        </td>
                        <td className="px-6 py-2 min-w-[150px]">
                          <p
                            className="line-clamp-2"
                            title={order.deliveryAddress}
                          >
                            {order.deliveryAddress ||
                              `Order #${order.id.split("-")[0]}`}
                          </p>
                        </td>
                        <td className="px-6 py-2 font-medium text-gray-900 text-right whitespace-nowrap">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(order.total)}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap">
                          <StatusDotBadge status={order.status} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
