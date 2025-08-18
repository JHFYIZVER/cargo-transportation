import VehicleCardSkeleton from "@/app/shared/ui/vehicle-card-skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/app/shared/ui/tabs";
import VehicleCard from "@/app/shared/ui/vehicle-card";
import { getAllAutopark } from "./model/get-autopark";
import { VehicleType } from "@prisma/client";
import React, { Suspense } from "react";
import Link from "next/link";
import { getRussianVehicleName } from "./model/get-russian-vehicle-name";

const TabContent = ({ selectedType }) => {
  return (
    <Suspense
      key={selectedType}
      fallback={
        <div className="flex flex-col space-y-6 items-center">
          {[...Array(3)].map((_, i) => (
            <VehicleCardSkeleton key={i} />
          ))}
        </div>
      }
    >
      <AutoparkContent selectedType={selectedType} />
    </Suspense>
  );
};

const AutoparkContent = async ({ selectedType }) => {
  const autopark = await getAllAutopark(selectedType);

  return (
    <div className="flex flex-col space-y-6 items-center">
      {autopark.length > 0 ? (
        autopark.map((item) => <VehicleCard key={item.id} vehicle={item} />)
      ) : (
        <p className="text-white">Транспорт данного типа не найден</p>
      )}
    </div>
  );
};

const Autopark = async ({ searchParams }) => {
  const selectedType = (await searchParams).type;

  return (
    <section>
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 uppercase text-white">
        Автопарк
      </h1>

      <Tabs defaultValue={selectedType || "all"} className="mb-10">
        <TabsList className="flex flex-wrap flex-row items-center bg-background gap-2 h-auto">
          <TabsTrigger
            className={"text-white! bg-[#282A2D] py-6 px-6"}
            value="all"
            asChild
          >
            <Link href="/autopark">Все</Link>
          </TabsTrigger>
          {Object.values(VehicleType).map((type) => (
            <TabsTrigger
              className={"text-white! bg-[#282A2D] py-6 px-6"}
              key={type}
              value={type}
              asChild
            >
              <Link href={`/autopark?type=${type}`}>
                {getRussianVehicleName(type)}
              </Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <TabContent selectedType={selectedType} />
    </section>
  );
};

export default Autopark;
