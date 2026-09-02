import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RoleSwitcher } from "./RoleSwitcher";
import { authClient } from "../../lib/auth-client";
import { paths } from "../../config/paths";
import { CartModal } from "../../features/marketplace/components/CartModal";
import { WishlistModal } from "../../features/marketplace/components/WishlistModal";
import { useCartStore } from "../../store/useCartStore";
import { useWishlistStore } from "../../store/useWishlistStore";

export const PublicNavbar = () => {
  const { data: session } = authClient.useSession();
  const isAuthenticated = !!session?.user;
  const isCreator = session?.user?.role === "CREATOR";

  const clearCart = useCartStore((state) => state.clearCart);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0a0a0a] text-white shadow-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4 lg:gap-6">
        {/* Mobile Menu Toggle & Brand */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <button className="lg:hidden hover:text-primary transition-colors">
            <Menu className="size-6" />
          </button>

          <Link to="/" className="flex items-center gap-2">
            <div className="size-8 rounded bg-primary flex items-center justify-center text-white font-bold text-lg italic">
              M
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block uppercase italic">
              MERCHHUB
            </span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-auto hidden md:flex">
          <div className="relative w-full flex items-center">
            <input
              type="text"
              className="block w-full h-10 rounded-full border-0 bg-white/10 py-2 pl-6 pr-32 text-sm text-white placeholder-gray-400 focus:bg-white/15 focus:ring-1 focus:ring-primary outline-none transition-colors"
              placeholder="Search for products..."
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button className="h-full px-6 rounded-r-full bg-primary hover:bg-primary/90 text-white font-bold text-xs tracking-wider transition-colors">
                SEARCH
              </button>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
          {/* Mobile Search Icon */}
          <button className="md:hidden hover:text-primary transition-colors">
            <Search className="size-6" />
          </button>

          {isAuthenticated && (
            <div className="hidden sm:block">
              <RoleSwitcher />
            </div>
          )}

          {isAuthenticated ? (
            <div className="relative hidden lg:block" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 hover:text-primary transition-colors text-sm font-medium focus:outline-none"
              >
                <User className="size-5" />
                <span>Account</span>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-4 w-48 rounded-xl bg-[#1a1a1a] border border-neutral-800 shadow-xl p-1.5 z-50">
                  <div className="px-3 py-2 flex flex-col gap-1">
                    <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                      My Account
                    </div>
                    <div className="text-sm font-medium text-white truncate">
                      {session?.user?.name}
                    </div>
                    <div className="text-xs text-neutral-400 truncate">
                      {session?.user?.email}
                    </div>
                  </div>
                  <div className="h-px bg-neutral-800 my-1 mx-1" />
                  <Link
                    to={
                      isCreator ? paths.app.dashboard.path : paths.app.home.path
                    }
                    className="block px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors rounded-md"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      clearCart();
                      clearWishlist();
                      authClient.signOut({});
                    }}
                    className="w-full text-left block px-3 py-2 text-sm text-[#FF3333] hover:text-[#ff4d4d] hover:bg-neutral-800 transition-colors rounded-md"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-3">
              <Button asChild variant="ghost">
                <Link to={paths.auth.login.path}>LOGIN</Link>
              </Button>
              <Button asChild>
                <Link to={paths.auth.signup.path}>REGISTER</Link>
              </Button>
            </div>
          )}

          <WishlistModal />
          <CartModal />
        </div>
      </div>
    </header>
  );
};
