import { cookies } from "next/headers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AkunView } from "@/components/AkunView";
import { ADMIN_PASSWORD } from "@/lib/auth";

export default async function AkunPage() {
  const cookieStore = await cookies();
  const username = cookieStore.get("sips_session")?.value ?? "";

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header showSearch={false} isAdmin />
      <main className="mx-auto w-full max-w-sm flex-1 px-4 pb-10 md:px-0 mt-6">
        <h1 className="mb-4 text-center text-lg font-semibold text-gray-400">Akun Anda</h1>
        <AkunView username={username} password={ADMIN_PASSWORD} />
      </main>
      <Footer />
    </div>
  );
}