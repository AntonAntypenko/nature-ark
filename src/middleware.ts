import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const supabaseToken = req.cookies.get("sb-access-token")?.value;

  const isLoginPage = req.nextUrl.pathname.startsWith("/login");

  if (!supabaseToken && !isLoginPage) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|api|login).*)"],
};
