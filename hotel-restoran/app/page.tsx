"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BACKGROUNDS = {
  default: "/images/bpjs.jpg",
  hotel: "/images/hallo-hotel.jpg",
  restoran: "/images/hallo-resto.jpg",
};

export default function LandingPage() {
  const router = useRouter();
  const [hovered, setHovered] = useState<"default" | "hotel" | "restoran">("default");

  return (
    <div className="flex min-h-screen flex-col">
      <header className="w-full bg-white">
        <div className="mx-auto flex max-w-5xl items-center px-5 py-4 sm:px-6">
          <Image
            src="/logo-bpjs.png"
            alt="BPJS Ketenagakerjaan"
            width={220}
            height={48}
            style={{ height: "auto" }}
            className="object-contain"
            priority
          />
        </div>
      </header>

      <main className="relative flex flex-1 items-center justify-center overflow-hidden">
        {(Object.keys(BACKGROUNDS) as Array<keyof typeof BACKGROUNDS>).map((key) => (
          <Image
            key={key}
            src={BACKGROUNDS[key]}
            alt=""
            fill
            priority
            className={`absolute inset-0 object-cover transition-opacity duration-700 ${
              hovered === key ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex flex-col items-center px-4 text-center text-white">
          <h2 className="text-lg font-semibold">BPJS Ketenagakerjaan</h2>
          <p className="mb-4 text-sm text-white/80">Kantor Cabang Yogyakarta</p>

          <h1 className="mb-6 text-3xl font-bold sm:text-4xl">
            Pencarian Hotel &amp; Restoran Jogja
          </h1>

          <div className="mb-6 flex flex-wrap justify-center gap-4">
 <button
    type="button"
    onClick={() => router.push("/hotel")}
    onMouseEnter={() => setHovered("hotel")}
    onMouseLeave={() => setHovered("default")}
    className="rounded-lg bg-white/15 px-8 py-3 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition hover:bg-white/25"
  >
    Hotel
  </button>
  <button
    type="button"
    onClick={() => router.push("/restoran")}
    onMouseEnter={() => setHovered("restoran")}
    onMouseLeave={() => setHovered("default")}
    className="rounded-lg bg-white/15 px-8 py-3 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition hover:bg-white/25"
  >
    Restoran
  </button>
</div>

          <p className="max-w-xl text-sm text-white/90">
            Temukan penginapan nyaman dan kuliner khas Jogja dalam satu klik.
            Pilih <strong>Hotel</strong> untuk tempat istirahat terbaik, atau{" "}
            <strong>Restoran</strong> untuk wisata rasa tak terlupakan!
          </p>
        </div>
      </main>
    </div>
  );
}