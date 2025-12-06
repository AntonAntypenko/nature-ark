import { NextResponse } from "next/server";
import { loginService } from "@/api/auth/login";
import { LoginRequestDTO } from "@/shared/auth";
import { LoginServiceResponse } from "@/api/auth/types";

export async function POST(req: Request) {
  const body: LoginRequestDTO = await req.json();

  try {
    const data: LoginServiceResponse = await loginService(body);

    const res = NextResponse.json({ success: true, user: data.dto.user });

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
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
