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

const statusOptions = [
  "Ожидание",
  "Подтвержден",
  "В процессе",
  "Завершен",
  "Отменен",
];

const OrderList = ({ orders }) => {
  const [updatingId, setUpdatingId] = useState(null);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold px-2">Список заказов</h2>
      <div className="hidden md:block overflow-hidden rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                № Заказа
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                ФИО
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Транспорт
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Стоимость
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Статус
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">
                  #{order.id.slice(0, 6)}
                </td>
                <td className="px-2 py-3 whitespace-nowrap text-sm font-medium">
                  {order.user.name}
                </td>
                <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">
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

      {/* Мобильная версия (показывается только на мобилках) */}
      <div className="md:hidden space-y-3">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-3 bg-white">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-xs text-gray-500">№ Заказа</div>
              <div className="text-sm font-medium">#{order.id.slice(0, 6)}</div>

              <div className="text-xs text-gray-500">ФИО</div>
              <div className="text-sm font-medium">{order.user.name}</div>

              <div className="text-xs text-gray-500">Транспорт</div>
              <div className="text-sm text-gray-500">{order.vehicle.name}</div>

              <div className="text-xs text-gray-500">Стоимость</div>
              <div className="text-sm font-medium">
                {order.totalPrice.toFixed(2)} ₽
              </div>

              <div className="text-xs text-gray-500">Статус</div>
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
