import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { 
  Store, ShoppingBag, LayoutDashboard, Settings, PackageOpen, HelpCircle, ChevronLeft, ChevronRight, User
} from 'lucide-react';
import { paths } from '../../config/paths';
import { useProfile } from '../../features/profile/hooks/useProfile';
import { useLogout } from '../../features/auth/hooks/useLogout';
import { authClient } from '../../lib/auth-client';
import { SidebarSearch } from './sidebar/SidebarSearch';
import { SidebarNav, type NavItem } from './sidebar/SidebarNav';
import { SidebarUserFooter } from './sidebar/SidebarUserFooter';
import { SidebarThemeToggle } from './sidebar/SidebarThemeToggle';
import { RoleSwitcher } from './RoleSwitcher';

const creatorNavItems: NavItem[] = [
  { name: 'Overview', href: paths.app.dashboard.path, icon: LayoutDashboard },
  { name: 'Products', href: '/dashboard/products', icon: PackageOpen, badge: 2 },
  { name: 'Orders', href: '/dashboard/orders', icon: ShoppingBag, badge: 14 },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  { name: 'Support', href: '#', icon: HelpCircle },
];

const customerNavItems: NavItem[] = [
  { name: 'Overview', href: paths.app.dashboard.path, icon: LayoutDashboard },
  { name: 'Order History', href: '/dashboard/orders', icon: ShoppingBag },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export const CreatorDashboardLayout = () => {
  const { data: profile } = useProfile();
  const { data: session } = authClient.useSession();
  const { handleLogout } = useLogout();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const role = session?.user?.role || 'CUSTOMER';
  const navItems = role === 'CREATOR' ? creatorNavItems : customerNavItems;

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Sidebar */}
      <div 
        className={`${isCollapsed ? 'w-20' : 'w-64'} h-screen sticky top-0 bg-white flex flex-col justify-between border-r border-gray-200/60 shadow-sm z-10 transition-all duration-300`}
      >
        {/* Toggle Button */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-4 top-8 bg-white border border-gray-200 shadow-sm rounded-full p-1 text-gray-500 hover:text-gray-900 z-20"
        >
          {isCollapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
        </button>

        <div className="p-4 flex-1 flex flex-col">
          {/* Logo & Mode switch */}
          <div className={`mb-8 flex flex-col ${isCollapsed ? 'items-center' : 'items-start'} gap-4 mt-2`}>
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-2'} w-full`}>
              <div className={`size-8 rounded-md flex items-center justify-center text-white shrink-0 ${role === 'CREATOR' ? 'bg-[#FF3333]' : 'bg-neutral-800'}`}>
                {role === 'CREATOR' ? <Store className="size-4" /> : <User className="size-4" />}
              </div>
              {!isCollapsed && (
                <div className="flex flex-col overflow-hidden">
                  <h1 className="text-xl font-bold tracking-tight text-gray-900 truncate">
                    {role === 'CREATOR' ? (profile?.displayUsername || profile?.name || 'My Studio') : 'My Account'}
                  </h1>
                  <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{role} MODE</span>
                </div>
              )}
            </div>
            
            {!isCollapsed && (
              <div className="px-2 w-full">
                <RoleSwitcher />
              </div>
            )}
          </div>
          
          <SidebarSearch isCollapsed={isCollapsed} />
          <SidebarNav items={navItems} isCollapsed={isCollapsed} label="Menu" showBadges={role === 'CREATOR'} />
          <SidebarThemeToggle isCollapsed={isCollapsed} />
        </div>

        <SidebarUserFooter 
          profile={profile} 
          isCollapsed={isCollapsed} 
          onLogout={handleLogout} 
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-10 md:p-14 relative bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};
