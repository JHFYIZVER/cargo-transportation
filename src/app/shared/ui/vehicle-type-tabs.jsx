import { getRussianVehicleName } from "@/lib/get-russian-vehicle-name";
import { Tabs, TabsList, TabsTrigger } from "./tabs";
import { VehicleType } from "@prisma/client";
import Link from "next/link";

const VehicleTypeTabs = ({ selectedType, href }) => {
  return (
    <Tabs defaultValue={selectedType || "all"} className="mb-10">
      <TabsList className="flex flex-wrap flex-row items-center bg-background gap-2 h-auto">
        <TabsTrigger
          className={"text-white! bg-[#282A2D] py-4 px-6"}
          value="all"
          asChild
        >
          <Link href={`/${href}`}>Все</Link>
        </TabsTrigger>
        {Object.values(VehicleType).map((type) => (
          <TabsTrigger
            className={"text-white! bg-[#282A2D] hover:bg-primary/60 transition-colors duration-300 py-4 px-6"}
            key={type}
            value={type}
            asChild
          >
            <Link href={`/${href}?type=${type}`}>
              {getRussianVehicleName(type)}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default VehicleTypeTabs;
