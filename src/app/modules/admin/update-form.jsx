"use client";

import { useForm } from "react-hook-form";
import { vehicleSchema } from "./lib/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/shared/ui/card";
import { Input } from "@/app/shared/ui/input";
import { Button } from "@/app/shared/ui/button";
import { updateVehicle } from "./model/update-vehicle";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { VehicleType } from "@prisma/client";
import { Textarea } from "@/app/shared/ui/textarea";
import { CldImage } from "next-cloudinary";
import {
  Select as SelectUI,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
} from "@/app/shared/ui/select";
import { useRouter } from "next/navigation";

const UpdateForm = ({ vehicles }) => {
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(vehicleSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const router = useRouter();
  useEffect(() => {
    if (selectedVehicleId) {
      const vehicle = vehicles.find((v) => v.id === selectedVehicleId);
      setSelectedVehicle(vehicle);

      reset({
        name: vehicle.name,
        type: vehicle.type,
        description: vehicle.description,
        basePrice: vehicle.basePrice,
        priceCoefficient: vehicle.priceCoefficient,
        length: vehicle.length,
        width: vehicle.width,
        height: vehicle.height,
        volume: vehicle.volume,
      });

      if (vehicle.image) {
        setImagePreview(`${vehicle.image}`);
      } else {
        setImagePreview(null);
      }
      setSelectedFile(null);
    }
  }, [selectedVehicleId, vehicles, reset]);

  const onSubmit = async (data) => {
    if (!selectedVehicle) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("id", selectedVehicle.id);

      Object.entries(data).forEach(([key, value]) => {
        if (key !== "image" && value !== undefined) {
          formData.append(key, value);
        }
      });

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      const updatedVehicle = await updateVehicle(formData);
      const updatedVehicles = vehicles.map((v) =>
        v.id === updatedVehicle.id ? updatedVehicle : v
      );
      router.refresh();
      setSelectedVehicle(updatedVehicle);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log(imagePreview);

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setValue("image", files, { shouldValidate: true });
    } else {
      setValue("image", null, { shouldValidate: true });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-[#282A2D] border-none text-white">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">
            Выберите транспорт для редактирования
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SelectUI
            value={selectedVehicleId || ""}
            onValueChange={setSelectedVehicleId}
          >
            <SelectTrigger className="bg-white text-black">
              <SelectValue placeholder="Выберите транспорт" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {vehicles.map((vehicle) => (
                <SelectItem key={vehicle.id} value={vehicle.id}>
                  {vehicle.name}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectUI>
        </CardContent>
      </Card>

      {selectedVehicle && (
        <Card className="bg-[#282A2D] max-w-2xl w-full border-none">
          <CardHeader className="text-white">
            <CardTitle className="text-xl md:text-2xl">
              Редактировать транспорт
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex space-y-4 flex-col text-white"
            >
              <label className="flex flex-col gap-1">
                <span className={errors.name && "text-destructive"}>
                  Название
                </span>
                <Input
                  {...register("name")}
                  className="bg-white py-6 text-black"
                  placeholder="Грузовик Volvo"
                />
                {errors.name && (
                  <span className="mt-1 text-sm text-destructive">
                    {errors.name.message}
                  </span>
                )}
              </label>

              <label className="flex flex-col gap-1">
                <span className={errors.type && "text-destructive"}>
                  Тип транспорта
                </span>
                <Select
                  onValueChange={(value) => setValue("type", value)}
                  value={watch("type")}
                >
                  <SelectTrigger className="bg-white py-6 text-black">
                    <SelectValue placeholder="Выберите тип транспорта" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {Object.values(VehicleType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type
                          .split("_")
                          .map(
                            (word) =>
                              word.charAt(0) + word.slice(1).toLowerCase()
                          )
                          .join(" ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.type && (
                  <span className="mt-1 text-sm text-destructive">
                    {errors.type.message}
                  </span>
                )}
              </label>

              <label className="flex flex-col gap-1">
                <span className={errors.description && "text-destructive"}>
                  Описание
                </span>
                <Textarea
                  {...register("description")}
                  className="bg-white py-6 text-black min-h-[100px]"
                  placeholder="Описание характеристик транспорта"
                />
                {errors.description && (
                  <span className="mt-1 text-sm text-destructive">
                    {errors.description.message}
                  </span>
                )}
              </label>

              <label className="flex flex-col gap-1">
                <span className={errors.basePrice && "text-destructive"}>
                  Базовая цена (₽)
                </span>
                <Input
                  {...register("basePrice", { valueAsNumber: true })}
                  className="bg-white py-6 text-black"
                  type="number"
                  placeholder="10000"
                />
                {errors.basePrice && (
                  <span className="mt-1 text-sm text-destructive">
                    {errors.basePrice.message}
                  </span>
                )}
              </label>

              <label className="flex flex-col gap-1">
                <span className={errors.priceCoefficient && "text-destructive"}>
                  Коэффициент цены
                </span>
                <Input
                  {...register("priceCoefficient", { valueAsNumber: true })}
                  className="bg-white py-6 text-black"
                  type="number"
                  step="0.1"
                  placeholder="1.0"
                />
                {errors.priceCoefficient && (
                  <span className="mt-1 text-sm text-destructive">
                    {errors.priceCoefficient.message}
                  </span>
                )}
              </label>

              <div className="grid grid-cols-3 gap-4">
                <label className="flex flex-col gap-1">
                  <span className={errors.length && "text-destructive"}>
                    Длина (м)
                  </span>
                  <Input
                    {...register("length", { valueAsNumber: true })}
                    className="bg-white py-6 text-black"
                    type="number"
                    step="0.1"
                    placeholder="5.0"
                  />
                  {errors.length && (
                    <span className="mt-1 text-sm text-destructive">
                      {errors.length.message}
                    </span>
                  )}
                </label>

                <label className="flex flex-col gap-1">
                  <span className={errors.width && "text-destructive"}>
                    Ширина (м)
                  </span>
                  <Input
                    {...register("width", { valueAsNumber: true })}
                    className="bg-white py-6 text-black"
                    type="number"
                    step="0.1"
                    placeholder="2.5"
                  />
                  {errors.width && (
                    <span className="mt-1 text-sm text-destructive">
                      {errors.width.message}
                    </span>
                  )}
                </label>

                <label className="flex flex-col gap-1">
                  <span className={errors.height && "text-destructive"}>
                    Высота (м)
                  </span>
                  <Input
                    {...register("height", { valueAsNumber: true })}
                    className="bg-white py-6 text-black"
                    type="number"
                    step="0.1"
                    placeholder="2.5"
                  />
                  {errors.height && (
                    <span className="mt-1 text-sm text-destructive">
                      {errors.height.message}
                    </span>
                  )}
                </label>
              </div>

              <label className="flex flex-col gap-1">
                <span className={errors.volume && "text-destructive"}>
                  Объем (м³)
                </span>
                <Input
                  {...register("volume", { valueAsNumber: true })}
                  className="bg-white py-6 text-black"
                  type="number"
                  step="0.1"
                  placeholder="30.0"
                />
                {errors.volume && (
                  <span className="mt-1 text-sm text-destructive">
                    {errors.volume.message}
                  </span>
                )}
              </label>

              <label className="flex flex-col gap-1">
                <span className={errors.image && "text-destructive"}>
                  Изображение
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="bg-white py-6 px-3 text-black"
                />
                {imagePreview && (
                  <div className="mt-2">
                    <CldImage
                      src={imagePreview}
                      alt="Preview"
                      width={200}
                      height={200}
                      className="max-w-[200px] max-h-[200px] object-contain"
                    />
                  </div>
                )}
                {errors.image && (
                  <span className="mt-1 text-sm text-destructive">
                    {errors.image.message}
                  </span>
                )}
              </label>
              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-pointer mt-6"
                >
                  {isSubmitting ? "Обновление..." : "Обновить транспорт"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    reset();
                    setImagePreview(
                      selectedVehicle?.image ? `${selectedVehicle.image}` : null
                    );
                    setSelectedFile(null);
                  }}
                  className="cursor-pointer mt-6"
                >
                  Сбросить изменения
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UpdateForm;
