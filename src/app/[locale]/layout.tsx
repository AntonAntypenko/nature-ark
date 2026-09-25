import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

/**
 * ARCHITECTURE DECISION: Localized Route Wrapper
 * Надає контекст next-intl виключно для публічних сторінок (Landing, Login).
 * Не містить тегів <html> або <body>, оскільки успадковує їх від кореневого app/layout.tsx.
 */
export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Фіксуємо локаль для SSG статичної генерації (ADR 002)
  setRequestLocale(locale);

  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
