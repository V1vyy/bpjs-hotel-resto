# SIPS Dashboard — Hotel & Restoran (BPJS Ketenagakerjaan Yogyakarta)

Website pencarian hotel & restoran rekanan, dibuat dengan **Next.js (App Router) + TypeScript + Tailwind CSS**, sesuai desain yang dikirimkan (Beranda Hotel, Cari Hotel, Beranda Restoran, dropdown filter, popup detail, menu hamburger, dll).

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000

Build production:

```bash
npm run build
npm run start
```

## Struktur folder

```
app/
  page.tsx              -> Beranda/Cari Hotel ("/")
  restoran/page.tsx     -> Beranda/Cari Restoran ("/restoran")
  login/page.tsx        -> Halaman login (untuk akses Tambah Data)
  tambah-data/page.tsx  -> Form tambah hotel/restoran (dilindungi middleware)
  api/
    hotels/route.ts     -> GET/POST data hotel
    restorans/route.ts  -> GET/POST data restoran
    session/route.ts    -> Set/hapus cookie sesi login
  layout.tsx, globals.css
components/              -> Header (dropdown menu), FilterDropdown, ListingCard,
                             DetailModal, Footer, form-form, dll
hooks/                    -> useDebounce, useOnClickOutside
lib/
  data.ts                -> Data contoh (dummy) hotel & restoran
  api.ts                 -> Lapisan pemanggilan data (ganti dengan API/DB asli nanti)
  utils.ts
types/index.ts            -> Tipe data Hotel, Restoran, dll
middleware.ts              -> Melindungi rute /tambah-data (redirect ke /login jika belum ada sesi)
public/images/              -> Gambar contoh (placeholder, silakan ganti dengan foto asli)
```

## Fitur yang mengikuti desain

- Header dengan logo, kolom pencarian, dan menu hamburger (Hotel / Restoran / Tambah Data).
- Beranda Hotel: filter **Area Hotel** (Dalam Kota, Selatan, Barat, Utara) & **Peringkat Hotel** (bintang), grid kartu hotel (foto, nama, rating, tombol Detail & Buka Peta).
- Beranda Restoran: filter **Makanan** (Makanan Berat/Ringan) & **Minuman** (Hangat/Dingin).
- Popup **Detail** menampilkan bintang, badge info, telepon, alamat, dan tombol "Buka di Google Maps".
- Pencarian otomatis (debounced) memfilter berdasarkan nama/area, judul halaman berubah menjadi "Cari Hotel"/"Cari Restoran" saat ada kata kunci.
- Halaman **Tambah Data** dengan form, dilindungi login sederhana lewat middleware + cookie sesi (contoh alur autentikasi, silakan sambungkan ke sistem login asli).
- Footer gradasi hijau → hijau muda dengan teks hak cipta.

## Mengganti data dengan API/database asli

Semua pengambilan data melewati `lib/api.ts` (`getHotels`, `getRestorans`, `addHotel`, `addRestoran`). Cukup ganti isi fungsi-fungsi tersebut agar memanggil database/API sesungguhnya — komponen UI tidak perlu diubah.

## Catatan

- Gambar di `public/images/` adalah placeholder; ganti dengan foto hotel/restoran asli (nama file sama: `hotel-tentrem.jpg`, `resto-tempo.jpg`) atau perbarui path di `lib/data.ts`.
- Nomor telepon & alamat pada data contoh bersifat dummy.
