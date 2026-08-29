import { TrendingUp, ShoppingBag, PackageOpen } from 'lucide-react';

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  bgColor: string;
}

const MetricCard = ({ icon, label, value, bgColor }: MetricCardProps) => (
  <div className="bg-white rounded-md p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
    <div className={`size-12 rounded-md ${bgColor} flex items-center justify-center mb-6`}>
      {icon}
    </div>
    <p className="text-sm font-semibold text-gray-500 mb-1">{label}</p>
    <p className="text-4xl font-bold text-gray-900">{value}</p>
  </div>
);

export const MetricsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard
        icon={<TrendingUp className="size-6" />}
        label="Total Revenue"
        value="$0.00"
        bgColor="bg-green-50 text-green-600"
      />
      <MetricCard
        icon={<ShoppingBag className="size-6" />}
        label="Active Orders"
        value="0"
        bgColor="bg-blue-50 text-blue-600"
      />
      <MetricCard
        icon={<PackageOpen className="size-6" />}
        label="Live Products"
        value="0"
        bgColor="bg-purple-50 text-purple-600"
      />
    </div>
  );
};
