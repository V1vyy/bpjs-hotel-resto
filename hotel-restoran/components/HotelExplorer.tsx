"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FilterDropdown } from "@/components/FilterDropdown";
import { ListingCard } from "@/components/ListingCard";
import { DetailModal } from "@/components/DetailModal";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { SuccessBanner } from "@/components/SuccessBanner";
import { useDebounce } from "@/hooks/useDebounce";
import { areaOptions, bintangOptions } from "@/lib/data";
import { normalize, stars } from "@/lib/utils";
import type { AreaHotel, Hotel } from "@/types";

export function HotelExplorer({
  hotels,
  isAdmin = false,
}: {
  hotels: Hotel[];
  isAdmin?: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const debouncedSearch = useDebounce(search);

  const [items, setItems] = useState(hotels);
  const [area, setArea] = useState<AreaHotel | null>(null);
  const [bintangLabel, setBintangLabel] = useState<string | null>(null);
  const bintang = bintangLabel ? Number(bintangLabel) : null;
  const [selected, setSelected] = useState<Hotel | null>(null);
  const [deleting, setDeleting] = useState<Hotel | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [toast, setToast] = useState(searchParams.get("toast"));
  const pathname = usePathname();

  const filtered = useMemo(() => {
    const query = normalize(debouncedSearch);
    return items.filter((hotel) => {
      const matchesQuery =
        !query ||
        normalize(hotel.nama).includes(query) ||
        normalize(hotel.area).includes(query);
      const matchesArea = !area || hotel.area === area;
      const matchesBintang = !bintang || hotel.bintang === bintang;
      return matchesQuery && matchesArea && matchesBintang;
    });
  }, [items, debouncedSearch, area, bintang]);

  const heading = debouncedSearch
    ? "Cari Hotel"
    : isAdmin
      ? "Beranda Hotel Admin"
      : "Beranda Hotel User";

  function clearToastFromUrl() {
  setToast(null);
  const params = new URLSearchParams(searchParams.toString());
  params.delete("toast");
  router.replace(params.size ? `${pathname}?${params.toString()}` : pathname, { scroll: false });
}

  async function handleConfirmDelete() {
    if (!deleting) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/hotels/${deleting.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setItems((prev) => prev.filter((h) => h.id !== deleting.id));
      setSelected(null);
      setToast("Hotel berhasil dihapus!");
    } catch {
      setToast("Gagal menghapus hotel.");
    } finally {
      setDeleteLoading(false);
      setDeleting(null);
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header searchValue={search} onSearchChange={setSearch} isAdmin={isAdmin} />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 md:px-0 mt-6">
        <h1 className="sr-only">{heading}</h1>

        <section className="relative rounded-2xl bg-panel-blue p-4 md:p-6">
          {toast && <SuccessBanner message={toast} onDone={clearToastFromUrl} />}

          <div className="mb-5 flex flex-wrap justify-center gap-3">
            <FilterDropdown
              label="Area Hotel"
              value={area}
              options={areaOptions}
              onChange={setArea}
            />
            <FilterDropdown
              label="Peringkat Hotel"
              value={bintangLabel}
              options={bintangOptions.map((b) => String(b))}
              onChange={setBintangLabel}
              renderOption={(v) => stars(Number(v))}
            />
          </div>

          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {filtered.map((hotel) => (
                <ListingCard
                  key={hotel.id}
                  nama={hotel.nama}
                  gambar={hotel.gambar}
                  bintang={hotel.bintang}
                  googleMapsUrl={hotel.googleMapsUrl}
                  onDetail={() => setSelected(hotel)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />

      {selected && (
        <DetailModal
          kind="hotel"
          title="Detail hotel"
          nama={selected.nama}
          bintang={selected.bintang}
          badges={[
            { label: "Area Hotel", value: selected.area },
            { label: "Bintang", value: `${selected.bintang} ★` },
          ]}
          telepon={selected.telepon}
          alamat={selected.alamat}
          googleMapsUrl={selected.googleMapsUrl}
          onClose={() => setSelected(null)}
          isAdmin={isAdmin}
          onEdit={() => router.push(`/admin/tambah-data?type=hotel&id=${selected.id}`)}
          onDelete={() => setDeleting(selected)}
        />
      )}

      {deleting && (
        <ConfirmDialog
          variant="danger"
          title="Konfirmasi hapus!"
          message="Apakah anda ingin menghapus informasi hotel?"
          confirmLabel="Hapus"
          loading={deleteLoading}
          onCancel={() => setDeleting(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 bg-white/60 py-14 text-center text-sm text-gray-500">
      Tidak ada hotel yang cocok dengan pencarian atau filter ini.
    </div>
  );
}