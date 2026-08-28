import { Suspense } from "react";
import { MinimalHeader } from "@/components/MinimalHeader";
import { Footer } from "@/components/Footer";
import { TambahDataForm } from "@/components/TambahDataForm";

export default function TambahDataPage() {
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
