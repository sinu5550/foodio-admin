"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function BaseModal({
  isOpen,
  onClose,
  title,
  children,
}: BaseModalProps) {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => setIsRendered(false), 300);
      document.body.style.overflow = "unset";
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isRendered) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className={`relative w-full max-w-lg bg-white rounded-[24px] shadow-2xl p-8 transform transition-all duration-300 ${
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[24px] font-bold text-brand-green leading-none">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-black/5 rounded-full transition-colors text-black/40 hover:text-black"
          >
            <X size={24} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
