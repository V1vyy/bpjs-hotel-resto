import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DEFAULT_HOTELS = [
  {
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

const DEFAULT_RESTORANS = [
  {
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

async function main() {
  console.log("Seeding hotels...");
  for (const hotel of DEFAULT_HOTELS) {
    await prisma.hotel.create({ data: hotel });
  }

  console.log("Seeding restorans...");
  for (const restoran of DEFAULT_RESTORANS) {
    await prisma.restoran.create({ data: restoran });
  }
 
  console.log("Seeding selesai!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });