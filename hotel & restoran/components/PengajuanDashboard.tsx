"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { stars } from "@/lib/utils";
import type { Pengajuan } from "@/types";

export function PengajuanDashboard({ initialItems }: { initialItems: Pengajuan[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [detail, setDetail] = useState<Pengajuan | null>(null);

  async function handleApprove(id: string) {
    setProcessingId(id);
    setError(null);
    try {
      const res = await fetch(`/api/pengajuan/${id}`, { method: "PATCH" });
      if (!res.ok) throw new Error();
      setItems((prev) => prev.filter((p) => p.id !== id));
      setDetail(null);
      router.refresh();
    } catch {
      setError("Gagal menyetujui pengajuan.");
    } finally {
      setProcessingId(null);
    }
  }

  async function handleReject(id: string) {
    setProcessingId(id);
    setError(null);
    try {
      const res = await fetch(`/api/pengajuan/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setItems((prev) => prev.filter((p) => p.id !== id));
      setDetail(null);
    } catch {
      setError("Gagal menolak pengajuan.");
    } finally {
      setProcessingId(null);
    }
  }

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white/60 py-14 text-center text-sm text-gray-500">
        Belum ada pengajuan data yang masuk.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && <p className="text-center text-sm text-red-500">{error}</p>}
      {items.map((item) => (
        <div
          key={item.id}
          className="flex flex-col gap-4 rounded-xl border border-card-border bg-white p-4 sm:flex-row sm:items-center"
        >
          {item.gambar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.gambar}
              alt={item.nama}
              className="h-24 w-full rounded-lg object-cover sm:w-32"
            />
          ) : (
            <div className="flex h-24 w-full items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400 sm:w-32">
              Tanpa foto
            </div>
          )}

          <div className="flex-1 space-y-1">
            <span className="inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium capitalize text-gray-600">
              {item.kind}
            </span>
            <h3 className="text-sm font-semibold text-gray-900">{item.nama}</h3>
            <p className="text-xs text-gray-500">
              {item.kind === "hotel" ? item.area : item.jenisResto} ·{" "}
              {stars(item.bintang)} · {item.telepon}
            </p>
            <p className="text-xs text-gray-500">{item.alamat}</p>
          </div>

          <div className="flex gap-2 sm:flex-col">
            <button
              type="button"
              onClick={() => setDetail(item)}
              className="flex-1 rounded-lg bg-gray-100 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-200"
            >
              Detail
            </button>
            <button
              type="button"
              disabled={processingId === item.id}
              onClick={() => handleApprove(item.id)}
              className="flex-1 rounded-lg bg-brand-green px-4 py-2 text-xs font-semibold text-white hover:bg-brand-green/90 disabled:opacity-60"
            >
              Setujui
            </button>
            <button
              type="button"
              disabled={processingId === item.id}
              onClick={() => handleReject(item.id)}
              className="flex-1 rounded-lg border border-red-300 px-4 py-2 text-xs font-semibold text-red-500 hover:bg-red-50 disabled:opacity-60"
            >
              Tolak
            </button>
          </div>
        </div>
      ))}

      {detail && (
        <PengajuanDetailModal
          item={detail}
          loading={processingId === detail.id}
          onClose={() => setDetail(null)}
          onApprove={() => handleApprove(detail.id)}
          onReject={() => handleReject(detail.id)}
        />
      )}
    </div>
  );
}

function PengajuanDetailModal({
  item,
  loading,
  onClose,
  onApprove,
  onReject,
}: {
  item: Pengajuan;
  loading: boolean;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between">
          <div>
            <span className="mb-1 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium capitalize text-gray-600">
              {item.kind}
            </span>
            <h2 className="text-base font-semibold text-gray-900">{item.nama}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {item.gambar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.gambar}
            alt={item.nama}
            className="mb-4 h-48 w-full rounded-lg object-cover"
          />
        ) : (
          <div className="mb-4 flex h-48 w-full items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">
            Tanpa foto
          </div>
        )}

        <dl className="space-y-3 text-sm">
          <Row label={item.kind === "hotel" ? "Area" : "Jenis Restoran"}>
            {item.kind === "hotel" ? item.area : item.jenisResto}
          </Row>
          {item.kind === "restoran" && item.jenisMinuman && (
            <Row label="Jenis Minuman">{item.jenisMinuman}</Row>
          )}
          <Row label="Bintang">{stars(item.bintang)}</Row>
          <Row label="Telepon">{item.telepon}</Row>
          <Row label="Alamat">{item.alamat}</Row>
          <Row label="URL Google Maps">
            <a
              href={item.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="break-all text-brand-green underline"
            >
              {item.googleMapsUrl || "-"}
            </a>
          </Row>
          <Row label="Diajukan pada">
            {new Date(item.createdAt).toLocaleString("id-ID")}
          </Row>
        </dl>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={onReject}
            className="flex-1 rounded-lg border border-red-300 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 disabled:opacity-60"
          >
            Tolak
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={onApprove}
            className="flex-1 rounded-lg bg-brand-green py-2.5 text-sm font-semibold text-white hover:bg-brand-green/90 disabled:opacity-60"
          >
            Setujui
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-medium text-gray-500">{label}</dt>
      <dd className="text-gray-800">{children}</dd>
    </div>
  );
}