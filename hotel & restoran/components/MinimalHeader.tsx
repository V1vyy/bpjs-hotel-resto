import Link from "next/link";
import { Logo } from "@/components/Logo";

export function MinimalHeader() {
  return (
    <div className="border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-5xl items-center px-4 py-4 md:px-0">
        <Link href="/" aria-label="Beranda">
          <Logo />
        </Link>
      </div>
    </div>
  );
}
