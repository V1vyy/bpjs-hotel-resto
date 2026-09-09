import { NextResponse } from "next/server";
import {
  deleteHotel,
  getHotelById,
  hotelPayloadFromBody,
  updateHotel,
} from "@/lib/api";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const hotel = await getHotelById(id);
  if (!hotel) {
    return NextResponse.json({ error: "Hotel tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json(hotel);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json().catch(() => null);

  if (!body?.nama || !body?.area || !body?.alamat) {
    return NextResponse.json(
      { error: "Nama, area, dan alamat wajib diisi" },
      { status: 400 }
    );
  }

  const updated = await updateHotel(id, hotelPayloadFromBody(body));
  if (!updated) {
    return NextResponse.json({ error: "Hotel tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json(updated);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const ok = await deleteHotel(id);
  if (!ok) {
    return NextResponse.json({ error: "Hotel tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
