import type { FC } from "react";

import { useTranslations } from "next-intl";

export const Footer: FC = () => {
  const t = useTranslations("landingSections.footer");

  return (
    <footer className="text-muted-foreground bg-muted w-full py-12 text-center">
      <p>{t("copyright")}</p>
      <p className="mt-3 text-sm">{t("links")}</p>
    </footer>
  );
};
