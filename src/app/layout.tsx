import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export const metadata: Metadata = {
  title: "Foodio Admin - Dashboard",
  description: "Management dashboard for Foodio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-brand-manrope text-brand-green bg-white flex min-h-screen">
        <Sidebar />
        <div className="grow pl-64">
          <Topbar />
          <main className="grow pt-[70px]">
            <div className="h-full">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
