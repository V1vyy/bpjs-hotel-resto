import { NextResponse } from "next/server";
import { addHotel, getHotels, hotelPayloadFromBody } from "@/lib/api";

export async function GET() {
  const hotels = await getHotels();
  return NextResponse.json(hotels);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.nama || !body?.area || !body?.alamat) {
    return NextResponse.json(
      { error: "Nama, area, dan alamat wajib diisi" },
      { status: 400 }
    );
  }

  const hotel = await addHotel(hotelPayloadFromBody(body));
  return NextResponse.json(hotel, { status: 201 });
}
