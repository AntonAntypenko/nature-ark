"use client";

import Link from "next/link";
import { FC, useState } from "react";

import { useTranslations } from "next-intl";

import { LanguageSwitcher } from "@/components/landing";
import {
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui";
import { Menu, Squirrel } from "lucide-react";

type Link = {
  key: string;
  href: string;
};

export const MobileMenu: FC<{ navLinks: Link[] }> = ({ navLinks }) => {
  const t = useTranslations("landingSections.header");

  const [isOpen, setIsOpen] = useState(false);

  return (
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
              <SheetTitle className="flex space-x-4">
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

                <LanguageSwitcher />
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-6 text-center">
              {navLinks.map(item => (
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
  );
};
