"use client";

import Link from "next/link";
import { FC } from "react";

import { MountainIcon } from "lucide-react";

import {
  Button,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui";

const NAV_LINKS = [
  { title: "Можливості", href: "#features" },
  { title: "Технології", href: "#tech" },
  { title: "FAQ", href: "#faq" },
];

export const Header: FC = () => {
  return (
    <header className="bg-background/95 sticky top-0 z-50 w-full border-b shadow-sm backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <MountainIcon className="text-primary h-6 w-6" />
          <span className="text-xl font-bold tracking-tight">NatureArk</span>
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {NAV_LINKS.map(item => (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuLink
                  href={item.href}
                  className={navigationMenuTriggerStyle()}
                >
                  {item.title}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center space-x-4">
          <Button size="sm" className="cursor-pointer" asChild>
            <Link href="/dashboard" passHref>
              Розпочати
            </Link>
          </Button>
          <Button size="sm" variant="outline" className="cursor-pointer">
            <a
              href="https://github.com/AntonAntypenko/nature-ark"
              target="_blank"
              rel="noopener noreferrer"
            >
              Відкрити GitHub
            </a>
          </Button>
        </div>

        {/* TODO: Тут має бути реалізована Mobile Hamburger Menu (для мобільної версії) */}
      </div>
    </header>
  );
};
