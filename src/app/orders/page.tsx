"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import OrderDetailsModal from "@/components/modals/OrderDetailsModal";

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

const statusOptions = ["PENDING", "PREPARING", "READY", "COMPLETED"];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/orders");
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      //It updates the UI to not lag
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
      );
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder((prev) =>
          prev ? { ...prev, status: newStatus } : null,
        );
      }

      const res = await fetch(
        `http://localhost:5000/api/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      if (!res.ok) {
        
        console.error("Failed to update status on server");
        fetchOrders(); 
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const openOrderModal = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const formatStatus = (status: string) => {
    if (!status) return "Pending";
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  return (
    <div className="p-10 space-y-8  mx-auto font-brand-manrope">
      <div className="bg-white border border-[#E6E2D8] rounded-[16px] overflow-hidden">
        <Table>
          <TableHeader className="bg-[#F9F8F6]/50 border-b border-[#E6E2D8]">
            <TableRow className="border-b border-[#E6E2D8] hover:bg-transparent">
              <TableHead className=" py-4 text-[16px] font-semibold text-brand-green tracking-wider pl-6 w-[200px]">
                Order ID
              </TableHead>
              <TableHead className="py-4 text-[16px] font-semibold text-brand-green tracking-wider w-[200px]">
                Date
              </TableHead>
              <TableHead className=" py-4 text-[16px] font-semibold text-brand-green tracking-wider">
                Customer
              </TableHead>
              <TableHead className=" py-4 text-[16px] font-semibold text-brand-green tracking-wider">
                Total
              </TableHead>
              <TableHead className=" py-4 text-[16px] font-semibold text-brand-green tracking-wider w-[200px]">
                Status
              </TableHead>
              <TableHead className=" py-4 text-[16px] font-semibold text-brand-green tracking-wider text-right pr-8">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="py-20">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <Spinner size={32} />
                    <p className="text-brand-green/40 text-sm font-medium animate-pulse">
                      Loading orders...
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : orders.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  No orders found.
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow
                  key={order.id}
                  className="hover:bg-[#F9F8F6]/30 border-b border-[#E6E2D8] transition-colors"
                >
                  <TableCell className="font-medium text-gray-900 pl-6">
                    {order.id.slice(0, 8)}...
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {formatDate(order.createdAt)}
                  </TableCell>
                  <TableCell className="text-gray-900 font-medium">
                    {order.customerName}
                  </TableCell>
                  <TableCell className="text-gray-900 font-medium">
                    ${order.totalAmount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(val) => handleStatusUpdate(order.id, val)}
                    >
                      <SelectTrigger className="w-[140px] h-[36px] bg-white border-gray-200 rounded-md focus:ring-1 focus:ring-gray-200">
                        <SelectValue>{formatStatus(order.status)}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {formatStatus(opt)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Button
                      onClick={() => openOrderModal(order)}
                      variant="secondary"
                      className="h-[36px] px-4 bg-[#F3F4F6] hover:bg-[#E5E7EB] text-gray-900 font-medium rounded-md shadow-none"
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <OrderDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
}
