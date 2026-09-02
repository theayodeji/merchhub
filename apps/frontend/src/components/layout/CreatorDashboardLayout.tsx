import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { 
  Store, ShoppingBag, LayoutDashboard, Settings, PackageOpen, HelpCircle, ChevronLeft, ChevronRight, User, Menu
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
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '../ui/sheet';

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

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      <div className="p-4 flex-1 flex flex-col">
        {/* Logo & Mode switch */}
        <div className={`mb-8 flex flex-col ${isCollapsed && !isMobile ? 'items-center' : 'items-start'} gap-4 mt-2`}>
          <div className={`flex items-center ${isCollapsed && !isMobile ? 'justify-center' : 'gap-3 px-2'} w-full`}>
            <div className={`size-8 rounded-md flex items-center justify-center text-white shrink-0 ${role === 'CREATOR' ? 'bg-[#FF3333]' : 'bg-neutral-800'}`}>
              {role === 'CREATOR' ? <Store className="size-4" /> : <User className="size-4" />}
            </div>
            {(!isCollapsed || isMobile) && (
              <div className="flex flex-col overflow-hidden">
                <h1 className="text-xl font-bold tracking-tight text-gray-900 truncate">
                  {role === 'CREATOR' ? (profile?.displayUsername || profile?.name || 'My Studio') : 'My Account'}
                </h1>
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{role} MODE</span>
              </div>
            )}
          </div>
          
          {(!isCollapsed || isMobile) && (
            <div className="px-2 w-full">
              <RoleSwitcher />
            </div>
          )}
        </div>
        
        <SidebarSearch isCollapsed={isCollapsed && !isMobile} />
        <SidebarNav items={navItems} isCollapsed={isCollapsed && !isMobile} label="Menu" showBadges={role === 'CREATOR'} />
        <SidebarThemeToggle isCollapsed={isCollapsed && !isMobile} />
      </div>

      <SidebarUserFooter 
        profile={profile} 
        isCollapsed={isCollapsed && !isMobile} 
        onLogout={handleLogout} 
      />
    </>
  );

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Mobile Top Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200/60 z-30 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className={`size-8 rounded-md flex items-center justify-center text-white ${role === 'CREATOR' ? 'bg-[#FF3333]' : 'bg-neutral-800'}`}>
            {role === 'CREATOR' ? <Store className="size-4" /> : <User className="size-4" />}
          </div>
          <span className="font-bold tracking-tight text-gray-900">
            {role === 'CREATOR' ? 'Dashboard' : 'Account'}
          </span>
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <button className="p-2 text-gray-500 hover:text-gray-900 rounded-md">
              <Menu className="size-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0 flex flex-col bg-white border-r">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SidebarContent isMobile={true} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div 
        className={`hidden md:flex ${isCollapsed ? 'w-20' : 'w-64'} h-screen sticky top-0 bg-white flex-col justify-between border-r border-gray-200/60 shadow-sm z-10 transition-all duration-300`}
      >
        {/* Toggle Button */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-4 top-8 bg-white border border-gray-200 shadow-sm rounded-full p-1 text-gray-500 hover:text-gray-900 z-20"
        >
          {isCollapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
        </button>

        <SidebarContent />
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full overflow-auto p-4 pt-20 md:pt-14 md:p-14 relative bg-gray-50 max-w-[100vw] md:max-w-none">
        <Outlet />
      </div>
    </div>
  );
};
