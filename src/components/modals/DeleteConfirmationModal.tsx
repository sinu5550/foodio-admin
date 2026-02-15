"use client";

import BaseModal from "./BaseModal";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isLoading?: boolean;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isLoading,
}: DeleteConfirmationModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-8">
        <p className="text-[18px] text-brand-green/70 leading-relaxed font-brand-manrope">
          {message}
        </p>

        <div className="flex items-center gap-4 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full text-lg font-medium border border-[#E6E2D8] text-brand-green hover:bg-[#F9F8F6] transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-6 py-2 rounded-full text-lg font-medium bg-[#D64045] text-white hover:bg-[#D64045]/90 transition-all shadow-xs disabled:opacity-50"
          >
            {isLoading ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
