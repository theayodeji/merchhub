import { useProfile } from '../../features/profile/hooks/useProfile';
import { DashboardHero } from '../../features/dashboard/components/DashboardHero';
import { MetricsGrid } from '../../features/dashboard/components/MetricsGrid';

export default function DashboardHome() {
  const { data: profile } = useProfile();

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <DashboardHero displayName={profile?.displayUsername || profile?.name} />
      <MetricsGrid />
    </div>
  );
}
