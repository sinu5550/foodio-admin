"use client";

import { useState, useEffect } from "react";
import BaseModal from "./BaseModal";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
}

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  category: Category | null;
}

export default function EditCategoryModal({
  isOpen,
  onClose,
  onSuccess,
  category,
}: EditCategoryModalProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !category) return;

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/categories/${category.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update category");
      }

      toast.success(
        <span>
          Category updated to <strong>{name}</strong>
        </span>,
      );
      onSuccess();
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Failed to update category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Edit Category">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="edit-name"
            className="block text-[18px] font-medium text-brand-green"
          >
            Name
          </label>
          <input
            id="edit-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-[#E6E2D8] rounded-[12px] text-brand-green outline-none focus:border-brand-green/30 transition-all"
            placeholder="Enter category name"
            disabled={loading}
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading || !name.trim()}
            className="bg-brand-green text-white px-6 py-2 rounded-full text-lg font-medium hover:bg-brand-green/95 transition-all shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </BaseModal>
  );
}
