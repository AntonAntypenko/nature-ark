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
  // 1. Отримуємо відповідь з локалізацією від next-intl
  const intlResponse = intlMiddleware(req);

  // 2. Оновлюємо сесію Supabase, передаючи відповідь від next-intl
  const { response, user } = await updateSession(req, intlResponse);

  const pathname = req.nextUrl.pathname;

  // Витягуємо мову з URL (наприклад: /uk/dashboard -> 'uk')
  const localeMatch = pathname.match(/^\/(uk|en)(\/|$)/);
  const currentLocale = localeMatch ? localeMatch[1] : routing.defaultLocale;

  // Визначаємо списки маршрутів
  const isProtectedPath =
      pathname.startsWith(`/${currentLocale}/dashboard`) ||
      pathname.startsWith(`/${currentLocale}/admin`);

  const isAuthPage =
      pathname.startsWith(`/${currentLocale}/login`) ||
      pathname.startsWith(`/${currentLocale}/register`);

  // Сценарій 1: Неавторизований користувач іде в захищений розділ
  if (!user && isProtectedPath) {
    const loginUrl = new URL(`/${currentLocale}/login`, req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Сценарій 2: Вже залогінений користувач намагається відкрити сторінку логіну/реєстрації
  if (user && isAuthPage) {
    const dashboardUrl = new URL(`/${currentLocale}/dashboard`, req.url);
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