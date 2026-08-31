import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

type DashboardHeaderProps = {
  userName?: string;
  onSignOut: () => void;
};

export const DashboardHeader = ({ userName, onSignOut }: DashboardHeaderProps) => {
  return (
    <div className="bg-primary text-primary-foreground p-8 border-4 border-secondary shadow-[8px_8px_0px_0px_var(--color-secondary)] mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-2 leading-none">Dashboard.</h1>
        <p className="text-lg md:text-xl font-bold tracking-widest uppercase">Welcome back, {userName || 'Creator'}</p>
      </div>
      <Button variant="secondary" onClick={onSignOut} className="w-full md:w-auto self-start md:self-auto">
        Sign Out <LogOut className="ml-2 size-5" />
      </Button>
    </div>
  );
};
