"use server";
import db from "@/app/shared/prisma/lib/db";
import fs from "fs";
import path from "path";

export const deleteVehicle = async (id) => {
  try {
    const vehicle = await db.vehicle.findUnique({
      where: { id },
    });

    if (!vehicle) {
      throw new Error("Транспортное средство не найдено");
    }
    if (vehicle.image) {
      const imagePath = path.join(
        process.cwd(),
        "public",
        "vehicle",
        vehicle.image
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    await db.vehicle.delete({
      where: { id },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    throw error;
  }
};
