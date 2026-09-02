import { Outlet } from "react-router-dom";
import { PublicNavbar } from "./PublicNavbar";
import { Footer } from "./Footer";

export const PublicLayout = () => {

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
      <PublicNavbar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
