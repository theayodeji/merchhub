import { MapPin, Mail, Phone, Store } from "lucide-react";
import { CopyButton } from "@/components/ui/copy-button";
import type { CreatorOrder } from "../hooks/useOrders";

interface OrderSellerDetailsProps {
  order: CreatorOrder;
  shortOrderId: string;
}

export const OrderSellerDetails = ({ order, shortOrderId }: OrderSellerDetailsProps) => {
  const seller = order.items[0]?.product?.seller;

  return (
    <div className="space-y-10">
      {/* References First */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div>
          <p className="text-xs font-medium text-gray-500 mb-1">Order Ref</p>
          <div className="flex items-center">
            <CopyButton value={order.id} displayText={shortOrderId} className="text-base font-bold font-mono text-gray-900 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-md h-auto gap-2" />
          </div>
        </div>
        {order.transaction?.id && (
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Transaction ID</p>
            <div className="flex items-center">
              <CopyButton value={order.transaction.id} displayText={order.transaction.id.split("-")[0]} className="text-base font-bold font-mono text-gray-900 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-md h-auto gap-2" />
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Seller Details */}
        <div>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Seller Details</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Store className="size-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Store Name</p>
                <p className="font-medium text-gray-900">{seller?.displayUsername || seller?.username || "Unknown Seller"}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                <Mail className="size-5 text-gray-500" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Support Email</p>
                <p className="text-sm font-medium text-gray-900">{seller?.email || "N/A"}</p>
              </div>
            </div>
            
            {seller?.phone && (
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                  <Phone className="size-5 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Support Phone</p>
                  <CopyButton 
                    value={seller.phone} 
                    displayText={seller.phone}
                    className="h-auto p-0 text-sm font-medium text-gray-900 hover:bg-transparent justify-start"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Shipping To */}
        <div>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Shipping To</h3>
          <div className="flex items-start gap-3">
            <div className="size-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 mt-1">
              <MapPin className="size-5 text-gray-500" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">{order.customerName}</p>
              <CopyButton 
                value={order.deliveryAddress} 
                displayText={order.deliveryAddress}
                className="h-auto p-0 text-sm font-medium text-gray-900 hover:bg-transparent justify-start text-left whitespace-normal leading-snug"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

