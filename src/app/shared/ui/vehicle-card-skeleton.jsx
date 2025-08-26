import { Skeleton } from "./skeleton";

const VehicleCardSkeleton = () => {
  return (
    <div className="w-full flex gap-5 shadow-lg bg-[#282A2D] p-5 space-y-4">
      <Skeleton className="h-40 w-full bg-[#2f3135]" />
      <div className="space-y-2 w-full">
        <Skeleton className="h-8 w-full bg-[#2f3135]" />
        <Skeleton className="h-30 w-full bg-[#2f3135]" />
      </div>
    </div>
  );
};

export default VehicleCardSkeleton;
