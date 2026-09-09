import { NextResponse } from "next/server";
import {
  deleteRestoran,
  getRestoranById,
  restoranPayloadFromBody,
  updateRestoran,
} from "@/lib/api";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const resto = await getRestoranById(id);
  if (!resto) {
    return NextResponse.json({ error: "Restoran tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json(resto);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json().catch(() => null);

  if (!body?.nama || !body?.jenisResto || !body?.alamat) {
    return NextResponse.json(
      { error: "Nama, jenis resto, dan alamat wajib diisi" },
      { status: 400 }
    );
  }

  const updated = await updateRestoran(id, restoranPayloadFromBody(body));
  if (!updated) {
    return NextResponse.json({ error: "Restoran tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json(updated);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const ok = await deleteRestoran(id);
  if (!ok) {
    return NextResponse.json({ error: "Restoran tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
