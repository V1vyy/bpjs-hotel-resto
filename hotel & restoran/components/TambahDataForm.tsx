"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { areaOptions, bintangOptions, makananOptions } from "@/lib/data";
import { cn, stars } from "@/lib/utils";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import type { EntityKind, Hotel, Restoran } from "@/types";

interface FormState {
  nama: string;
  area: string;
  jenisResto: string;
  bintang: string;
  rating: string;
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
  rating: "",
  telepon: "",
  alamat: "",
  googleMapsUrl: "",
  gambar: "",
};

export function TambahDataForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");
  const isEditing = Boolean(editId);

  const [kind, setKind] = useState<EntityKind>(
    searchParams.get("type") === "restoran" ? "restoran" : "hotel"
  );
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [loading, setLoading] = useState(false);
  const [loadingRecord, setLoadingRecord] = useState(isEditing);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!editId) return;
    const endpoint = kind === "hotel" ? `/api/hotels/${editId}` : `/api/restorans/${editId}`;
    setLoadingRecord(true);
    fetch(endpoint)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: Hotel | Restoran | null) => {
        if (!data) return;
        setForm({
          nama: data.nama,
          area: "area" in data ? data.area : "",
          jenisResto: "jenisResto" in data ? data.jenisResto : "",
          bintang: String(data.bintang ?? ""),
          rating: String(data.rating ?? ""),
          telepon: data.telepon,
          alamat: data.alamat,
          googleMapsUrl: data.googleMapsUrl,
          gambar: data.gambar,
        });
      })
      .finally(() => setLoadingRecord(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editId]);

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
    const reader = new FileReader();
    reader.onload = () => {
      updateField("gambar", String(reader.result));
    };
    reader.readAsDataURL(file);
  }

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    const namaLabel = kind === "hotel" ? "Nama Hotel" : "Nama Restoran";
    if (!form.nama.trim()) nextErrors.nama = `Isi ${namaLabel.toLowerCase()} terlebih dahulu*`;
    if (kind === "hotel" && !form.area) nextErrors.area = "Pilih area terlebih dahulu*";
    if (kind === "restoran" && !form.jenisResto)
      nextErrors.jenisResto = "Pilih jenis restoran terlebih dahulu*";
    if (!form.alamat.trim()) {
      nextErrors.alamat = `Isi alamat ${kind === "hotel" ? "hotel" : "restoran"} terlebih dahulu*`;
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
      const endpoint =
        kind === "hotel"
          ? isEditing
            ? `/api/hotels/${editId}`
            : "/api/hotels"
          : isEditing
            ? `/api/restorans/${editId}`
            : "/api/restorans";

      const res = await fetch(endpoint, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Gagal menyimpan data");
      setShowSuccess(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Gagal menyimpan data");
    } finally {
      setLoading(false);
    }
  }

  function handleSuccessOk() {
    setShowSuccess(false);
    const base = kind === "hotel" ? "/" : "/restoran";
    const message = isEditing
      ? `${kind === "hotel" ? "Hotel" : "Restoran"} berhasil diubah!`
      : `${kind === "hotel" ? "Hotel" : "Restoran"} berhasil ditambahkan!`;
    router.push(`${base}?toast=${encodeURIComponent(message)}`);
  }

  function handleCancel() {
    router.back();
  }

  const inputClass =
    "w-full rounded-lg border border-transparent bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-brand-green/40";
  const errorInputClass = "border-red-400";

  return (
    <div className="rounded-2xl bg-panel-blue p-5 md:p-6">
      {!isEditing && (
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
      )}

      <h2 className="mb-5 text-center text-base font-semibold text-gray-900">
        Masukkan Informasi {kind === "hotel" ? "Hotel" : "Restoran"}!
      </h2>

      {loadingRecord ? (
        <p className="py-10 text-center text-sm text-gray-500">Memuat data...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field
            label={kind === "hotel" ? "Nama Hotel" : "Nama Restoran"}
            value={form.nama}
            onChange={(v) => updateField("nama", v)}
            error={errors.nama}
            className={inputClass}
            errorClassName={errorInputClass}
          />

          {kind === "hotel" ? (
            <>
              <SelectField
                label="Area"
                value={form.area}
                onChange={(v) => updateField("area", v)}
                options={areaOptions}
                error={errors.area}
                className={inputClass}
                errorClassName={errorInputClass}
              />
              <SelectField
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
            <SelectField
              label="Jenis Restoran"
              value={form.jenisResto}
              onChange={(v) => updateField("jenisResto", v)}
              options={makananOptions}
              error={errors.jenisResto}
              className={inputClass}
              errorClassName={errorInputClass}
            />
          )}

          <Field
            label="Rating"
            value={form.rating}
            onChange={(v) => updateField("rating", v)}
            type="number"
            min={0}
            max={5}
            step="0.1"
            className={inputClass}
            errorClassName={errorInputClass}
          />

          <Field
            label="Telepon"
            value={form.telepon}
            onChange={(v) => updateField("telepon", v)}
            placeholder="0812 xxxx xxxx"
            className={inputClass}
            errorClassName={errorInputClass}
          />

          <Field
            label={kind === "hotel" ? "Alamat Hotel" : "Alamat Restoran"}
            value={form.alamat}
            onChange={(v) => updateField("alamat", v)}
            error={errors.alamat}
            className={inputClass}
            errorClassName={errorInputClass}
          />

          <Field
            label="URL Alamat"
            value={form.googleMapsUrl}
            onChange={(v) => updateField("googleMapsUrl", v)}
            placeholder="https://maps.app.goo.gl/..."
            className={inputClass}
            errorClassName={errorInputClass}
          />

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Unggah Foto</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
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
          </div>

          {submitError && <p className="text-sm text-red-500">{submitError}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 rounded-lg border border-gray-300 bg-white py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg border border-brand-green bg-white py-2.5 text-sm font-semibold text-brand-green hover:bg-brand-green/5 disabled:opacity-60"
            >
              {loading ? "Menyimpan..." : "Tambah"}
            </button>
          </div>
        </form>
      )}

      {showSuccess && (
        <ConfirmDialog
          variant="success"
          title={isEditing ? "Data berhasil diubah!" : "Data berhasil ditambahkan!"}
          confirmLabel="Oke"
          onConfirm={handleSuccessOk}
        />
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
  className,
  errorClassName,
  ...rest
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  error?: string;
  className?: string;
  errorClassName?: string;
  min?: number;
  max?: number;
  step?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={error || placeholder}
        className={cn(
          className,
          error && errorClassName,
          error && "text-red-500 placeholder:text-red-500 placeholder:font-medium"
        )}
        {...rest}
      />
    </div>
  );
}

function SelectField({
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
      {error && <p className="mt-1 text-xs font-medium text-red-500">{error}</p>}
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
