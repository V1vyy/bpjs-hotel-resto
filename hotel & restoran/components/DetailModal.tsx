"use client";

import { useEffect, useRef } from "react";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { stars } from "@/lib/utils";

export interface DetailModalProps {
  kind: "hotel" | "restoran";
  title: string; // "Detail hotel" | "Detail Restoran"
  nama: string;
  bintang: number;
  badges: { label: string; value: string }[];
  telepon: string;
  alamat: string;
  googleMapsUrl: string;
  onClose: () => void;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function DetailModal({
  kind,
  title,
  nama,
  bintang,
  badges,
  telepon,
  alamat,
  googleMapsUrl,
  onClose,
  isAdmin = false,
  onEdit,
  onDelete,
}: DetailModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, onClose);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 animate-fade-in"
    >
      <div
        ref={ref}
        className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl animate-pop-in"
      >
        <div className="flex items-start justify-between gap-3 p-5">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-md bg-gray-100 p-2 text-gray-700">
              {kind === "hotel" ? <BuildingIcon /> : <StoreIcon />}
            </div>
            <div>
              <p className="text-xs text-amber-500">{stars(bintang)}</p>
              <p className="text-xs text-gray-500">{title}</p>
              <h2 className="text-base font-semibold text-gray-900">{nama}</h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 px-5">
          {badges.map((badge) => (
            <span
              key={badge.label}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
            >
              {badge.label}: {badge.value}
            </span>
          ))}
        </div>

        <div className="mx-5 my-4 border-t border-gray-100" />

        <div className="space-y-4 px-5">
          <div className="flex items-start gap-3">
            <PhoneIcon />
            <div>
              <p className="text-xs text-gray-500">Telepon</p>
              <p className="text-sm font-medium text-gray-800">{telepon}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <PinIcon />
            <div>
              <p className="text-xs text-gray-500">Alamat</p>
              <p className="text-sm font-medium text-gray-800">{alamat}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2 p-5 pt-6">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-100 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            <MapIcon />
            Buka di Google Maps
          </a>

          {isAdmin && (
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={onEdit}
                className="flex-1 rounded-lg border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Ubah
              </button>
              <button
                type="button"
                onClick={onDelete}
                className="flex-1 rounded-lg bg-red-500 py-2.5 text-sm font-semibold text-white hover:bg-red-600"
              >
                Hapus
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function BuildingIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="3" y="2" width="8" height="14" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="11" y="7" width="4" height="9" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5.5 5h1M5.5 8h1M5.5 11h1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
function StoreIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M2.5 6.5l1-3.5h11l1 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M3 6.5v8h12v-8" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7 14.5v-4h4v4" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0 text-gray-500">
      <path
        d="M3 3c0 6 4 10 10 10l1.5-2.5-3-1.5-1 1.5c-1.8-.8-3-2-3.8-3.8l1.5-1L6.5 3 3 3z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0 text-gray-500">
      <path
        d="M8 15s5-4.6 5-8.5A5 5 0 003 6.5C3 10.4 8 15 8 15z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="6.5" r="1.6" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
function MapIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 2L2 3.5v10.5L6 12.5l4 1.5 4-1.5V2.5L10 4 6 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M6 2v10.5M10 4v10" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
