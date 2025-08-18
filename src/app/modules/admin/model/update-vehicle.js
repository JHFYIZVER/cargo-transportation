"use server";
import db from "@/app/shared/prisma/lib/db";
import fs from "fs";
import path from "path";

export const updateVehicle = async (formData) => {
  console.log(formData);

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
      const oldPath = path.join(
        process.cwd(),
        "public",
        "vehicle",
        oldVehicle.image
      );
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    const fileName = `vehicle-${Date.now()}${path.extname(imageFile.name)}`;
    const uploadPath = path.join(process.cwd(), "public", "vehicle", fileName);
    const fileBuffer = await imageFile.arrayBuffer();
    fs.writeFileSync(uploadPath, Buffer.from(fileBuffer));
    data.image = fileName;
  }

  return await db.vehicle.update({
    where: { id },
    data,
  });
};
