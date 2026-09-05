import { useProfile } from "../../features/profile/hooks/useProfile";
import { DashboardHero } from "../../features/dashboard/components/DashboardHero";
import { MetricsGrid } from "../../features/dashboard/components/MetricsGrid";
import { DashboardCharts } from "../../features/dashboard/components/DashboardCharts";
import { DashboardEmptyStateModal } from "../../features/dashboard/components/DashboardEmptyStateModal";
import { useDashboardMetrics } from "../../features/dashboard/hooks/useDashboardMetrics";

export default function DashboardHome() {
  const { data: profile } = useProfile();
  const { metrics, products, isLoading } = useDashboardMetrics();

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <DashboardHero creatorName={profile?.name.split(" ")[0] || "Creator"} />

      <div className="space-y-2">
        <MetricsGrid metrics={metrics} isLoading={isLoading} />
        <DashboardCharts metrics={metrics} isLoading={isLoading} />
      </div>

      <DashboardEmptyStateModal
        productsCount={products?.data?.length || 0}
        isLoading={isLoading}
      />
    </div>
  );
}
