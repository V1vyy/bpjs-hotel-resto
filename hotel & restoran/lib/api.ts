import { prisma } from "@/lib/prisma";
import type { Hotel, Restoran, Pengajuan } from "@/types";

// This file isolates "data fetching" from the UI. It now reads/writes to
// the real Postgres (Neon) database via Prisma, instead of the in-memory
// dummy dataset that used to live in lib/data.ts.

export async function getHotels(): Promise<Hotel[]> {
  const rows = await prisma.hotel.findMany({ orderBy: { createdAt: "desc" } });
  return rows as unknown as Hotel[];
}

export async function getHotelById(id: string): Promise<Hotel | null> {
  const row = await prisma.hotel.findUnique({ where: { id } });
  return row as unknown as Hotel | null;
}

export async function addHotel(payload: Omit<Hotel, "id">): Promise<Hotel> {
  const created = await prisma.hotel.create({ data: payload });
  return created as unknown as Hotel;
}

export async function updateHotel(
  id: string,
  payload: Omit<Hotel, "id">
): Promise<Hotel | null> {
  try {
    const updated = await prisma.hotel.update({ where: { id }, data: payload });
    return updated as unknown as Hotel;
  } catch {
    return null;
  }
}

export async function deleteHotel(id: string): Promise<boolean> {
  try {
    await prisma.hotel.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}

export async function getRestorans(): Promise<Restoran[]> {
  const rows = await prisma.restoran.findMany({ orderBy: { createdAt: "desc" } });
  return rows as unknown as Restoran[];
}

export async function getRestoranById(id: string): Promise<Restoran | null> {
  const row = await prisma.restoran.findUnique({ where: { id } });
  return row as unknown as Restoran | null;
}

export async function addRestoran(
  payload: Omit<Restoran, "id">
): Promise<Restoran> {
  const created = await prisma.restoran.create({ data: payload });
  return created as unknown as Restoran;
}

export async function updateRestoran(
  id: string,
  payload: Omit<Restoran, "id">
): Promise<Restoran | null> {
  try {
    const updated = await prisma.restoran.update({ where: { id }, data: payload });
    return updated as unknown as Restoran;
  } catch {
    return null;
  }
}

export async function deleteRestoran(id: string): Promise<boolean> {
  try {
    await prisma.restoran.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}

// Shared helpers to turn a raw JSON body (from the add/edit form) into a
// typed payload, used by both the collection routes (POST) and the
// per-record routes (PUT).
export function hotelPayloadFromBody(body: Record<string, unknown>) {
  const nama = String(body.nama ?? "");
  return {
    nama,
    gambar: (body.gambar as string) || "/images/hotel-tentrem.jpg",
    rating: Number(body.rating) || 0,
    bintang: Number(body.bintang) || 3,
    area: body.area as Hotel["area"],
    telepon: (body.telepon as string) || "-",
    alamat: String(body.alamat ?? ""),
    googleMapsUrl:
      (body.googleMapsUrl as string) ||
      `https://maps.google.com/?q=${encodeURIComponent(nama)}`,
  };
}

export function restoranPayloadFromBody(body: Record<string, unknown>) {
  const nama = String(body.nama ?? "");
  return {
    nama,
    gambar: (body.gambar as string) || "/images/resto-tempo.jpg",
    rating: Number(body.rating) || 0,
    bintang: Number(body.bintang) || Math.round(Number(body.rating) || 4),
    jenisResto: body.jenisResto as Restoran["jenisResto"],
    jenisMinuman: (body.jenisMinuman as Restoran["jenisMinuman"]) || undefined,
    telepon: (body.telepon as string) || "-",
    alamat: String(body.alamat ?? ""),
    googleMapsUrl:
      (body.googleMapsUrl as string) ||
      `https://maps.google.com/?q=${encodeURIComponent(nama)}`,
  };
}

export async function getPengajuans(): Promise<Pengajuan[]> {
  const rows = await prisma.pengajuan.findMany({ orderBy: { createdAt: "desc" } });
  return rows as unknown as Pengajuan[];
}

export async function addPengajuan(
  payload: Omit<Pengajuan, "id" | "status" | "createdAt">
): Promise<Pengajuan> {
  const created = await prisma.pengajuan.create({
    data: {
      ...payload,
      status: "pending",
    },
  });
  return created as unknown as Pengajuan;
}

export async function approvePengajuan(
  id: string
): Promise<Hotel | Restoran | null> {
  const item = await prisma.pengajuan.findUnique({ where: { id } });
  if (!item) return null;

  let result: Hotel | Restoran;
  if (item.kind === "hotel") {
    result = await addHotel({
      nama: item.nama,
      gambar: item.gambar || "/images/hotel-tentrem.jpg",
      rating: 0,
      bintang: item.bintang,
      area: item.area as Hotel["area"],
      telepon: item.telepon,
      alamat: item.alamat,
      googleMapsUrl: item.googleMapsUrl,
    });
  } else {
    result = await addRestoran({
      nama: item.nama,
      gambar: item.gambar || "/images/resto-tempo.jpg",
      rating: 0,
      bintang: item.bintang,
      jenisResto: item.jenisResto as Restoran["jenisResto"],
      jenisMinuman: item.jenisMinuman as Restoran["jenisMinuman"] | undefined,
      telepon: item.telepon,
      alamat: item.alamat,
      googleMapsUrl: item.googleMapsUrl,
    });
  }

  await prisma.pengajuan.delete({ where: { id } });
  return result;
}

export async function rejectPengajuan(id: string): Promise<boolean> {
  try {
    await prisma.pengajuan.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}

export function pengajuanPayloadFromBody(
  body: Record<string, unknown>
): Omit<Pengajuan, "id" | "status" | "createdAt"> {
  return {
    kind: body.kind === "restoran" ? "restoran" : "hotel",
    nama: String(body.nama ?? ""),
    area: body.area as Pengajuan["area"],
    jenisResto: body.jenisResto as Pengajuan["jenisResto"],
    jenisMinuman: body.jenisMinuman as Pengajuan["jenisMinuman"],
    bintang: Number(body.bintang) || 3,
    telepon: (body.telepon as string) || "-",
    alamat: String(body.alamat ?? ""),
    googleMapsUrl: (body.googleMapsUrl as string) || "",
    gambar: (body.gambar as string) || "",
  };
}