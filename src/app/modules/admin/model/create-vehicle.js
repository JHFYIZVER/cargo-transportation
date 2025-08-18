"use server";
import db from "@/app/shared/prisma/lib/db";
import fs from "fs";
import path from "path";

export const createVehicle = async (formData) => {
  console.log(formData);

  const imageFile = formData.get("image");

  const fileName = `vehicle-${Date.now()}${path.extname(imageFile.name)}`;
  const uploadPath = path.join(process.cwd(), "public", "vehicle", fileName);

  const fileBuffer = await imageFile.arrayBuffer();
  fs.writeFileSync(uploadPath, Buffer.from(fileBuffer));

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
      image: `${fileName}`,
    },
  });
};
