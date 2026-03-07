"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { User } from "@/lib/generated/prisma/client";
import {
  Bell,
  CircleUserRound,
  LogOut,
  MoreVertical,
  Palette,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { FormUserEdit } from "../../FormUserEdit/FormUserEdit";
import { useTheme } from "next-themes";

export function NavUser({ user }: { user: User }) {
  const { isMobile } = useSidebar();
  const { setTheme } = useTheme();

  return (
    <Dialog>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg grayscale">
                  <AvatarImage
                    src={user.profileImage || ""}
                    alt={user.name || "Foto de perfil"}
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.username}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
                <MoreVertical />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={user.profileImage || ""}
                      alt={user.name || "Foto de perfil"}
                    />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {user.username}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DialogTrigger asChild>
                  <DropdownMenuItem>
                    <CircleUserRound />
                    Account
                  </DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Palette />
                    Theme
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem
                        onClick={() => {
                          setTheme("light");
                        }}
                      >
                        Light
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setTheme("dark");
                        }}
                      >
                        Dark
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setTheme("system");
                        }}
                      >
                        System
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  <Bell />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  signOut();
                }}
              >
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <DialogContent>
        <DialogHeader className="flex flex-col gap-1.5 border-b border-border pb-4">
          <DialogTitle className="text-lg font-semibold text-foreground m-0">
            Edit
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mb-2">
            Update your personal details.
          </DialogDescription>
        </DialogHeader>
        <FormUserEdit user={user} />
      </DialogContent>
    </Dialog>
  );
}
