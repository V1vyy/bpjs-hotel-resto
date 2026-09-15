import Image from "next/image";
import { RatingBadge } from "@/components/RatingBadge";

export function ListingCard({
  nama,
  gambar,
  bintang,
  onDetail,
}: {
  nama: string;
  gambar: string;
  bintang: number;
  googleMapsUrl: string;
  onDetail: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onDetail}
      className="block w-full overflow-hidden rounded-xl bg-white text-left shadow-sm transition hover:shadow-md"
    >
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
      </div>
    </button>
  );
}