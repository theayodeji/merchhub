import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "../globals.css";
import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Bottombar from "@/components/shared/Bottombar";

const dmsans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Linkup | Keep in touch, Stay on fleek",
  description: "Connect with loved ones all over the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dmsans.className}>
        <main>
          <LeftSidebar userRole={'creator'}/>
          <section className="main-container">
            <Topbar />
            <div className="w-full max-w-4xl min-h-[100vh]">
              {children}
            </div>
          </section>
        </main>
        <Bottombar />
      </body>
    </html>
  );
}
