import { Suspense } from "react";
import { cookies } from "next/headers";
import { getHotels } from "@/lib/api";
import { HotelExplorer } from "@/components/HotelExplorer";

export default async function HotelHomePage() {
  const [hotels, cookieStore] = await Promise.all([getHotels(), cookies()]);
  const isAdmin = Boolean(cookieStore.get("sips_session")?.value);

  return (
    <Suspense fallback={null}>
      <HotelExplorer hotels={hotels} isAdmin={isAdmin} />
    </Suspense>
  );
}
