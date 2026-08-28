"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FilterDropdown } from "@/components/FilterDropdown";
import { ListingCard } from "@/components/ListingCard";
import { DetailModal } from "@/components/DetailModal";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { SuccessBanner } from "@/components/SuccessBanner";
import { useDebounce } from "@/hooks/useDebounce";
import { makananOptions, minumanOptions } from "@/lib/data";
import { normalize } from "@/lib/utils";
import type { JenisMinuman, JenisResto, Restoran } from "@/types";

export function RestoranExplorer({
  restorans,
  isAdmin = false,
}: {
  restorans: Restoran[];
  isAdmin?: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const debouncedSearch = useDebounce(search);

  const [items, setItems] = useState(restorans);
  const [makanan, setMakanan] = useState<JenisResto | null>(null);
  const [minuman, setMinuman] = useState<JenisMinuman | null>(null);
  const [selected, setSelected] = useState<Restoran | null>(null);
  const [deleting, setDeleting] = useState<Restoran | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [toast, setToast] = useState(searchParams.get("toast"));

  const filtered = useMemo(() => {
    const query = normalize(debouncedSearch);
    return items.filter((resto) => {
      const matchesQuery = !query || normalize(resto.nama).includes(query);
      const matchesMakanan = !makanan || resto.jenisResto === makanan;
      const matchesMinuman = !minuman || resto.jenisMinuman === minuman;
      return matchesQuery && matchesMakanan && matchesMinuman;
    });
  }, [items, debouncedSearch, makanan, minuman]);

  const heading = debouncedSearch
    ? "Cari Restoran"
    : isAdmin
      ? "Beranda Restoran Admin"
      : "Beranda Restoran User";

  function clearToastFromUrl() {
    setToast(null);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("toast");
    router.replace(params.size ? `/restoran?${params.toString()}` : "/restoran", {
      scroll: false,
    });
  }

  async function handleConfirmDelete() {
    if (!deleting) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/restorans/${deleting.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setItems((prev) => prev.filter((r) => r.id !== deleting.id));
      setSelected(null);
      setToast("Restoran berhasil dihapus!");
    } catch {
      setToast("Gagal menghapus restoran.");
    } finally {
      setDeleteLoading(false);
      setDeleting(null);
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari nama restoran atau area..."
        isAdmin={isAdmin}
      />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 md:px-0">
        <h1 className="sr-only">{heading}</h1>

        <section className="relative rounded-2xl bg-panel-blue p-4 md:p-6">
          {toast && <SuccessBanner message={toast} onDone={clearToastFromUrl} />}

          <div className="mb-5 flex flex-wrap gap-3">
            <FilterDropdown
              label="Makanan"
              value={makanan}
              options={makananOptions}
              onChange={setMakanan}
            />
            <FilterDropdown
              label="Minuman"
              value={minuman}
              options={minumanOptions}
              onChange={setMinuman}
            />
          </div>

          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {filtered.map((resto) => (
                <ListingCard
                  key={resto.id}
                  nama={resto.nama}
                  gambar={resto.gambar}
                  rating={resto.rating}
                  googleMapsUrl={resto.googleMapsUrl}
                  onDetail={() => setSelected(resto)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />

      {selected && (
        <DetailModal
          kind="restoran"
          title="Detail Restoran"
          nama={selected.nama}
          bintang={selected.bintang}
          badges={[
            { label: "Jenis Resto", value: selected.jenisResto },
            { label: "Bintang", value: `${selected.bintang} ★` },
            { label: "Rating", value: `${selected.rating} / 5` },
          ]}
          telepon={selected.telepon}
          alamat={selected.alamat}
          googleMapsUrl={selected.googleMapsUrl}
          onClose={() => setSelected(null)}
          isAdmin={isAdmin}
          onEdit={() => router.push(`/tambah-data?type=restoran&id=${selected.id}`)}
          onDelete={() => setDeleting(selected)}
        />
      )}

      {deleting && (
        <ConfirmDialog
          variant="danger"
          title="Konfirmasi hapus!"
          message="Apakah anda ingin menghapus informasi restoran?"
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
      Tidak ada restoran yang cocok dengan pencarian atau filter ini.
    </div>
  );
}
