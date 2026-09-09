import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getPengajuans } from "@/lib/api";
import { PengajuanDashboard } from "@/components/PengajuanDashboard";

const SESSION_COOKIE = "sips_session";

export default async function PengajuanPage() {
  const cookieStore = await cookies();
  const isLoggedIn = Boolean(cookieStore.get(SESSION_COOKIE)?.value);

  if (!isLoggedIn) {
    redirect("/login?redirect=/pengajuan");
  }

  const pengajuans = await getPengajuans();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header showSearch={false} isAdmin />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 md:px-0">
        <h1 className="mb-5 text-center text-lg font-semibold text-gray-900">
          Pengajuan Data Masuk
        </h1>
        <PengajuanDashboard initialItems={pengajuans} />
      </main>
      <Footer />
    </div>
  );
}