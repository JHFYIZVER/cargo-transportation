"use server";
import db from "@/app/shared/prisma/lib/db";
import { unstable_noStore as noStore } from "next/cache";

export const getAllVehicles = async () => {
  noStore();
  return await db.vehicle.findMany();
};
