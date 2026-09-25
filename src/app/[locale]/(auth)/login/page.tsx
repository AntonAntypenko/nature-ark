import { setRequestLocale } from "next-intl/server";
import { LoginForm } from "@/components/blocks";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LoginForm />;
}
