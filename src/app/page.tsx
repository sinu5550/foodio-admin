"use client";

import { useState } from "react";
import { Plus, SquarePen, Trash } from "lucide-react";

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

const categoriesData = [
  { id: 1, name: "Starters", itemCount: 12 },
  { id: 2, name: "Main Courses", itemCount: 24 },
  { id: 3, name: "Desserts", itemCount: 8 },
];

export default function MenuItemsPage() {
  const [activeTab, setActiveTab] = useState("Menu Items");

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
          <button className="bg-brand-green text-white px-6 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-brand-green/95 transition-all shadow-xs">
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
                : categoriesData.map((cat) => (
                    <tr
                      key={cat.id}
                      className="hover:bg-[#F9F8F6]/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-[15px] font-medium text-brand-green">
                        {cat.name}
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
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
