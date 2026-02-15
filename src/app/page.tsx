"use client";

import { useState, useEffect } from "react";
import { Plus, SquarePen, Trash } from "lucide-react";
import AddCategoryModal from "@/components/modals/AddCategoryModal";
import EditCategoryModal from "@/components/modals/EditCategoryModal";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";

interface Category {
  id: string;
  name: string;
}

const menuItemsData = [
  {
    id: 1,
    name: "Pan-Seared Scallops",
    category: "Starters",
    price: 24.0,
    status: "Available",
  },
  {
    id: 2,
    name: "Mediterranean Olive Medley",
    category: "Starters",
    price: 18.0,
    status: "Available",
  },
  {
    id: 3,
    name: "Citrus Swirl Delights",
    category: "Main Courses",
    price: 32.0,
    status: "Available",
  },
  {
    id: 4,
    name: "Creamy Garlic Shrimp Pasta",
    category: "Main Courses",
    price: 45.0,
    status: "Available",
  },
  {
    id: 5,
    name: "Herb-Roasted Chicken Bowl",
    category: "Desserts",
    price: 16.0,
    status: "Available",
  },
];

export default function MenuItemsPage() {
  const [activeTab, setActiveTab] = useState("Menu Items");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null,
  );

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const handleDeleteCategory = async () => {
    if (!categoryToDelete) return;

    setDeleteLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/categories/${categoryToDelete.id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) throw new Error("Failed to delete");

      setIsDeleteModalOpen(false);
      setCategoryToDelete(null);
      fetchCategories();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete category");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="p-10 space-y-8">
        <div className="flex items-center justify-between">
          <div className="bg-[#F3F1ED] p-1 rounded-full flex items-center font-brand-manrope">
            <button
              onClick={() => setActiveTab("Menu Items")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "Menu Items"
                  ? "bg-white text-brand-green shadow-sm"
                  : "text-brand-green/40 hover:text-brand-green"
              }`}
            >
              Menu Items
            </button>
            <button
              onClick={() => setActiveTab("Categories")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "Categories"
                  ? "bg-white text-brand-green shadow-sm"
                  : "text-brand-green/40 hover:text-brand-green"
              }`}
            >
              Categories
            </button>
          </div>

          {/* Add Button */}
          <button
            onClick={() => {
              if (activeTab === "Categories") {
                setIsAddModalOpen(true);
              } else {
                console.log("Add Item modal not implemented yet");
              }
            }}
            className="bg-brand-green text-white px-6 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-brand-green/95 transition-all shadow-xs"
          >
            <Plus size={18} />
            {activeTab === "Menu Items" ? "Add Item" : "Add Category"}
          </button>
        </div>

        {/* Tabl */}
        <div className="bg-white border border-[#E6E2D8] rounded-[16px] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E6E2D8] bg-[#F9F8F6]/50">
                <th className="px-6 py-4 text-[15px] font-semibold text-brand-green tracking-wider">
                  Name
                </th>
                {activeTab === "Menu Items" && (
                  <>
                    <th className="px-6 py-4 text-[15px] font-semibold text-brand-green tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-[15px] font-semibold text-brand-green tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-[15px] font-semibold text-brand-green tracking-wider">
                      Status
                    </th>
                  </>
                )}
                <th className="px-6 py-4 text-[15px] font-semibold text-brand-green tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E2D8]">
              {activeTab === "Menu Items"
                ? menuItemsData.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-[#F9F8F6]/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-[15px] font-medium text-brand-green">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 text-[15px] text-brand-green">
                        {item.category}
                      </td>
                      <td className="px-6 py-4 text-[15px] text-brand-green font-medium">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-[#DCFCE7] text-[#008236] text-xs font-medium">
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 text-brand-green/60 hover:text-brand-green hover:bg-brand-green/5 rounded-lg transition-all">
                            <SquarePen size={18} strokeWidth={2.5} />
                          </button>
                          <button className="p-2 text-[#D64045]  hover:bg-[#FF4D4D]/5 rounded-lg transition-all">
                            <Trash size={18} strokeWidth={2.5} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                : categories.map((cat) => (
                    <tr
                      key={cat.id}
                      className="hover:bg-[#F9F8F6]/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-[15px] font-medium text-brand-green">
                        {cat.name}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditClick(cat)}
                            className="p-2 text-brand-green/60 hover:text-brand-green hover:bg-brand-green/5 rounded-lg transition-all"
                          >
                            <SquarePen size={18} strokeWidth={2.5} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(cat)}
                            className="p-2 text-[#D64045]  hover:bg-[#FF4D4D]/5 rounded-lg transition-all"
                          >
                            <Trash size={18} strokeWidth={2.5} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={fetchCategories}
      />

      <EditCategoryModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedCategory(null);
        }}
        onSuccess={fetchCategories}
        category={selectedCategory}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setCategoryToDelete(null);
        }}
        onConfirm={handleDeleteCategory}
        isLoading={deleteLoading}
        title="Delete Category"
        message={`Are you sure you want to delete "${categoryToDelete?.name}"? This action cannot be undone.`}
      />
    </div>
  );
}
