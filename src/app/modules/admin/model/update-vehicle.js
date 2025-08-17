"use server";
import db from "@/app/shared/prisma/lib/db";

export const updateVehicle = async (id, data) => {
  const existCar = await db.vehicle.findUnique({
    where: {
      id,
    },
  });
  if (!existCar) {
    throw new Error("Транспорт не найден");
  }

  return await db.vehicle.update({
    where: { id },
    data: {
      ...data,
      updatedAt: new Date(),
    },
  });
};
