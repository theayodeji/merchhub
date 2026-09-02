import { TrendingUp, ShoppingBag, PackageOpen } from 'lucide-react';

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  bgColor: string;
}

const MetricCard = ({ icon, label, value }: MetricCardProps) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
    <div className="flex items-center justify-between mb-4">
      <p className="text-sm font-bold text-gray-700">{label}</p>
      <div className="text-[#FF3333]">
        {icon}
      </div>
    </div>
    <div className="flex items-end gap-3 mb-1">
      <p className="text-3xl font-bold text-gray-900 leading-none">{value}</p>
      <span className="inline-flex items-center rounded bg-green-50 px-1.5 py-0.5 text-xs font-semibold text-green-700 mb-0.5">
        <TrendingUp className="mr-1 size-3" />
        15.5%
      </span>
    </div>
    <p className="text-xs text-gray-400">vs. last period</p>
  </div>
);

interface MetricsGridProps {
  metrics: {
    liveProductsCount: number;
    activeOrdersCount: number;
    totalRevenue: number;
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
      />
      <MetricCard
        icon={<ShoppingBag className="size-5" />}
        label="Active Orders"
        value={metrics.activeOrdersCount.toString()}
        bgColor=""
      />
      <MetricCard
        icon={<PackageOpen className="size-5" />}
        label="Live Products"
        value={metrics.liveProductsCount.toString()}
        bgColor=""
      />
    </div>
  );
};
