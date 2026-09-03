import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/Logo";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="w-full bg-white">
  <div className="mx-auto flex max-w-5xl items-center px-5 py-4 sm:px-6">
    <Image
      src="/logo-bpjs.png"
      alt="BPJS Ketenagakerjaan Kantor Cabang Yogyakarta"
      width={220}
      height={48}
      className="object-contain"
      priority
    />
  </div>
</header>

      <main className="relative flex flex-1 items-center justify-center overflow-hidden">
        <Image
          src="/images/bpjs.jpg"
          alt="Yogyakarta"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative z-10 mx-4 max-w-xl rounded-2xl bg-white/80 p-8 text-center shadow-lg">
          <p className="mb-6 text-base text-gray-800">
            Temukan penginapan nyaman dan kuliner khas Jogja dalam satu klik.
            Pilih Hotel untuk tempat istirahat terbaik, atau Restoran untuk
            wisata rasa tak terlupakan!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/hotel"
              className="rounded-lg bg-white px-8 py-3 text-sm font-semibold text-gray-900 shadow hover:bg-gray-50"
            >
              Hotel
            </Link>
            <Link
              href="/restoran"
              className="rounded-lg bg-white px-8 py-3 text-sm font-semibold text-gray-900 shadow hover:bg-gray-50"
            >
              Restoran
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
