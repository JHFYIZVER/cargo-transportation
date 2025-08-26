"use server";
import db from "@/app/shared/prisma/lib/db";
import { cloudinary } from "@/lib/cloudinary";

export const createVehicle = async (formData) => {
  try {
    const imageFile = formData.get("image");
    const imageBuffer = await imageFile.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString("base64");
    const dataURI = `data:${imageFile.type};base64,${base64Image}`;

    const uploadResponse = await cloudinary.uploader.upload(dataURI, {
      folder: "vehicles",
      resource_type: "auto",
    });

    const imageUrl = uploadResponse.secure_url;

    return await db.vehicle.create({
      data: {
        name: formData.get("name"),
        type: formData.get("type"),
        description: formData.get("description"),
        basePrice: parseFloat(formData.get("basePrice")),
        priceCoefficient: parseFloat(formData.get("priceCoefficient")),
        width: parseFloat(formData.get("width")),
        length: parseFloat(formData.get("length")),
        height: parseFloat(formData.get("height")),
        volume: parseFloat(formData.get("volume")),
        image: imageUrl,
      },
    });
  } catch (error) {
    console.error("Error creating vehicle:", error);
    throw new Error("Failed to create vehicle");
  }
};
