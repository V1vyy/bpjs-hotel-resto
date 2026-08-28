import { Suspense } from "react";
import { cookies } from "next/headers";
import { getRestorans } from "@/lib/api";
import { RestoranExplorer } from "@/components/RestoranExplorer";

export default async function RestoranHomePage() {
  const [restorans, cookieStore] = await Promise.all([getRestorans(), cookies()]);
  const isAdmin = Boolean(cookieStore.get("sips_session")?.value);

  return (
    <Suspense fallback={null}>
      <RestoranExplorer restorans={restorans} isAdmin={isAdmin} />
    </Suspense>
  );
}
