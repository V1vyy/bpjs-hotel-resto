import { Suspense } from "react";
import { getHotels } from "@/lib/api";
import { HotelExplorer } from "@/components/HotelExplorer";

export default async function HotelHomePage() {
  const hotels = await getHotels();

  return (
    <Suspense fallback={null}>
      <HotelExplorer hotels={hotels} isAdmin={false} />
    </Suspense>
  );
}