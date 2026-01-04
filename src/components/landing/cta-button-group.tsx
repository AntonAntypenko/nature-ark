import type { FC } from "react";

import Link from "next/link";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui";

type CtaButtonGroupProps = {
  size?: "sm" | "lg";
  className?: string;
};

export const CtaButtonGroup: FC<CtaButtonGroupProps> = ({
  size = "lg",
  className,
}) => {
  const t = useTranslations("landingSections.ctaButton");

  return (
    <div className={`${className}`}>
      <Button size={size} className="cursor-pointer" asChild>
        <Link href="/dashboard">{t("primary")}</Link>
      </Button>
      <Button size={size} variant="outline" className="cursor-pointer" asChild>
        <a
          href="https://github.com/AntonAntypenko/nature-ark"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("github")}
        </a>
      </Button>
    </div>
  );
};
