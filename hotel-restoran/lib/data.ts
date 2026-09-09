import type { Hotel, Restoran, Pengajuan } from "@/types";

// NOTE: This is placeholder/demo data so the UI has something to render.
// Replace `getHotels` / `getRestorans` with real API or database calls
// (see lib/api.ts for where to wire that up) when the backend is ready.

const DEFAULT_HOTELS: Hotel[] = [
  {
    id: "hotel-tentrem-1",
    nama: "Hotel Tentrem Yogyakarta",
    gambar: "/images/hotel-tentrem.jpg",
    rating: 4.8,
    bintang: 5,
    area: "Selatan",
    telepon: "0812 xxxx xxxx",
    alamat: "Jl. P. Mangkubumi No.72A, Gowongan, Jetis, Yogyakarta 55233",
    googleMapsUrl: "https://maps.google.com/?q=Hotel+Tentrem+Yogyakarta",
  },
  {
    id: "hotel-tentrem-2",
    nama: "Hotel Tentrem Yogyakarta",
    gambar: "/images/hotel-tentrem.jpg",
    rating: 4.8, 
    bintang: 5,
    area: "Dalam Kota",
    telepon: "0812 xxxx xxxx",
    alamat: "Jl. P. Mangkubumi No.72A, Gowongan, Jetis, Yogyakarta 55233",
    googleMapsUrl: "https://maps.google.com/?q=Hotel+Tentrem+Yogyakarta",
  },
  {
    id: "hotel-tentrem-3",
    nama: "Hotel Tentrem Yogyakarta",
    gambar: "/images/hotel-tentrem.jpg",
    rating: 4.8,
    bintang: 5,
    area: "Barat",
    telepon: "0812 xxxx xxxx",
    alamat: "Jl. P. Mangkubumi No.72A, Gowongan, Jetis, Yogyakarta 55233",
    googleMapsUrl: "https://maps.google.com/?q=Hotel+Tentrem+Yogyakarta",
  },
  {
    id: "hotel-tentrem-4",
    nama: "Hotel Tentrem Yogyakarta",
    gambar: "/images/hotel-tentrem.jpg",
    rating: 4.8,
    bintang: 5,
    area: "Utara",
    telepon: "0812 xxxx xxxx",
    alamat: "Jl. P. Mangkubumi No.72A, Gowongan, Jetis, Yogyakarta 55233",
    googleMapsUrl: "https://maps.google.com/?q=Hotel+Tentrem+Yogyakarta",
  },
  {
    id: "hotel-tentrem-5",
    nama: "Hotel Tentrem Yogyakarta",
    gambar: "/images/hotel-tentrem.jpg",
    rating: 4.8,
    bintang: 4,
    area: "Selatan",
    telepon: "0812 xxxx xxxx",
    alamat: "Jl. P. Mangkubumi No.72A, Gowongan, Jetis, Yogyakarta 55233",
    googleMapsUrl: "https://maps.google.com/?q=Hotel+Tentrem+Yogyakarta",
  },
  {
    id: "hotel-tentrem-6",
    nama: "Hotel Tentrem Yogyakarta",
    gambar: "/images/hotel-tentrem.jpg",
    rating: 4.8,
    bintang: 3,
    area: "Dalam Kota",
    telepon: "0812 xxxx xxxx",
    alamat: "Jl. P. Mangkubumi No.72A, Gowongan, Jetis, Yogyakarta 55233",
    googleMapsUrl: "https://maps.google.com/?q=Hotel+Tentrem+Yogyakarta",
  },
];

const DEFAULT_RESTORANS: Restoran[] = [
  {
    id: "resto-tempo-1",
    nama: "Tempo Gelato Prawirotaman",
    gambar: "/images/resto-tempo.jpg",
    rating: 4.8,
    bintang: 5,
    jenisResto: "Makanan Ringan",
    jenisMinuman: "Dingin",
    telepon: "0812 xxxx xxxx",
    alamat: "Jl. P. Mangkubumi No.72A, Gowongan, Jetis, Yogyakarta 55233",
    googleMapsUrl: "https://maps.google.com/?q=Tempo+Gelato+Prawirotaman",
  },
  {
    id: "resto-tempo-2",
    nama: "Tempo Gelato Prawirotaman",
    gambar: "/images/resto-tempo.jpg",
    rating: 4.8,
    bintang: 5,
    jenisResto: "Makanan Berat",
    jenisMinuman: "Hangat",
    telepon: "0812 xxxx xxxx",
    alamat: "Jl. P. Mangkubumi No.72A, Gowongan, Jetis, Yogyakarta 55233",
    googleMapsUrl: "https://maps.google.com/?q=Tempo+Gelato+Prawirotaman",
  },
  {
    id: "resto-tempo-3",
    nama: "Tempo Gelato Prawirotaman",
    gambar: "/images/resto-tempo.jpg",
    rating: 4.8,
    bintang: 4,
    jenisResto: "Makanan Ringan",
    jenisMinuman: "Hangat",
    telepon: "0812 xxxx xxxx",
    alamat: "Jl. P. Mangkubumi No.72A, Gowongan, Jetis, Yogyakarta 55233",
    googleMapsUrl: "https://maps.google.com/?q=Tempo+Gelato+Prawirotaman",
  },
  {
    id: "resto-tempo-4",
    nama: "Tempo Gelato Prawirotaman",
    gambar: "/images/resto-tempo.jpg",
    rating: 4.8,
    bintang: 5,
    jenisResto: "Makanan Berat",
    jenisMinuman: "Dingin",
    telepon: "0812 xxxx xxxx",
    alamat: "Jl. P. Mangkubumi No.72A, Gowongan, Jetis, Yogyakarta 55233",
    googleMapsUrl: "https://maps.google.com/?q=Tempo+Gelato+Prawirotaman",
  },
  {
    id: "resto-tempo-5",
    nama: "Tempo Gelato Prawirotaman",
    gambar: "/images/resto-tempo.jpg",
    rating: 4.8,
    bintang: 3,
    jenisResto: "Makanan Ringan",
    jenisMinuman: "Dingin",
    telepon: "0812 xxxx xxxx",
    alamat: "Jl. P. Mangkubumi No.72A, Gowongan, Jetis, Yogyakarta 55233",
    googleMapsUrl: "https://maps.google.com/?q=Tempo+Gelato+Prawirotaman",
  },
  {
    id: "resto-tempo-6",
    nama: "Tempo Gelato Prawirotaman",
    gambar: "/images/resto-tempo.jpg",
    rating: 4.8,
    bintang: 5,
    jenisResto: "Makanan Berat",
    jenisMinuman: "Hangat",
    telepon: "0812 xxxx xxxx",
    alamat: "Jl. P. Mangkubumi No.72A, Gowongan, Jetis, Yogyakarta 55233",
    googleMapsUrl: "https://maps.google.com/?q=Tempo+Gelato+Prawirotaman",
  },
];

// Store the mutable arrays on globalThis so every module (API routes,
// server components) shares the exact same in-memory instance, even across
// Turbopack/dev-server hot-reload module re-evaluation.
const globalForData = globalThis as unknown as {
  __hotels?: Hotel[];
  __restorans?: Restoran[];
  __pengajuans?: Pengajuan[];
};

export const hotels: Hotel[] = globalForData.__hotels ?? DEFAULT_HOTELS;
globalForData.__hotels = hotels;

export const restorans: Restoran[] = globalForData.__restorans ?? DEFAULT_RESTORANS;
globalForData.__restorans = restorans;

export const pengajuans: Pengajuan[] = globalForData.__pengajuans ?? [];
globalForData.__pengajuans = pengajuans;

export const areaOptions = ["Dalam Kota", "Selatan", "Barat", "Utara"] as const;
export const bintangOptions = [5, 4, 3, 2, 1] as const;
export const makananOptions = ["Makanan Berat", "Makanan Ringan"] as const;
export const minumanOptions = ["Hangat", "Dingin"] as const;