"use client";

import { useState } from "react";
import BaseModal from "./BaseModal";
import { toast } from "sonner";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddCategoryModal({
  isOpen,
  onClose,
  onSuccess,
}: AddCategoryModalProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/categories`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to create category");
      }

      toast.success(
        <span>
          Category <strong>{name}</strong> added successfully
        </span>,
      );
      setName("");
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Add Category">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-[18px] font-medium text-brand-green"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-[#E6E2D8] rounded-[12px] text-brand-green outline-none focus:border-brand-green/30 transition-all"
            placeholder="Enter category name"
            disabled={loading}
          />
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading || !name.trim()}
            className="bg-brand-green text-white px-6 py-2 rounded-full text-lg font-medium hover:bg-brand-green/95 transition-all shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </BaseModal>
  );
}
