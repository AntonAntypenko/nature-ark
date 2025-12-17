"use client";

import Link from "next/link";
import { FC, useState } from "react";

import { Menu, Squirrel } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  Button,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui";
import { CtaButtonGroup } from "@/components/landing";

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

  const [isOpen, setIsOpen] = useState(false);

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

        <CtaButtonGroup
          size="sm"
          className="hidden items-end space-x-4 md:flex"
        />

        <div className="block md:hidden">
          <div className="flex items-center justify-between">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="h-screen">
                <SheetHeader>
                  <SheetTitle>
                    <a
                      href="#hero"
                      className="flex items-center space-x-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <Squirrel className="text-primary h-8 w-8" />
                      <span className="text-xl font-bold tracking-tight">
                        NatureArk
                      </span>
                    </a>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6 text-center">
                  {NAV_LINKS.map(item => (
                    <Link
                      key={t(`${item.key}`)}
                      href={item.href}
                      className="hover:bg-muted/50 rounded-md p-3 text-lg font-medium transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {t(`${item.key}`)}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
