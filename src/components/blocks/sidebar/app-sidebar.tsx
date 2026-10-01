"use client";

import { ComponentProps } from "react";

import {
  Command,
  LayoutDashboard,
  Package,
  PawPrint,
  ReceiptText,
  Settings2,
} from "lucide-react";

import { NavMain, NavUser } from "./";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui";

const data = {
  user: {
    name: "System Admin",
    email: "admin@natureark.zoo",
    avatar: "",
  },
  navMain: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Zoo Management",
      url: "/dashboard/animals",
      icon: PawPrint,
      items: [
        {
          title: "Animals Catalog",
          url: "/dashboard/animals",
        },
        {
          title: "Enclosures & Sectors",
          url: "/dashboard/enclosures",
        },
        {
          title: "Diet Norms",
          url: "/dashboard/diets",
        },
      ],
    },
    {
      title: "Finance & AI",
      url: "/dashboard/expenses",
      icon: ReceiptText,
      items: [
        {
          title: "Expenses & AI OCR",
          url: "/dashboard/expenses",
        },
        {
          title: "AI Budget Forecast",
          url: "/dashboard/analytics",
        },
      ],
    },
    {
      title: "Warehouse",
      url: "/dashboard/inventory",
      icon: Package,
      items: [
        {
          title: "Inventory",
          url: "/dashboard/inventory",
        },
      ],
    },
    {
      title: "System",
      url: "/dashboard/settings",
      icon: Settings2,
      items: [
        {
          title: "Users & Roles",
          url: "/dashboard/users",
        },
        {
          title: "Settings",
          url: "/dashboard/settings",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Nature Ark</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
