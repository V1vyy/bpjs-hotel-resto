import Link from "next/link";
import { Logo } from "@/components/Logo";


export function MinimalHeader() {
  return (
    <div className="border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-5xl items-center px-4 py-4 sm:px-6">
        <Link href="/" aria-label="Beranda">
          <Logo size={48} />
        </Link>
      </div>
    </div>
  );
}