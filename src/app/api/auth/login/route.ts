import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { data, error } = await supabaseServer().auth.signInWithPassword({
    email: body.email,
    password: body.password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });

  res.cookies.set("sb-access-token", data.session!.access_token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  res.cookies.set("sb-refresh-token", data.session!.refresh_token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  return res;
}
