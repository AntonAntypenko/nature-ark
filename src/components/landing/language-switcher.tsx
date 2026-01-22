"use client";

import type { FC } from "react";
import { useEffect, useState } from "react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { Globe } from "lucide-react";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
} from "@/components/ui";

const LOCALES = [
  { value: "uk", label: "UK" },
  { value: "en", label: "EN" },
];

type LanguageSwitcherProps = {
  className?: string;
  size?: "sm" | "default";
};

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({
  className,
  size = "default",
}) => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
      router.refresh();
    }
  };

  const triggerClasses = size === "sm" ? "w-[100px] h-8" : "w-[120px]";

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <Skeleton className={cn(triggerClasses, className)} />;

  return (
    <div className={cn("inline-flex items-center", className)}>
      <Select value={locale} onValueChange={e => switchLocale(e)}>
        <SelectTrigger className={triggerClasses} size="sm">
          <Globe className="h-4 w-4" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {LOCALES.map(locale => (
            <SelectItem key={locale.value} value={locale.value}>
              {locale.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
