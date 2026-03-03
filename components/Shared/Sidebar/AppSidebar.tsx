"use client";
import {
  Trash,
  ShieldCheck,
  LayoutDashboard,
  FolderKey,
  CreditCard,
  Mail,
  Key,
} from "lucide-react";

import { NavMain, NavUser } from "@/components/Shared/Sidebar/components";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Passwords",
      url: "/passwords",
      icon: FolderKey,
      items: [
        {
          title: "Logins",
          url: "/passwords/logins",
          icon: Key,
        },
        {
          title: "eMails",
          url: "/passwords/emails",
          icon: Mail,
        },
        {
          title: "HomeBanking",
          url: "/passwords/homebanking",
          icon: CreditCard,
        },
      ],
    },
  ],
};

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user: React.ComponentProps<typeof NavUser>["user"];
};

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <ShieldCheck className="size-5!" />
                <span className="text-base font-semibold">Krypo</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
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
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
