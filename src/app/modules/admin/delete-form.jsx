"use client";

import { useState } from "react";
import { Button } from "@/app/shared/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/shared/ui/select";
import { deleteVehicle } from "./model/delete-vehicle";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/shared/ui/card";

const DeleteForm = ({ vehicles }) => {
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!selectedVehicleId) return;

    setIsDeleting(true);
    try {
      await deleteVehicle(selectedVehicleId);
      router.refresh();
      setSelectedVehicleId("");
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-[#282A2D] border-none text-white">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">
            Удаление транспорта
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Выберите транспорт</label>
            <Select
              value={selectedVehicleId}
              onValueChange={setSelectedVehicleId}
            >
              <SelectTrigger className="bg-white text-black">
                <SelectValue placeholder="Выберите транспорт" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {vehicles.map((vehicle) => (
                  <SelectItem key={vehicle.id} value={vehicle.id}>
                    {vehicle.name} ({vehicle.type})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleDelete}
            disabled={!selectedVehicleId || isDeleting}
            variant="destructive"
            className="w-fit"
          >
            {isDeleting ? "Удаление..." : "Удалить транспорт"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeleteForm;
