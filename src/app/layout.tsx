import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { Toaster } from "sonner";

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
        <Toaster
          position="top-right"
          expand={false}
          richColors
          closeButton
          toastOptions={{
            style: {
              background: "white",
              color: "#1A3C34",
              border: "1px solid rgba(26, 60, 52, 0.1)",
              borderRadius: "16px",
            },
            className: "font-brand-manrope",
          }}
        />
      </body>
    </html>
  );
}
