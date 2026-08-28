import { hotels, restorans } from "@/lib/data";
import type { Hotel, Restoran } from "@/types";

// This file isolates "data fetching" from the UI. Right now it just returns
// (and mutates) the local in-memory dummy dataset, but each function is
// async so swapping the body for a real database/API call later doesn't
// touch any component.

export async function getHotels(): Promise<Hotel[]> {
  return hotels;
}

export async function getHotelById(id: string): Promise<Hotel | null> {
  return hotels.find((h) => h.id === id) ?? null;
}

export async function addHotel(payload: Omit<Hotel, "id">): Promise<Hotel> {
  const created: Hotel = { ...payload, id: `hotel-${Date.now()}` };
  hotels.unshift(created);
  return created;
}

export async function updateHotel(
  id: string,
  payload: Omit<Hotel, "id">
): Promise<Hotel | null> {
  const index = hotels.findIndex((h) => h.id === id);
  if (index === -1) return null;
  const updated: Hotel = { ...payload, id };
  hotels[index] = updated;
  return updated;
}

export async function deleteHotel(id: string): Promise<boolean> {
  const index = hotels.findIndex((h) => h.id === id);
  if (index === -1) return false;
  hotels.splice(index, 1);
  return true;
}

export async function getRestorans(): Promise<Restoran[]> {
  return restorans;
}

export async function getRestoranById(id: string): Promise<Restoran | null> {
  return restorans.find((r) => r.id === id) ?? null;
}

export async function addRestoran(
  payload: Omit<Restoran, "id">
): Promise<Restoran> {
  const created: Restoran = { ...payload, id: `resto-${Date.now()}` };
  restorans.unshift(created);
  return created;
}

export async function updateRestoran(
  id: string,
  payload: Omit<Restoran, "id">
): Promise<Restoran | null> {
  const index = restorans.findIndex((r) => r.id === id);
  if (index === -1) return null;
  const updated: Restoran = { ...payload, id };
  restorans[index] = updated;
  return updated;
}

export async function deleteRestoran(id: string): Promise<boolean> {
  const index = restorans.findIndex((r) => r.id === id);
  if (index === -1) return false;
  restorans.splice(index, 1);
  return true;
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
