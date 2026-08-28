"use client";

import { useRouter } from "next/navigation";
import { PasswordInput } from "@/components/PasswordInput";

export function AkunView({ username }: { username: string }) {
  const router = useRouter();
  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 outline-none";

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

      <button
        type="button"
        onClick={() => router.back()}
        className="w-full rounded-lg border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Kembali
      </button>
    </div>
  );
}
