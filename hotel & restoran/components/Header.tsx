"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

const GUEST_LINKS = [
  { href: "/", label: "Hotel" },
  { href: "/restoran", label: "Restoran" },
  { href: "/tambah-data", label: "Tambah Data" },
];

const ADMIN_LINKS = [
  { href: "/", label: "Hotel" },
  { href: "/restoran", label: "Restoran" },
  { href: "/akun", label: "Informasi Akun" },
];

export function Header({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Cari nama hotel atau area...",
  showSearch = true,
  isAdmin = false,
}: {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  showSearch?: boolean;
  isAdmin?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmingLogout, setConfirmingLogout] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(menuRef, () => setMenuOpen(false));

  const [localSearch, setLocalSearch] = useState(searchValue ?? "");
  const router = useRouter();
  const pathname = usePathname();

  const value = onSearchChange ? searchValue ?? "" : localSearch;
  const links = isAdmin ? ADMIN_LINKS : GUEST_LINKS;
  const addHref = pathname?.startsWith("/restoran")
    ? "/tambah-data?type=restoran"
    : "/tambah-data?type=hotel";

  function handleChange(next: string) {
    if (onSearchChange) {
      onSearchChange(next);
    } else {
      setLocalSearch(next);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!onSearchChange) {
      const base = pathname?.startsWith("/restoran") ? "/restoran" : "/";
      router.push(`${base}?q=${encodeURIComponent(value)}`);
    }
  }

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/session", { method: "DELETE" });
    } finally {
      setLoggingOut(false);
      setConfirmingLogout(false);
      setMenuOpen(false);
      router.push("/");
      router.refresh();
    }
  }

  return (
    <header className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-4 md:px-0">
      <Link href="/" className="shrink-0" aria-label="Beranda">
        <Logo />
      </Link>

      {showSearch && (
        <form onSubmit={handleSubmit} className="flex-1">
          <label className="relative block">
            <span className="sr-only">Cari</span>
            <input
              type="text"
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full rounded-lg bg-gray-100 py-2.5 pl-4 pr-11 text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-brand-green/40"
            />
            <button
              type="submit"
              aria-label="Cari"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <SearchIcon />
            </button>
          </label>
        </form>
      )}

      {!showSearch && <div className="flex-1" />}

      {isAdmin && (
        <Link
          href={addHref}
          aria-label="Tambah data"
          className="shrink-0 rounded-full bg-gray-800 p-2 text-white hover:bg-gray-700"
        >
          <PlusIcon />
        </Link>
      )}

      <div className="relative shrink-0" ref={menuRef}>
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          aria-label="Menu"
          className="rounded-md p-2 text-gray-700 hover:bg-gray-100"
        >
          <MenuIcon />
        </button>

        {menuOpen && (
          <ul
            role="menu"
            className="absolute right-0 z-30 mt-2 w-44 overflow-hidden rounded-lg border border-gray-100 bg-white py-1 shadow-lg animate-pop-in"
          >
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href} role="none">
                  <Link
                    href={link.href}
                    role="menuitem"
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "block px-4 py-2 text-sm hover:bg-gray-50",
                      active ? "font-semibold text-brand-green" : "text-gray-700"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            {isAdmin && (
              <li role="none">
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false);
                    setConfirmingLogout(true);
                  }}
                  className="block w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-50"
                >
                  Keluar
                </button>
              </li>
            )}
          </ul>
        )}
      </div>

      {confirmingLogout && (
        <ConfirmDialog
          variant="warning"
          title="Konfirmasi keluar!"
          message="Apakah anda ingin keluar dari halaman ini?"
          confirmLabel="Keluar"
          loading={loggingOut}
          onCancel={() => setConfirmingLogout(false)}
          onConfirm={handleLogout}
        />
      )}
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M16 16l-3.4-3.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2v14M2 9h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
