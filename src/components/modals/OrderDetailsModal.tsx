"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  menuItem: {
    name: string;
    image: string | null;
  };
}

interface Order {
  id: string;
  customerName: string;
  customerAddress: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onStatusUpdate: (orderId: string, newStatus: string) => Promise<void>;
}

export default function OrderDetailsModal({
  isOpen,
  onClose,
  order,
}: OrderDetailsModalProps) {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-8 bg-[#fbfaf8] rounded-xl border-none shadow-xl gap-0 font-brand-manrope *:data-[slot=dialog-close]:ring-0! *:data-[slot=dialog-close]:ring-offset-0! ">
        <DialogHeader className="space-y-1 mb-4">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-brand-green">
                Order Details
              </DialogTitle>
              <p className="text-gray-500 font-medium text-lg mt-1">
                #{order.id}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-2">
          <div>
            <h4 className="text-gray-900 font-medium mb-1 text-base">
              Address
            </h4>
            <p className="text-gray-500 font-normal leading-relaxed">
              {order.customerAddress}
            </p>
          </div>

          <div className="h-px bg-gray-200 w-full" />

          <div>
            <h4 className="text-gray-900 font-medium mb-4 text-base">Items</h4>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-start">
                  <div className="flex gap-2 text-gray-900">
                    <span className="font-medium text-gray-500">
                      {item.quantity}x
                    </span>
                    <span className="font-medium">{item.menuItem.name}</span>
                  </div>
                  <span className="font-medium text-gray-500">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-gray-200 w-full" />

          <div className="flex justify-between items-center">
            <h4 className="text-xl font-bold text-gray-900">Total</h4>
            <span className="text-xl font-bold text-gray-900">
              ${order.totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
