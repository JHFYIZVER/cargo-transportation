"use server";
import db from "@/app/shared/prisma/lib/db";

export const updateOrderStatus = async (orderId, newStatus) => {
  return await db.order.update({
    where: { id: orderId },
    data: { status: newStatus },
  });
};
