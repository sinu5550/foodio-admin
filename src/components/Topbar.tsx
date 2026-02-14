"use client";

import { usePathname } from "next/navigation";

export default function Topbar() {
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname === "/orders") return "Order Management";
    return "Menu Items";
  };

  return (
    <header className="fixed top-0 right-0 left-64 h-[73px] bg-white border-b border-[#E6E2D8] flex items-center px-10 z-40">
      <h1 className="text-3xl font-medium tracking-tight font-brand-cormorant text-brand-green">
        {getTitle()}
      </h1>
    </header>
  );
}
