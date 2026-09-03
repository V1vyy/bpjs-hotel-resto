import { NextResponse } from "next/server";
import { addPengajuan, getPengajuans, pengajuanPayloadFromBody } from "@/lib/api";

export async function GET() {
  const items = await getPengajuans();
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.nama || !body?.alamat) {
    return NextResponse.json(
      { error: "Nama dan alamat wajib diisi" },
      { status: 400 }
    );
  }
  if (body.kind === "hotel" && !body.area) {
    return NextResponse.json({ error: "Area wajib diisi" }, { status: 400 });
  }
  if (body.kind === "restoran" && !body.jenisResto) {
    return NextResponse.json(
      { error: "Jenis restoran wajib diisi" },
      { status: 400 }
    );
  }

  const pengajuan = await addPengajuan(pengajuanPayloadFromBody(body));
  return NextResponse.json(pengajuan, { status: 201 });
}