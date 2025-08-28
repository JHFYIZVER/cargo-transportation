"use server";

import db from "@/app/shared/prisma/lib/db";

export const getAllOrders = async () => {
  try {
    const orders = await db.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        vehicle: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return orders;
  } catch (error) {
    console.error("Ошибка при получении заказов:", error);
    throw new Error("Не удалось загрузить заказы");
  }
};
