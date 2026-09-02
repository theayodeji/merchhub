import { Outlet } from "react-router-dom";
import { PublicNavbar } from "./PublicNavbar";

export const PublicLayout = () => {

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
      <PublicNavbar />

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
