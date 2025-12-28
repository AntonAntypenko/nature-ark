import { ReactNode } from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui";
import { AppSidebar, SiteHeader } from "@/components/blocks";

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div>{children}</div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
