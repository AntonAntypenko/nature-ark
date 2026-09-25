import { setRequestLocale } from "next-intl/server";
import { LoginForm } from "@/components/blocks";

type Props = {
  params: Promise<{ locale: string }>;
};

/**
 * ARCHITECTURE DECISION: Localized Server-Side Page Entrypoint (ADR 002, ADR 004)
 * Розпаковує асинхронні params та блокує локаль для SSG компіляції next-intl.
 */
export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LoginForm />;
}
