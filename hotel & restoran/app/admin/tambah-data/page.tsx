import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { MinimalHeader } from "@/components/MinimalHeader";
import { Footer } from "@/components/Footer";
import { TambahDataForm } from "@/components/TambahDataForm";

const SESSION_COOKIE = "sips_session";

export default async function TambahDataPage() {
  const cookieStore = await cookies();
  const isLoggedIn = Boolean(cookieStore.get(SESSION_COOKIE)?.value);

  if (!isLoggedIn) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <MinimalHeader />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6 md:px-0">
        <Suspense fallback={null}>
          <TambahDataForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}