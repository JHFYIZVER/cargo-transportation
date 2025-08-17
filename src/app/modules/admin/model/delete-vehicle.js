"use server";
import db from "@/app/shared/prisma/lib/db";

export const deleteVehicle = async (id) => {
  const existCar = await db.vehicle.findUnique({
    where: {
      id,
    },
  });
  if (!existCar) {
    throw new Error("Транспорт не найден");
  }

  return await db.vehicle.delete({
    where: {
      id,
    },
  });
};
