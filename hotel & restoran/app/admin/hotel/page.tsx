import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getHotels } from "@/lib/api";
import { HotelExplorer } from "@/components/HotelExplorer";

export default async function AdminHotelPage() {
  const cookieStore = await cookies();
  const isLoggedIn = Boolean(cookieStore.get("sips_session")?.value);
  if (!isLoggedIn) redirect("/login?redirect=/admin/hotel");

  const hotels = await getHotels();

  return (
    <Suspense fallback={null}>
      <HotelExplorer hotels={hotels} isAdmin={true} />
    </Suspense>
  );
}