"use client";

import { useState, useEffect } from "react";
import { Plus, SquarePen, Trash } from "lucide-react";
import AddCategoryModal from "@/components/modals/AddCategoryModal";
import EditCategoryModal from "@/components/modals/EditCategoryModal";
import AddMenuItemModal from "@/components/modals/AddMenuItemModal";
import EditMenuItemModal from "@/components/modals/EditMenuItemModal";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
}

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  categoryId: string;
  isAvailable: boolean;
  category?: Category;
}

export default function MenuItemsPage() {
  const [activeTab, setActiveTab] = useState("Menu Items");
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddMenuItemModalOpen, setIsAddMenuItemModalOpen] = useState(false);
  const [isEditMenuItemModalOpen, setIsEditMenuItemModalOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteType, setDeleteType] = useState<"category" | "item">("category");

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(
    null,
  );

  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null,
  );
  const [itemToDelete, setItemToDelete] = useState<MenuItem | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchCategories(false), fetchMenuItems(false)]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async (updateLoading = true) => {
    if (updateLoading) setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/categories`,
      );
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    } finally {
      if (updateLoading) setLoading(false);
    }
  };

  const fetchMenuItems = async (updateLoading = true) => {
    if (updateLoading) setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/menu-item`,
      );
      const data = await response.json();
      setMenuItems(data);
    } catch (err) {
      console.error("Failed to fetch menu items", err);
    } finally {
      if (updateLoading) setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (deleteType === "category") {
      if (!categoryToDelete) return;
      setDeleteLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/categories/${categoryToDelete.id}`,
          {
            method: "DELETE",
          },
        );
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || "Failed to delete category");
        }
        setIsDeleteModalOpen(false);
        const deletedName = categoryToDelete.name;
        setCategoryToDelete(null);
        await fetchCategories();
        toast.success(
          <span>
            Category <strong>{deletedName}</strong> deleted successfully
          </span>,
        );
      } catch (err: any) {
        console.error("Delete failed", err);
        toast.error(err.message || "Failed to delete category");
      } finally {
        setDeleteLoading(false);
      }
    } else {
      if (!itemToDelete) return;
      setDeleteLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/menu-item/${itemToDelete.id}`,
          {
            method: "DELETE",
          },
        );
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || "Failed to delete item");
        }
        setIsDeleteModalOpen(false);
        const deletedName = itemToDelete.name;
        setItemToDelete(null);
        await fetchMenuItems();
        toast.success(
          <span>
            Menu item <strong>{deletedName}</strong> deleted successfully
          </span>,
        );
      } catch (err: any) {
        console.error("Delete failed", err);
        toast.error(err.message || "Failed to delete item");
      } finally {
        setDeleteLoading(false);
      }
    }
  };

  const openDeleteModal = (
    target: Category | MenuItem,
    type: "category" | "item",
  ) => {
    setDeleteType(type);
    if (type === "category") {
      setCategoryToDelete(target as Category);
    } else {
      setItemToDelete(target as MenuItem);
    }
    setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    fetchData();
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

          <button
            onClick={() => {
              if (activeTab === "Menu Items") {
                setIsAddMenuItemModalOpen(true);
              } else {
                setIsAddModalOpen(true);
              }
            }}
            className="bg-brand-green text-white px-6 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-brand-green/95 transition-all shadow-xs"
          >
            <Plus size={18} />
            {activeTab === "Menu Items" ? "Add Item" : "Add Category"}
          </button>
        </div>

        <div className="bg-white border border-[#E6E2D8] rounded-[16px] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E6E2D8] bg-[#F9F8F6]/50">
                <th className="px-6 py-4 text-[16px] font-semibold text-brand-green tracking-wider">
                  Name
                </th>
                {activeTab === "Menu Items" && (
                  <>
                    <th className="px-6 py-4 text-[16px] font-semibold text-brand-green tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-[16px] font-semibold text-brand-green tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-[16px] font-semibold text-brand-green tracking-wider">
                      Status
                    </th>
                  </>
                )}
                <th className="px-6 py-4 text-[16px] font-semibold text-brand-green tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E2D8]">
              {loading ? (
                <tr>
                  <td
                    colSpan={activeTab === "Menu Items" ? 5 : 2}
                    className="py-20"
                  >
                    <div className="flex flex-col items-center justify-center gap-3">
                      <Spinner size={32} />
                      <p className="text-brand-green/40 text-sm font-medium animate-pulse">
                        Loading {activeTab}...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : activeTab === "Menu Items" ? (
                menuItems.length > 0 ? (
                  menuItems.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-[#F9F8F6]/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-10 h-10 rounded-lg object-cover bg-gray-100 shrink-0"
                            />
                          )}
                          <span className="text-[16px] font-medium text-brand-green">
                            {item.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[16px] text-brand-green">
                        {item.category?.name || "Uncategorized"}
                      </td>
                      <td className="px-6 py-4 text-[16px] text-brand-green font-medium">
                        ${Number(item.price).toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            item.isAvailable
                              ? "bg-[#DCFCE7] text-[#008236]"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {item.isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedMenuItem(item);
                              setIsEditMenuItemModalOpen(true);
                            }}
                            className="p-2 text-brand-green/60 hover:text-brand-green hover:bg-brand-green/5 rounded-lg transition-all"
                          >
                            <SquarePen size={18} strokeWidth={2.5} />
                          </button>
                          <button
                            onClick={() => openDeleteModal(item, "item")}
                            className="p-2 text-[#D64045] hover:bg-[#FF4D4D]/5 rounded-lg transition-all"
                          >
                            <Trash size={18} strokeWidth={2.5} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-20 text-center text-brand-green/40 font-medium"
                    >
                      No menu items found. Click "Add Item" to get started.
                    </td>
                  </tr>
                )
              ) : categories.length > 0 ? (
                categories.map((cat) => (
                  <tr
                    key={cat.id}
                    className="hover:bg-[#F9F8F6]/30 transition-colors"
                  >
                    <td className="px-6 py-4 text-[16px] font-medium text-brand-green">
                      {cat.name}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedCategory(cat);
                            setIsEditModalOpen(true);
                          }}
                          className="p-2 text-brand-green/60 hover:text-brand-green hover:bg-brand-green/5 rounded-lg transition-all"
                        >
                          <SquarePen size={18} strokeWidth={2.5} />
                        </button>
                        <button
                          onClick={() => openDeleteModal(cat, "category")}
                          className="p-2 text-[#D64045] hover:bg-[#FF4D4D]/5 rounded-lg transition-all"
                        >
                          <Trash size={18} strokeWidth={2.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={2}
                    className="py-20 text-center text-brand-green/40 font-medium"
                  >
                    No categories found. Click "Add Category" to get started.
                  </td>
                </tr>
              )}
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

      <AddMenuItemModal
        isOpen={isAddMenuItemModalOpen}
        onClose={() => setIsAddMenuItemModalOpen(false)}
        onSuccess={fetchMenuItems}
      />
      <EditMenuItemModal
        isOpen={isEditMenuItemModalOpen}
        onClose={() => {
          setIsEditMenuItemModalOpen(false);
          setSelectedMenuItem(null);
        }}
        onSuccess={fetchMenuItems}
        menuItem={selectedMenuItem}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setCategoryToDelete(null);
          setItemToDelete(null);
        }}
        onConfirm={handleDelete}
        isLoading={deleteLoading}
        title={
          deleteType === "category" ? "Delete Category" : "Delete Menu Item"
        }
        message={
          deleteType === "category"
            ? `Are you sure you want to delete "${categoryToDelete?.name}"? This action cannot be undone.`
            : `Are you sure you want to delete "${itemToDelete?.name}"? This action cannot be undone.`
        }
      />
    </div>
  );
}
