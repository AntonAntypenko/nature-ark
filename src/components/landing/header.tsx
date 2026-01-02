import type { FC } from "react";

import { Squirrel } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui";
import { LanguageSwitcher, MobileMenu } from "@/components/landing";

type Link = {
  key: string;
  href: string;
};

const NAV_LINKS: Link[] = [
  { key: "features", href: "#features" },
  { key: "tech", href: "#tech" },
  { key: "faq", href: "#faq" },
  { key: "contact", href: "#contact" },
];

export const Header: FC = () => {
  const t = useTranslations("landingSections.header");

  return (
    <header className="bg-background/95 sticky top-0 z-50 w-full border-b shadow-sm backdrop-blur-sm">
      <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#hero" className="flex items-center space-x-2">
          <Squirrel className="text-primary h-8 w-8" />
          <span className="text-xl font-bold tracking-tight">NatureArk</span>
        </a>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {NAV_LINKS.map(item => (
              <NavigationMenuItem key={t(`${item.key}`)}>
                <NavigationMenuLink
                  href={item.href}
                  className={navigationMenuTriggerStyle()}
                >
                  {t(`${item.key}`)}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <LanguageSwitcher size="sm" className="hidden md:flex" />

        <MobileMenu navLinks={NAV_LINKS} />
      </div>
    </header>
  );
};
