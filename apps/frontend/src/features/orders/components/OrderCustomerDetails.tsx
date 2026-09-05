import { MapPin, Mail, Phone, User, Fingerprint } from "lucide-react";
import { CopyButton } from "@/components/ui/copy-button";
import type { CreatorOrder } from "../hooks/useOrders";

interface OrderCustomerDetailsProps {
  order: CreatorOrder;
  shortOrderId: string;
}

export const OrderCustomerDetails = ({ order, shortOrderId }: OrderCustomerDetailsProps) => {
  return (
    <div className="space-y-8">
      {/* Customer Info */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
          <User className="size-4 text-gray-400" /> Customer
        </h3>
        <div className="space-y-4">
          <div>
            <p className="font-medium text-gray-900">{order.customerName}</p>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Mail className="size-4 text-gray-400" />
            <span className="text-gray-600">{order.customerEmail || "N/A"}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Phone className="size-4 text-gray-400" />
            <CopyButton 
              value={order.customerPhone} 
              displayText={order.customerPhone}
              className="h-auto p-0 text-sm text-gray-600 hover:text-gray-900 hover:bg-transparent justify-start font-normal"
            />
          </div>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Delivery Address */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin className="size-4 text-gray-400" /> Delivery Address
        </h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <CopyButton 
            value={order.deliveryAddress} 
            displayText={order.deliveryAddress}
            className="h-auto p-0 text-sm text-gray-700 hover:bg-transparent justify-start text-left whitespace-normal leading-relaxed font-medium"
          />
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* References */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Fingerprint className="size-4 text-gray-400" /> Reference IDs
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Order</span>
            <CopyButton value={order.id} displayText={shortOrderId} className="text-sm font-mono text-gray-900 bg-gray-50 hover:bg-gray-100 px-2 py-1 rounded h-auto" />
          </div>
          {order.transaction?.id && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Payment</span>
              <CopyButton value={order.transaction.id} displayText={order.transaction.id.split('-')[0]} className="text-sm font-mono text-gray-900 bg-gray-50 hover:bg-gray-100 px-2 py-1 rounded h-auto" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
