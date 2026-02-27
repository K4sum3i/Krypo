"use client";
import { Home, Key, ChartPie, Settings, Trash } from "lucide-react";

import { NavMain } from "@/components/Shared/Sidebar/components";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";

const data = {
  user: {
    name: "Manuel",
    email: "[EMAIL_ADDRESS]",
    avatar: "https://github.com/shadcn.png",
  },
  navMain: [
    {
      title: "Passwords",
      url: "/passwords",
      icon: Key,
      items: [
        {
          title: "Logins",
          url: "/passwords/logins",
        },
        {
          title: "eMails",
          url: "/passwords/emails",
        },
        {
          title: "HomeBanking",
          url: "/passwords/homebanking",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/">
                  <Home />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <NavMain items={data.navMain} />
        <SidebarGroup>
          <SidebarGroupLabel>SYSTEM</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/recycle-bin">
                  <Trash />
                  <span>Recycle Bin</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      <SidebarRail />
    </Sidebar>
  );
}
