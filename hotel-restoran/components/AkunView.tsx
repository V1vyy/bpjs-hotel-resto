"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PasswordInput } from "@/components/PasswordInput";
import { ConfirmDialog } from "@/components/ConfirmDialog";

export function AkunView({ username }: { username: string }) {
  const router = useRouter();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 outline-none";

  function resetForm() {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError(null);
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("Semua field wajib diisi");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Konfirmasi sandi tidak cocok");
      return;
    }
    if (newPassword.length < 6) {
      setError("Sandi baru minimal 6 karakter");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/session/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword, confirmPassword }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Gagal mengubah sandi");
      setSuccess(true);
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengubah sandi");
    } finally {
      setLoading(false);
    }
  }

  if (showChangePassword) {
    return (
      <div className="space-y-4 rounded-2xl bg-panel-blue p-5">
        <h2 className="text-center text-sm font-semibold text-gray-800">Ubah Sandi</h2>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label htmlFor="old-password" className="mb-1 block text-sm font-medium text-gray-700">
              Sandi Lama
            </label>
            <PasswordInput
              id="old-password"
              name="old-password"
              value={oldPassword}
              onChange={setOldPassword}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="new-password" className="mb-1 block text-sm font-medium text-gray-700">
              Sandi Baru
            </label>
            <PasswordInput
              id="new-password"
              name="new-password"
              value={newPassword}
              onChange={setNewPassword}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="confirm-password" className="mb-1 block text-sm font-medium text-gray-700">
              Konfirmasi Sandi Baru
            </label>
            <PasswordInput
              id="confirm-password"
              name="confirm-password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              className={inputClass}
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setShowChangePassword(false);
                resetForm();
              }}
              className="rounded-lg border border-gray-300 bg-white py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg border border-brand-green bg-white py-2.5 text-sm font-semibold text-brand-green hover:bg-brand-green/5 disabled:opacity-60"
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>

        {success && (
          <ConfirmDialog
            variant="success"
            title="Sandi berhasil diubah!"
            confirmLabel="Oke"
            onConfirm={() => setSuccess(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-2xl bg-panel-blue p-5">
      <div>
        <label htmlFor="nama" className="mb-1 block text-sm font-medium text-gray-700">
          Nama
        </label>
        <input id="nama" readOnly value={username} className={inputClass} />
      </div>

      <div>
        <label htmlFor="sandi" className="mb-1 block text-sm font-medium text-gray-700">
          Sandi
        </label>
        <PasswordInput
          id="sandi"
          name="sandi"
          value="••••••••"
          onChange={() => {}}
          readOnly
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-gray-300 bg-white py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          Kembali
        </button>
        <button
          type="button"
          onClick={() => setShowChangePassword(true)}
          className="rounded-lg border border-brand-green bg-white py-2.5 text-sm font-semibold text-brand-green hover:bg-brand-green/5"
        >
          Ubah Sandi
        </button>
      </div>
    </div>
  );
}