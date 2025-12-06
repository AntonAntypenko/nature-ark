import { NextResponse } from "next/server";
import { loginService } from "@/api/auth/login";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const data = await loginService(body);

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
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
