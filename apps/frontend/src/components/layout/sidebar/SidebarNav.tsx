import { Link, useLocation } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

interface SidebarNavProps {
  items: NavItem[];
  isCollapsed: boolean;
  label?: string;
  showBadges?: boolean;
}

export const SidebarNav = ({ items, isCollapsed, label, showBadges = false }: SidebarNavProps) => {
  const location = useLocation();

  return (
    <div className="mb-2">
      {!isCollapsed && label && (
        <p className="text-xs font-semibold text-gray-500 mb-2 px-2">{label}</p>
      )}
      <nav className="flex flex-col gap-1">
        {items.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              title={isCollapsed ? item.name : undefined}
              className={`flex items-center ${isCollapsed ? 'justify-center px-0 py-3' : 'justify-between px-3 py-2.5'} rounded-xl font-medium transition-all duration-200 ${
                isActive 
                  ? 'bg-gray-100/80 text-gray-900' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="size-5 shrink-0" />
                {!isCollapsed && <span className="text-sm">{item.name}</span>}
              </div>
              {showBadges && !isCollapsed && item.badge && (
                <span className="px-2 py-0.5 rounded-full bg-[#FF3333] text-white text-[10px] font-bold">
                  {item.badge}
                </span>
              )}
              {showBadges && isCollapsed && item.badge && (
                <div className="absolute right-2 top-2 size-2 rounded-full bg-[#FF3333]"></div>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
