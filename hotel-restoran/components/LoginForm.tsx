"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PasswordInput } from "@/components/PasswordInput";
import { cn } from "@/lib/utils";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/admin/hotel";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const nextErrors: { username?: string; password?: string } = {};
    if (!username.trim()) nextErrors.username = "Isi nama terlebih dahulu";
    if (!password.trim()) nextErrors.password = "Isi sandi terlebih dahulu";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
  const data = await res.json().catch(() => ({}));
  throw new Error(data.error ?? "Login gagal");
}
window.location.href = redirectTo;
    } catch (err) {
      setErrors({
        password: err instanceof Error ? err.message : "Login gagal",
      });
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border-0 px-3 py-2.5 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-white/70";

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm space-y-4 rounded-2xl bg-brand-green/85 p-6 shadow-sm"
    >
      <h1 className="text-center text-base font-semibold text-white">Selamat Datang!</h1>

      <div>
        <label htmlFor="username" className="sr-only">
          Nama
        </label>
        <ErrorTooltip message={errors.username}>
          <input
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (errors.username) setErrors((prev) => ({ ...prev, username: undefined }));
            }}
            placeholder="Nama"
            className={cn(inputClass, "bg-white")}
          />
        </ErrorTooltip>
      </div>

      <div>
        <label htmlFor="password" className="sr-only">
          Sandi
        </label>
        <ErrorTooltip message={errors.password}>
          <PasswordInput
            id="password"
            name="password"
            value={password}
            onChange={(next) => {
              setPassword(next);
              if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            placeholder="Sandi"
            className={cn(inputClass, "bg-white")}
          />
        </ErrorTooltip>
      </div>

      <div className="flex gap-3 pt-1">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 rounded-lg bg-white py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          Kembali
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-lg bg-white py-2.5 text-sm font-semibold text-brand-green hover:bg-gray-50 disabled:opacity-60"
        >
          {loading ? "Memproses..." : "Masuk"}
        </button>
      </div>
    </form>
  );
}

function ErrorTooltip({
  message,
  children,
}: {
  message?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {children}
      {message && (
        <div className="absolute left-0 top-[calc(100%+10px)] z-20 w-max max-w-[280px]">
          <div className="absolute -top-1.5 left-4 h-3 w-3 rotate-45 rounded-[2px] bg-white shadow-sm" />
          <div className="relative flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-lg">
            <WarningIcon />
            <span className="text-sm text-gray-700">{message}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function WarningIcon() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 3v3.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="6" cy="8.4" r="0.9" fill="white" />
      </svg>
    </span>
  );
}