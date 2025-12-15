import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export async function middleware(req: NextRequest) {
  const intlResponse = intlMiddleware(req);

  if (intlResponse) {
    return intlResponse;
  }

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
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
