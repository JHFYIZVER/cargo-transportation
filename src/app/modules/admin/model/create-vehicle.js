"use server";
import db from "@/app/shared/prisma/lib/db";

export const createVehicle = async (data) => {
  return await db.vehicle.create({
    data: {
      name: data.name,
      type: data.type,
      description: data.description,
      basePrice: data.basePrice,
      priceCoefficient: data.priceCoefficient,
      length: data.length,
      height: data.height,
      volume: data.volume,
      image: data.image,
    },
  });
};
