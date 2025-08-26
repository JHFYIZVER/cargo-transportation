"use server";
import db from "@/app/shared/prisma/lib/db";
import { cloudinary } from "@/lib/cloudinary";

export const deleteVehicle = async (id) => {
  try {
    const vehicle = await db.vehicle.findUnique({
      where: { id },
    });

    if (!vehicle) {
      throw new Error("Транспортное средство не найдено");
    }

    if (vehicle.image) {
      try {
        const urlParts = vehicle.image.split("/");
        const fileName = urlParts[urlParts.length - 1];
        const publicId = fileName.split(".")[0];
        const fullPublicId = `vehicles/${publicId}`;
        await cloudinary.uploader.destroy(fullPublicId);
      } catch (cloudinaryError) {
        console.error("Error deleting image from Cloudinary:", cloudinaryError);
    
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
