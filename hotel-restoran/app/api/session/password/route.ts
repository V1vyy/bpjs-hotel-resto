import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminByUsername, updateAdminPassword } from "@/lib/auth";

const SESSION_COOKIE = "sips_session";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const username = cookieStore.get(SESSION_COOKIE)?.value;
  if (!username) {
    return NextResponse.json({ error: "Silakan login terlebih dahulu" }, { status: 401 });
  }

  const { oldPassword, newPassword, confirmPassword } = await request
    .json()
    .catch(() => ({}));

  if (!oldPassword || !newPassword || !confirmPassword) {
    return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 });
  }
  if (newPassword !== confirmPassword) {
    return NextResponse.json({ error: "Konfirmasi sandi tidak cocok" }, { status: 400 });
  }
  if (newPassword.length < 6) {
    return NextResponse.json({ error: "Sandi baru minimal 6 karakter" }, { status: 400 });
  }

  const admin = await getAdminByUsername(username);
  if (!admin || admin.password !== oldPassword) {
    return NextResponse.json({ error: "Sandi lama tidak sesuai" }, { status: 401 });
  }

  await updateAdminPassword(username, newPassword);
  return NextResponse.json({ ok: true });
}