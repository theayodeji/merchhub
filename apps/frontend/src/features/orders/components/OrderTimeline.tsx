import React from 'react';
import { Check, Package, Truck, Home, XCircle } from 'lucide-react';
import type { OrderStatus } from '../hooks/useOrders';

interface OrderTimelineProps {
  status: OrderStatus;
}

const STAGES = [
  { id: 'PENDING', label: 'Pending', icon: Package },
  { id: 'PROCESSING', label: 'Processing', icon: Check },
  { id: 'SHIPPED', label: 'Shipped', icon: Truck },
  { id: 'DELIVERED', label: 'Delivered', icon: Home },
];

export const OrderTimeline: React.FC<OrderTimelineProps> = ({ status }) => {
  if (status === 'CANCELLED') {
    return (
      <div className="flex flex-col items-center justify-center py-8 bg-red-50/50 rounded-2xl border border-red-100">
        <XCircle className="w-12 h-12 text-red-500 mb-3" />
        <h3 className="text-lg font-medium text-red-900">Order Cancelled</h3>
        <p className="text-sm text-red-600 mt-1">This order has been cancelled and will not be fulfilled.</p>
      </div>
    );
  }

  const currentStageIndex = STAGES.findIndex(s => s.id === status);
  // If status is not in STAGES and not cancelled, fallback to 0
  const activeIndex = currentStageIndex >= 0 ? currentStageIndex : 0;

  return (
    <div className="py-6 px-4 sm:px-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
      <div className="relative">
        {/* Progress Bar Background */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 rounded-full" />
        
        {/* Active Progress Bar */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-black rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${(activeIndex / (STAGES.length - 1)) * 100}%` }}
        />

        {/* Stages */}
        <div className="relative flex justify-between">
          {STAGES.map((stage, index) => {
            const isCompleted = index <= activeIndex;
            const isCurrent = index === activeIndex;
            const Icon = stage.icon;

            return (
              <div key={stage.id} className="flex flex-col items-center group">
                <div 
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 relative z-10
                    ${isCompleted ? 'bg-black border-black text-white' : 'bg-white border-gray-200 text-gray-400'}
                    ${isCurrent ? 'ring-4 ring-gray-100' : ''}
                  `}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="mt-3 text-center">
                  <span className={`text-xs sm:text-sm font-medium ${isCompleted ? 'text-black' : 'text-gray-400'}`}>
                    {stage.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
