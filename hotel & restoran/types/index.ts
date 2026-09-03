export type AreaHotel = "Dalam Kota" | "Selatan" | "Barat" | "Utara";

export type StarRating = 1 | 2 | 3 | 4 | 5;

export interface Hotel {
  id: string;
  nama: string;
  gambar: string;
  rating: number; // 0 - 5, user rating shown on card
  bintang: number; // official star classification, 1-5
  area: AreaHotel;
  telepon: string;
  alamat: string;
  googleMapsUrl: string;
}

export type JenisResto = "Makanan Berat" | "Makanan Ringan";
export type JenisMinuman = "Hangat" | "Dingin";

export interface Restoran {
  id: string;
  nama: string;
  gambar: string;
  rating: number;
  bintang: number;
  jenisResto: JenisResto;
  jenisMinuman?: JenisMinuman;
  telepon: string;
  alamat: string;
  googleMapsUrl: string;
}

export type EntityKind = "hotel" | "restoran";


export interface Pengajuan {
  id: string;
  kind: EntityKind;
  status: "pending";
  createdAt: string;
  nama: string;
  area?: AreaHotel;
  jenisResto?: JenisResto;
  jenisMinuman?: JenisMinuman;
  bintang: number;
  telepon: string;
  alamat: string;
  googleMapsUrl: string;
  gambar: string;
}