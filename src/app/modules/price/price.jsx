import PriceCard from "@/app/shared/ui/price-card";
import VehicleCardSkeleton from "@/app/shared/ui/vehicle-card-skeleton";
import VehicleTypeTabs from "@/app/shared/ui/vehicle-type-tabs";
import { getAllAutopark } from "@/lib/get-autopark";
import React, { Suspense } from "react";

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
      <PriceContent selectedType={selectedType} />
    </Suspense>
  );
};

const PriceContent = async ({ selectedType }) => {
  const autopark = await getAllAutopark(selectedType);

  return (
    <div className="flex flex-col space-y-6 items-center">
      {autopark.length > 0 ? (
        autopark.map((item) => <PriceCard allVehicles={autopark} key={item.id} vehicle={item} />)
      ) : (
        <p className="text-white">Транспорт данного типа не найден</p>
      )}
    </div>
  );
};

const Price = async ({ searchParams }) => {
  const selectedType = (await searchParams).type;
  return (
    <section>
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 uppercase text-white">
        Цены
      </h1>
      <VehicleTypeTabs selectedType={selectedType} href={"price"} />
      <TabContent selectedType={selectedType} />
    </section>
  );
};

export default Price;
