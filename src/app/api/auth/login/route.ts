import { NextResponse } from "next/server";

import { loginService } from "@/server/services";

import { LoginServiceResponse } from "@/server/types";
import { LoginRequestDTO } from "@/shared/schemas";
import { AuthenticationError, InternalServerError } from "@/server/errors";

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
    if (error instanceof AuthenticationError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    if (error instanceof InternalServerError) {
      console.error("Internal Server Error:", error.message, error.stack);
      return NextResponse.json(
        { error: "Внутрішня помилка сервера." },
        { status: 500 }
      );
    }

    if (error instanceof Error) {
      console.error("Unknown Error:", error.message, error.stack);
      return NextResponse.json(
        { error: "Невідома помилка сервера." },
        { status: 500 }
      );
    }

    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
