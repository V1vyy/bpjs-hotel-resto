import { Suspense } from "react";
import { getRestorans } from "@/lib/api";
import { RestoranExplorer } from "@/components/RestoranExplorer";

export default async function RestoranHomePage() {
  const restorans = await getRestorans();

  return (
    <Suspense fallback={null}>
      <RestoranExplorer restorans={restorans} isAdmin={false} />
    </Suspense>
  );
}