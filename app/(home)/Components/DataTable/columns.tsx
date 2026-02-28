"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Element } from "@/lib/generated/prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import { sileo } from "sileo";

export type ColumnProps = Element;

export const columns: ColumnDef<ColumnProps>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "directory",
    header: "Directory",
  },
  {
    accessorKey: "urlWebsite",
    header: "URL",
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      const password = row.original.password;
      const username = row.original.username;
      const urlWebsite = row.original.urlWebsite;

      const onEditElement = () => {
        console.log("Editing element");
      };

      const copyItemClipboard = (item: string, name: string) => {
        navigator.clipboard.writeText(item);
        sileo.success({
          title: `${name} copied`,
        });
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon">
              <MoreVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem>
              {username && (
                <span onClick={() => copyItemClipboard(username, "Username")}>
                  Copy Username
                </span>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem>
              {password && (
                <span onClick={() => copyItemClipboard(password, "Password")}>
                  Copy Password
                </span>
              )}
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>URL(s)</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Link href={urlWebsite || "#"} target="_blank">
                      Open
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {urlWebsite && (
                      <span
                        onClick={() => copyItemClipboard(urlWebsite, "Url")}
                      >
                        Copy
                      </span>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit Entry</DropdownMenuItem>
            <DropdownMenuItem>Delete Entry</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
