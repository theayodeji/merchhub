import { Poppins } from "next/font/google";
import "../../../globals.css";
import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Bottombar from "@/components/shared/Bottombar";

const poppins = Poppins({
  weight: ['400', '600', '700'], // Choose the weights you need
  subsets: ['latin'], // Choose the subsets you need
  display: 'swap', // Use swap for better performance
});

export const metadata = {
  title: "MerchHub | Creator Marketplace",
  description: "Get the hottest creator merch",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <main className="bg-gray-100 ">
          <LeftSidebar userRole={'customer'}/>
          <section className="main-container ms-0 sm:ms-[11vw] lg:ms-[245px] min-h-[100vh] flex flex-col">
            <Topbar user={'kai'}/>
            <div className="w-full flex-1">
              {children}
            </div>
          </section>
        </main>
        <Bottombar />
      </body>
    </html>
  );
}
