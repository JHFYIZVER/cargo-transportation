"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/shared/ui/select";
import { updateOrderStatus } from "./model/update-order-status";
import { useRouter } from "next/navigation";

const statusOptions = [
  "Ожидание",
  "Подтвержден",
  "В процессе",
  "Завершен",
  "Отменен",
];

const OrderList = ({ orders }) => {
  const [updatingId, setUpdatingId] = useState(null);
  const router = useRouter();

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      router.refresh();
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold px-2">Список заказов</h2>
      <div className="hidden md:block overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="font-bold text-primary">
              <th className="px-2 py-3 text-left text-xs uppercase">
                № Заказа
              </th>
              <th className="px-2 py-3 text-left text-xs uppercase">ФИО</th>
              <th className="px-2 py-3 text-left text-xs uppercase">
                Транспорт
              </th>
              <th className="px-2 py-3 text-left text-xs uppercase">
                Стоимость
              </th>
              <th className="px-2 py-3 text-left text-xs uppercase">Статус</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y text-black divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-2 py-3 whitespace-nowrap text-sm">
                  #{order.id.slice(0, 6)}
                </td>
                <td className="px-2 py-3 whitespace-nowrap text-sm font-medium">
                  {order.user.name}
                </td>
                <td className="px-2 py-3 whitespace-nowrap text-sm">
                  {order.vehicle.name}
                </td>
                <td className="px-2 py-3 whitespace-nowrap text-sm font-medium">
                  {order.totalPrice.toFixed(2)} ₽
                </td>
                <td className="px-2 py-3 whitespace-nowrap text-sm">
                  <Select
                    value={order.status}
                    onValueChange={(value) =>
                      handleStatusChange(order.id, value)
                    }
                    disabled={updatingId === order.id}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Статус" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-3">
        {orders.map((order) => (
          <div key={order.id} className="p-3 text-black bg-white">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-xs">№ Заказа</div>
              <div className="text-sm font-medium">#{order.id.slice(0, 6)}</div>

              <div className="text-xs">ФИО</div>
              <div className="text-sm font-medium">{order.user.name}</div>

              <div className="text-xs">Транспорт</div>
              <div className="text-sm">{order.vehicle.name}</div>

              <div className="text-xs">Стоимость</div>
              <div className="text-sm font-medium">
                {order.totalPrice.toFixed(2)} ₽
              </div>

              <div className="text-xs">Статус</div>
              <div className="text-sm">
                <Select
                  value={order.status}
                  onValueChange={(value) => handleStatusChange(order.id, value)}
                  disabled={updatingId === order.id}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Статус" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
