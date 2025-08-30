"use server";

import { revalidatePath } from "next/cache";

export const getAllOrders = async () => {
  try {
    const response = await fetch(`/api/admin/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
};

export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const response = await fetch(`/api/admin/orders`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 },
      body: JSON.stringify({ orderId, newStatus }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    revalidatePath("/dashboard/admin");
    return result;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw new Error("Failed to update order status");
  }
};
