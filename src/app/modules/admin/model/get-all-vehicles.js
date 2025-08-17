"use server";
import db from "@/app/shared/prisma/lib/db";

export const getAllVehicles = async () => {
  return await db.vehicle.findMany();
};
