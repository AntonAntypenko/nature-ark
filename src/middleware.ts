import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { updateSession } from "@/lib/supabase/middleware";

const intlMiddleware = createMiddleware(routing);

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/dashboard")) {
    const { response, user } = await updateSession(req, NextResponse.next());

    if (!user) {
      const loginUrl = new URL(`/${routing.defaultLocale}/login`, req.url);
      return NextResponse.redirect(loginUrl);
    }

    return response;
  }

  const intlResponse = intlMiddleware(req);
  const { response, user } = await updateSession(req, intlResponse);

  const isAuthPage = pathname.includes("/login");

  if (user && isAuthPage) {
    const dashboardUrl = new URL("/dashboard", req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
