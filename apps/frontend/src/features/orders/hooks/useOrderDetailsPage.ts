import { useParams } from "react-router-dom";
import { useState } from "react";
import { useCreatorOrder, useUpdateOrderStatus, type OrderStatus } from "./useOrders";

export const useOrderDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading, isError } = useCreatorOrder(id as string);
  const updateStatusMutation = useUpdateOrderStatus();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateStatus = (newStatus: OrderStatus) => {
    if (!order) return;
    setIsUpdating(true);
    updateStatusMutation.mutate(
      { orderId: order.id, status: newStatus },
      { onSettled: () => setIsUpdating(false) }
    );
  };

  const getNextStatus = (currentStatus: OrderStatus): { label: string; value: OrderStatus; description: string } | null => {
    switch (currentStatus) {
      case "PENDING":
        return { label: "Confirm Order", value: "PROCESSING", description: "Acknowledge the order and begin fulfillment." };
      case "PROCESSING":
        return { label: "Mark as Shipped", value: "SHIPPED", description: "The package has been handed over to the courier." };
      case "SHIPPED":
        return { label: "Mark as Delivered", value: "DELIVERED", description: "The customer has received their items." };
      default:
        return null;
    }
  };

  const nextAction = order ? getNextStatus(order.status) : null;
  const shortOrderId = order?.id.split('-')[0] || '';

  return {
    order,
    isLoading,
    isError,
    isUpdating,
    handleUpdateStatus,
    nextAction,
    shortOrderId,
  };
};
