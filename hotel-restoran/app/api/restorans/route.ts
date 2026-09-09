import { NextResponse } from "next/server";
import { addRestoran, getRestorans, restoranPayloadFromBody } from "@/lib/api";

export async function GET() {
  const restorans = await getRestorans();
  return NextResponse.json(restorans);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.nama || !body?.jenisResto || !body?.alamat) {
    return NextResponse.json(
      { error: "Nama, jenis resto, dan alamat wajib diisi" },
      { status: 400 }
    );
  }

  const resto = await addRestoran(restoranPayloadFromBody(body));
  return NextResponse.json(resto, { status: 201 });
}
