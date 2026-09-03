import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getRestorans } from "@/lib/api";
import { RestoranExplorer } from "@/components/RestoranExplorer";

export default async function AdminRestoranPage() {
  const cookieStore = await cookies();
  const isLoggedIn = Boolean(cookieStore.get("sips_session")?.value);
  if (!isLoggedIn) redirect("/login?redirect=/admin/restoran");

  const restorans = await getRestorans();

  return (
    <Suspense fallback={null}>
      <RestoranExplorer restorans={restorans} isAdmin={true} />
    </Suspense>
  );
}