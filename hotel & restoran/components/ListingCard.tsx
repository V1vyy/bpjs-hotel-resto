import Image from "next/image";
import { RatingBadge } from "@/components/RatingBadge";

export function ListingCard({
  nama,
  gambar,
  bintang,
  googleMapsUrl,
  onDetail,
}: {
  nama: string;
  gambar: string;
  bintang: number;
  googleMapsUrl: string;
  onDetail: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-card-border bg-white shadow-sm transition hover:shadow-md">
      <div className="relative h-36 w-full bg-gray-100">
        <Image
          src={gambar}
          alt={nama}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="space-y-2 p-3">
        <h3 className="truncate text-sm font-semibold text-gray-900">{nama}</h3>
        <RatingBadge rating={bintang} />
        <div className="flex gap-2 pt-1">
                    <button
            type="button"
            onClick={onDetail}
            className="flex-1 rounded-md bg-gray-100 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200"
          >
            Detail
          </button>
          
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 rounded-md bg-brand-green py-1.5 text-center text-xs font-semibold text-white hover:bg-brand-green/90"
          >
            Buka Peta
          </a>
        </div>
      </div>
    </div>
  );
}