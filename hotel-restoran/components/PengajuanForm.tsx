"use client";

import { useRef, useState } from "react";
import { areaOptions, bintangOptions, makananOptions } from "@/lib/data";
import { cn, stars } from "@/lib/utils";
import type { EntityKind } from "@/types";
import { ConfirmDialog } from "@/components/ConfirmDialog";

interface FormState {
  nama: string;
  area: string;
  jenisResto: string;
  bintang: string;
  telepon: string;
  alamat: string;
  googleMapsUrl: string;
  gambar: string;
}

const EMPTY_FORM: FormState = {
  nama: "",
  area: "",
  jenisResto: "",
  bintang: "",
  telepon: "",
  alamat: "",
  googleMapsUrl: "",
  gambar: "",
};

const MAX_PHOTO_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

export function PengajuanForm() {
  const [kind, setKind] = useState<EntityKind>("hotel");
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [submittedData, setSubmittedData] = useState<(FormState & { kind: EntityKind }) | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function handlePhotoClick() {
    fileInputRef.current?.click();
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setPhotoError("Format foto harus PNG, JPG, JPEG, atau WEBP");
      e.target.value = "";
      return;
    }
    if (file.size > MAX_PHOTO_SIZE) {
      setPhotoError("Ukuran foto maksimal 2MB");
      e.target.value = "";
      return;
    }

    setPhotoError(null);
    const reader = new FileReader();
    reader.onload = () => updateField("gambar", String(reader.result));
    reader.readAsDataURL(file);
  }

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    const namaLabel = kind === "hotel" ? "Nama Hotel" : "Nama Restoran";
    if (!form.nama.trim()) nextErrors.nama = `Isi ${namaLabel.toLowerCase()} terlebih dahulu`;
    if (kind === "hotel" && !form.area) nextErrors.area = "Pilih area terlebih dahulu";
    if (kind === "restoran" && !form.jenisResto)
      nextErrors.jenisResto = "Pilih jenis restoran terlebih dahulu";

    const teleponDigits = form.telepon.trim();
    if (!teleponDigits) {
      nextErrors.telepon = "Isi nomor telepon terlebih dahulu";
    } else if (!/^\d{7,13}$/.test(teleponDigits)) {
      nextErrors.telepon = "Nomor telepon harus 7-13 digit angka";
    }

    if (!form.alamat.trim()) {
      nextErrors.alamat = `Isi alamat ${kind === "hotel" ? "hotel" : "restoran"} terlebih dahulu`;
    }

    const mapsUrl = form.googleMapsUrl.trim();
    if (!mapsUrl) {
      nextErrors.googleMapsUrl = "Isi URL alamat terlebih dahulu";
    } else {
      try {
        new URL(mapsUrl);
      } catch {
        nextErrors.googleMapsUrl = "URL alamat tidak valid";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/pengajuan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, kind }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Gagal mengirim pengajuan");
      setSubmittedData({ ...form, kind });
      setSubmitted(true);
      setForm(EMPTY_FORM);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Gagal mengirim pengajuan");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-transparent bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-brand-green/40";
  const errorInputClass = "border-red-400";

  if (showReceipt && submittedData) {
    return (
      <div className="rounded-2xl bg-panel-blue p-5 md:p-6">
        <h2 className="mb-1 text-center text-base font-semibold text-gray-900">
          Ringkasan Pengajuan
        </h2>
        <p className="mb-5 text-center text-sm text-gray-500">
          Ini data yang baru saja kamu kirim. Menunggu peninjauan admin.
        </p>

        {submittedData.gambar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={submittedData.gambar}
            alt={submittedData.nama}
            className="mb-4 h-48 w-full rounded-lg object-cover"
          />
        ) : (
          <div className="mb-4 flex h-48 w-full items-center justify-center rounded-lg bg-white text-sm text-gray-400">
            Tanpa foto
          </div>
        )}

        <dl className="space-y-3 rounded-lg bg-white p-4 text-sm">
          <ReceiptRow label={submittedData.kind === "hotel" ? "Nama Hotel" : "Nama Restoran"}>
            {submittedData.nama}
          </ReceiptRow>
          <ReceiptRow label={submittedData.kind === "hotel" ? "Area" : "Jenis Restoran"}>
            {submittedData.kind === "hotel" ? submittedData.area : submittedData.jenisResto}
          </ReceiptRow>
          <ReceiptRow label="Bintang">{stars(Number(submittedData.bintang))}</ReceiptRow>
          <ReceiptRow label="Telepon">{submittedData.telepon}</ReceiptRow>
          <ReceiptRow label="Alamat">{submittedData.alamat}</ReceiptRow>
          <ReceiptRow label="URL Alamat">
            <a
              href={submittedData.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="break-all text-brand-green underline"
            >
              {submittedData.googleMapsUrl}
            </a>
          </ReceiptRow>
        </dl>

        <button
          type="button"
          onClick={() => {
            setShowReceipt(false);
            setSubmittedData(null);
          }}
          className="mt-5 w-full rounded-lg border border-brand-green bg-white py-2.5 text-sm font-semibold text-brand-green hover:bg-brand-green/5"
        >
          Ajukan Data Lain
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-panel-blue p-5 md:p-6">
      <div className="mb-5 inline-flex rounded-lg bg-white p-1 shadow-sm">
        {(["hotel", "restoran"] as EntityKind[]).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => {
              setKind(option);
              setErrors({});
            }}
            className={cn(
              "rounded-md px-4 py-1.5 text-sm font-medium capitalize transition",
              kind === option ? "bg-brand-green text-white" : "text-gray-600 hover:bg-gray-50"
            )}
          >
            {option}
          </button>
        ))}
      </div>

      <h2 className="mb-5 text-center text-base font-semibold text-gray-900">
        Ajukan Informasi {kind === "hotel" ? "Hotel" : "Restoran"}
      </h2>
      <p className="mb-5 text-center text-sm text-gray-500">
        Data yang kamu kirim akan ditinjau admin sebelum tampil di halaman publik.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FieldInput
          label={kind === "hotel" ? "Nama Hotel" : "Nama Restoran"}
          value={form.nama}
          onChange={(v) => updateField("nama", v)}
          error={errors.nama}
          className={inputClass}
          errorClassName={errorInputClass}
        />

        {kind === "hotel" ? (
          <>
            <SelectInput
              label="Area"
              value={form.area}
              onChange={(v) => updateField("area", v)}
              options={areaOptions}
              error={errors.area}
              className={inputClass}
              errorClassName={errorInputClass}
            />
            <SelectInput
              label="Bintang"
              value={form.bintang}
              onChange={(v) => updateField("bintang", v)}
              options={bintangOptions.map((b) => String(b))}
              renderOption={(v) => stars(Number(v))}
              className={inputClass}
              errorClassName={errorInputClass}
            />
          </>
        ) : (
          <SelectInput
            label="Jenis Restoran"
            value={form.jenisResto}
            onChange={(v) => updateField("jenisResto", v)}
            options={makananOptions}
            error={errors.jenisResto}
            className={inputClass}
            errorClassName={errorInputClass}
          />
        )}

        <FieldInput
          label="Telepon"
          value={form.telepon}
          onChange={(v) => updateField("telepon", v)}
          placeholder="0812 xxxx xxxx"
          error={errors.telepon}
          className={inputClass}
          errorClassName={errorInputClass}
        />

        <FieldInput
          label={kind === "hotel" ? "Alamat Hotel" : "Alamat Restoran"}
          value={form.alamat}
          onChange={(v) => updateField("alamat", v)}
          error={errors.alamat}
          className={inputClass}
          errorClassName={errorInputClass}
        />

        <FieldInput
          label="URL Alamat"
          value={form.googleMapsUrl}
          onChange={(v) => updateField("googleMapsUrl", v)}
          placeholder="https://maps.app.goo.gl/..."
          error={errors.googleMapsUrl}
          className={inputClass}
          errorClassName={errorInputClass}
        />

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Unggah Foto</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            onChange={handlePhotoChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={handlePhotoClick}
            className={cn(
              "flex h-40 w-full items-center justify-center overflow-hidden rounded-lg bg-white",
              !form.gambar && "border-2 border-dashed border-gray-200"
            )}
          >
            {form.gambar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.gambar} alt="Pratinjau foto" className="h-full w-full object-cover" />
            ) : (
              <PlusIcon />
            )}
          </button>
          <p className="mt-1 text-xs text-gray-400">
            Format PNG, JPG, JPEG, atau WEBP. Maksimal 2MB.
          </p>
          {photoError && <p className="mt-1 text-sm text-red-500">{photoError}</p>}
        </div>

        {submitError && <p className="text-sm text-red-500">{submitError}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg border border-brand-green bg-white py-2.5 text-sm font-semibold text-brand-green hover:bg-brand-green/5 disabled:opacity-60"
        >
          {loading ? "Mengirim..." : "Kirim Pengajuan"}
        </button>
      </form>

      {submitted && (
        <ConfirmDialog
          variant="success"
          title="Pengajuan berhasil dikirim!"
          message="Data kamu akan ditinjau oleh admin sebelum tampil di halaman publik."
          confirmLabel="Oke"
          onConfirm={() => {
            setSubmitted(false);
            setShowReceipt(true);
          }}
        />
      )}
    </div>
  );
}

function ReceiptRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-medium text-gray-500">{label}</dt>
      <dd className="text-gray-800">{children}</dd>
    </div>
  );
}

function FieldInput({
  label,
  value,
  onChange,
  placeholder,
  error,
  className,
  errorClassName,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  className?: string;
  errorClassName?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(className, error && errorClassName)}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function SelectInput({
  label,
  value,
  onChange,
  options,
  renderOption,
  error,
  className,
  errorClassName,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  renderOption?: (option: string) => string;
  error?: string;
  className?: string;
  errorClassName?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(className, error && errorClassName, !value && "text-gray-400")}
      >
        <option value="" disabled>
          Pilih {label.toLowerCase()}
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="text-gray-800">
            {renderOption ? renderOption(option) : option}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function PlusIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 4v20M4 14h20" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
