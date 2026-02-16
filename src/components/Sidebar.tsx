"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, LogOut } from "lucide-react";

const navLinks = [
  { name: "Menu Items", href: "/", icon: Menu },
  { name: "Orders", href: "/orders", icon: ShoppingBag },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-[#F9F8F6] border-r border-[#E6E2D8] flex flex-col p-6 pt-5 fixed left-0 top-0">
      <Link href="/" className="flex items-center gap-2 mb-10 pl-2 ">
        <Image
          src="/assets/fastfood.svg"
          alt="Foodio Logo"
          width={28}
          height={28}
        />
        <span className="text-3xl font-medium tracking-[-0.05em] font-brand-cormorant text-brand-green">
          Foodio.
        </span>
      </Link>

      <nav className="grow space-y-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-[12px] text-sm font-medium transition-all ${
                isActive
                  ? "bg-brand-green text-white shadow-[0_8px_16px_-4px_rgba(26,60,52,0.15)]"
                  : "text-brand-green/60 hover:text-brand-green hover:bg-brand-green/5"
              }`}
            >
              <Icon size={18} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="pt-2 border-t border-[#E6E2D8]">
        <button
          onClick={() => {
            window.location.href = "http://localhost:3000";
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-[12px] text-sm font-medium text-[#FF4D4D] hover:bg-[#FF4D4D]/5 transition-all"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
