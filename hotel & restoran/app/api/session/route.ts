import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_USERNAME, ADMIN_PASSWORD } from "@/lib/auth";

const SESSION_COOKIE = "sips_session";

export async function GET() {
  const cookieStore = await cookies();
  const username = cookieStore.get(SESSION_COOKIE)?.value;
  if (!username) {
    return NextResponse.json({ loggedIn: false }, { status: 200 });
  }
  return NextResponse.json({ loggedIn: true, username });
}

export async function POST(request: Request) {
  const { username, password } = await request
    .json()
    .catch(() => ({ username: "", password: "" }));

  if (!username || typeof username !== "string") {
    return NextResponse.json({ error: "Isi nama Terlebih dahulu*" }, { status: 400 });
  }
  if (!password || typeof password !== "string") {
    return NextResponse.json({ error: "Isi sandi Terlebih dahulu*" }, { status: 400 });
  }

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Nama atau sandi salah*" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true, username });
  response.cookies.set(SESSION_COOKIE, username, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(SESSION_COOKIE);
  return response;
}