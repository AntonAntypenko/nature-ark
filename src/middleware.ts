import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { updateSession } from "@/lib/supabase/middleware";

const intlMiddleware = createMiddleware(routing);

/**
 * ARCHITECTURE DECISION: Combined Internationalization & Auth Pipeline
 *
 * Послідовність обробки:
 * 1. next-intl обробляє шлях і створює базовий респонс (локалізація/префікс).
 * 2. Supabase зчитує куки з запиту, оновлює їх у респонсі та дістає user.
 * 3. Guard Clauses перевіряють доступ користувача з урахуванням локалі (/uk, /en).
 */
export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // 1. ІЗОЛЬОВАНА ЗОНА: Dashboard (жодної взаємодії з next-intl!)
  if (pathname.startsWith("/dashboard")) {
    const { response, user } = await updateSession(req, NextResponse.next());

    // Неавторизований -> викидаємо на локалізований логін
    if (!user) {
      const loginUrl = new URL(`/${routing.defaultLocale}/login`, req.url);
      return NextResponse.redirect(loginUrl);
    }

    return response;
  }

  // 2. ПУБЛІЧНА ЗОНА: Обробка локалей через next-intl
  const intlResponse = intlMiddleware(req);
  const { response, user } = await updateSession(req, intlResponse);

  const isAuthPage =
    pathname.includes("/login") || pathname.includes("/register");

  // Авторизований користувач відкрив сторінку логіну -> кидаємо в чистий /dashboard
  if (user && isAuthPage) {
    const dashboardUrl = new URL("/dashboard", req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return response;
}

export const config = {
  // Ігноруємо статичні файли, картинки та системні шляхи
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
