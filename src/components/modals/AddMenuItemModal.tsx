"use client";

import { useState, useEffect, useRef } from "react";
import BaseModal from "./BaseModal";
import { Upload, X, ChevronDown } from "lucide-react";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
}

interface AddMenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddMenuItemModal({
  isOpen,
  onClose,
  onSuccess,
}: AddMenuItemModalProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/categories`,
      );
      const data = await response.json();
      setCategories(data);
      if (data.length > 0 && !categoryId) {
        setCategoryId(data[0].id);
      }
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError("Image size must be maximum 2mb");
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError("");
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !categoryId) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("categoryId", categoryId);
    formData.append("description", description);
    formData.append("isAvailable", String(isAvailable));
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/menu-item`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Failed to create menu item");
      }

      toast.success(
        <span>
          Menu item <strong>{name}</strong> added successfully
        </span>,
      );

      // Reset form
      setName("");
      setPrice("");
      setDescription("");
      setIsAvailable(true);
      setImage(null);
      setImagePreview(null);

      onSuccess();
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Add New Item">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[15px] font-medium text-brand-green">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter item name"
              className="w-full px-4 py-3 bg-white border border-[#E6E2D8] rounded-[12px] text-brand-green outline-none focus:border-brand-green/30 transition-all font-brand-manrope"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[15px] font-medium text-brand-green">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="$0.00"
              className="w-full px-4 py-3 bg-white border border-[#E6E2D8] rounded-[12px] text-brand-green outline-none focus:border-brand-green/30 transition-all font-brand-manrope"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[15px] font-medium text-brand-green">
            Category
          </label>
          <div className="relative">
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-[#E6E2D8] rounded-[12px] text-brand-green outline-none focus:border-brand-green/30 transition-all font-brand-manrope appearance-none"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-green/40 pointer-events-none"
              size={18}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[15px] font-medium text-brand-green">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the dish..."
            rows={4}
            className="w-full px-4 py-3 bg-white border border-[#E6E2D8] rounded-[12px] text-brand-green outline-none focus:border-brand-green/30 transition-all font-brand-manrope resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[15px] font-medium text-brand-green">
            Image
          </label>
          {!imagePreview ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#E6E2D8] rounded-[16px] p-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-brand-green/5 transition-all group"
            >
              <Upload
                className="text-brand-green/40 group-hover:text-brand-green transition-colors"
                size={32}
              />
              <p className="text-brand-green font-medium">
                Drag or click <span className="underline">here</span> to upload
              </p>
              <p className="text-xs text-brand-green/40">
                Size must be maximum 2mb. Supported formats: PNG & JPEG
              </p>
            </div>
          ) : (
            <div className="relative border border-[#E6E2D8] rounded-[12px] p-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="h-10 w-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="text-[15px] text-brand-green font-medium truncate">
                  {image?.name}
                </p>
              </div>
              <button
                type="button"
                onClick={removeImage}
                className="text-brand-green/40 hover:text-[#D64045] transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsAvailable(!isAvailable)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              isAvailable ? "bg-[#003B31]" : "bg-gray-200"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                isAvailable ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
          <span className="text-[16px] text-brand-green font-medium">
            Available for Order
          </span>
        </div>

        {error && <p className="text-[#D64045] text-sm">{error}</p>}

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#003B31] text-white px-6 py-2 rounded-full text-[17px] font-semibold hover:opacity-90 transition-all shadow-sm disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </BaseModal>
  );
}
