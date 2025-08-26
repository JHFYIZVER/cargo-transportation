"use server";

import db from "@/app/shared/prisma/lib/db";

export const getAllOrders = async () => {
  try {
    const orders = await db.order.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
        vehicle: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      next: { revalidate: 0 },
    });

    return orders;
  } catch (error) {
    console.error("Ошибка при получении заказов:", error);
    throw new Error("Не удалось загрузить заказы");
  }
};
