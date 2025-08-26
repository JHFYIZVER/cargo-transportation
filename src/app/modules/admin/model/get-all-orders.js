"use server";

import db from "@/app/shared/prisma/lib/db";
import { unstable_noStore as noStore } from "next/cache";
export const getAllOrders = async () => {
  try {
    noStore();
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
    });

    return orders;
  } catch (error) {
    console.error("Ошибка при получении заказов:", error);
    throw new Error("Не удалось загрузить заказы");
  }
};
