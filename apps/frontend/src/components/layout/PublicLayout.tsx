import { Outlet, Link } from 'react-router-dom';
import { Search, ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RoleSwitcher } from './RoleSwitcher';
import { authClient } from '../../lib/auth-client';
import { paths } from '../../config/paths';

export const PublicLayout = () => {
  const { data: session } = authClient.useSession();
  const isAuthenticated = !!session?.user;
  const isCreator = session?.user?.role === 'CREATOR';

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="size-8 rounded bg-[#FF3333] flex items-center justify-center text-white font-bold text-lg">
              M
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">MerchHub</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4 hidden md:flex">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <Search className="size-4" />
              </div>
              <input 
                type="text" 
                className="block w-full rounded-full border-gray-300 bg-gray-100 py-2 pl-10 pr-4 text-sm focus:border-[#FF3333] focus:bg-white focus:ring-1 focus:ring-[#FF3333] outline-none transition-colors"
                placeholder="Search for products, creators, or categories..." 
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            {isAuthenticated && <RoleSwitcher />}
            
            <Button variant="ghost" size="icon" className="relative text-gray-700 hover:text-[#FF3333]">
              <ShoppingCart className="size-5" />
              <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-[#FF3333] text-[10px] font-bold text-white">
                0
              </span>
            </Button>

            {isAuthenticated ? (
              <Button asChild variant="ghost" className="gap-2 text-gray-700">
                <Link to={isCreator ? paths.app.dashboard.path : paths.app.home.path}>
                  <User className="size-4" />
                  <span className="hidden sm:inline">Account</span>
                </Link>
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button asChild variant="ghost" className="hidden sm:flex">
                  <Link to={paths.auth.login.path}>Sign In</Link>
                </Button>
                <Button asChild className="bg-[#FF3333] hover:bg-[#E62E2E] text-white">
                  <Link to={paths.auth.signup.path}>Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} MerchHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
