import { TrendingUp, TrendingDown, Minus, ShoppingBag, PackageOpen } from 'lucide-react';

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  bgColor: string;
  changePercent: number;
}

const MetricCard = ({ icon, label, value, changePercent }: MetricCardProps) => {
  const isNeutral = changePercent === 0;
  const isNegative = changePercent < 0;

  let ChangeIcon = TrendingUp;
  if (isNegative) ChangeIcon = TrendingDown;
  if (isNeutral) ChangeIcon = Minus;

  let colorClass = "bg-green-50 text-green-700";
  if (isNegative) colorClass = "bg-red-50 text-red-700";
  if (isNeutral) colorClass = "bg-gray-100 text-gray-700";

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-bold text-gray-700">{label}</p>
        <div className="text-[#FF3333]">
          {icon}
        </div>
      </div>
      <div className="flex items-end gap-3 mb-1">
        <p className="text-3xl font-bold text-gray-900 leading-none">{value}</p>
        <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-xs font-semibold mb-0.5 ${colorClass}`}>
          <ChangeIcon className="mr-1 size-3" />
          {isNeutral ? '0%' : `${Math.abs(changePercent).toFixed(1)}%`}
        </span>
      </div>
      <p className="text-xs text-gray-400">vs. last month</p>
    </div>
  );
};

interface MetricsGridProps {
  metrics: {
    liveProductsCount: number;
    productsChange: number;
    activeOrdersCount: number;
    ordersChange: number;
    totalRevenue: number;
    revenueChange: number;
  } | null;
  isLoading: boolean;
}

export const MetricsGrid = ({ metrics, isLoading }: MetricsGridProps) => {
  if (isLoading || !metrics) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-gray-100 rounded-md animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard
        icon={<TrendingUp className="size-5" />}
        label="Total Revenue"
        value={`$${(metrics.totalRevenue / 100).toFixed(2)}`}
        bgColor=""
        changePercent={metrics.revenueChange}
      />
      <MetricCard
        icon={<ShoppingBag className="size-5" />}
        label="Active Orders"
        value={metrics.activeOrdersCount.toString()}
        bgColor=""
        changePercent={metrics.ordersChange}
      />
      <MetricCard
        icon={<PackageOpen className="size-5" />}
        label="Live Products"
        value={metrics.liveProductsCount.toString()}
        bgColor=""
        changePercent={metrics.productsChange}
      />
    </div>
  );
};
