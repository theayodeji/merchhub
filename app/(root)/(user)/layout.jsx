import { Poppins } from "next/font/google";
import "../../globals.css";
import Topbar from "@/components/shared/Topbar";
import Footer from "@/components/shared/Footer";
import ScrollToTopButton from "@/components/shared/ScrollToTopButton";

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
          {/* <LeftSidebar userRole={'customer'}/> */}
          <Topbar />
          <section className="main-container max-w-screen-xl mx-auto min-h-[100vh] flex flex-col">
            <div className="w-full px-2 sm:px-5 py-3">
              {children}
            </div>
          </section>
        </main>
        <Footer />
        <ScrollToTopButton /> 
      </body>
    </html>
  );
}
