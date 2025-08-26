"use server";
import db from "@/app/shared/prisma/lib/db";
import { cloudinary } from "@/lib/cloudinary";

export const updateVehicle = async (formData) => {
  try {
    const id = formData.get("id");
    const data = {
      name: formData.get("name"),
      type: formData.get("type"),
      description: formData.get("description"),
      basePrice: parseFloat(formData.get("basePrice")),
      priceCoefficient: parseFloat(formData.get("priceCoefficient")),
      length: parseFloat(formData.get("length")),
      width: parseFloat(formData.get("width")),
      height: parseFloat(formData.get("height")),
      volume: parseFloat(formData.get("volume")),
    };

    const imageFile = formData.get("image");

    if (imageFile && imageFile.size > 0) {
      const oldVehicle = await db.vehicle.findUnique({ where: { id } });

      if (oldVehicle.image) {
        try {
          const urlParts = oldVehicle.image.split("/");
          const fileName = urlParts[urlParts.length - 1];
          const publicId = fileName.split(".")[0];
          const fullPublicId = `vehicles/${publicId}`;

          await cloudinary.uploader.destroy(fullPublicId);
        } catch (error) {
          console.error("Error deleting old image from Cloudinary:", error);
        }
      }

      const imageBuffer = await imageFile.arrayBuffer();
      const base64Image = Buffer.from(imageBuffer).toString("base64");
      const dataURI = `data:${imageFile.type};base64,${base64Image}`;

      const uploadResponse = await cloudinary.uploader.upload(dataURI, {
        folder: "vehicles",
        resource_type: "auto",
      });

      data.image = uploadResponse.secure_url;
    }

    return await db.vehicle.update({
      where: { id },
      data,
    });
  } catch (error) {
    console.error("Error updating vehicle:", error);
    throw new Error(`Failed to update vehicle: ${error.message}`);
  }
};
