"use server";
import db from "@/app/shared/prisma/lib/db";
import { revalidatePath } from "next/cache";

export const getAllVehicles = async () => {
  revalidatePath("/dashboard/admin");
  return await db.vehicle.findMany();
};
