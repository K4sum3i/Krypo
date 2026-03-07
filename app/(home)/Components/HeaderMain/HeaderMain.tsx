"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { dataHeaderMain } from "./HeaderMain.data";
import { useState } from "react";
import { FormAddElement } from "../FormAddElement";
import { HeaderMainProps } from "./HeaderMain.types";
import { Separator } from "@/components/ui/separator";

export function HeaderMain(props: HeaderMainProps) {
  const { userId } = props;

  const [typeElement, setTypeElement] = useState<"password" | "folder" | "">();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const closeDialogAndDropdown = () => {
    setOpenDialog(false);
    setOpenDropdown(false);
  };

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Dashboard</h1>
        <div className="ml-auto flex items-center gap-2">
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="default"
                  size="sm"
                  className="shrink-0 items-center justify-center text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5 hidden h-7 sm:flex"
                >
                  New
                  <div className="w-4 h-4 flex items-center justify-center">
                    <ChevronRight
                      className={`w-4 h-4 transition-all duration-200 transform ${openDropdown ? "rotate-90" : ""}`}
                    />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-full">
                <DropdownMenuLabel>
                  <DialogTrigger asChild>
                    <div className="flex flex-col">
                      {dataHeaderMain.map(
                        ({ icon: Icon, typeElement, text }) => (
                          <Button
                            key={typeElement}
                            variant="ghost"
                            className="justify-start"
                            onClick={() => {
                              setTypeElement(typeElement);
                            }}
                          >
                            <Icon className="w-4 h-4 mr-2" />
                            {text}
                          </Button>
                        ),
                      )}
                    </div>
                  </DialogTrigger>
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
              <DialogHeader className="pb-6 flex flex-start justify-between border-b border-border">
                <DialogTitle className="text-lg font-semibold m-0 text-card-foreground">
                  New Password
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground m-0">
                  Securely store a new credential in your vault.
                </DialogDescription>
              </DialogHeader>
              {typeElement === "password" && (
                <FormAddElement
                  userId={userId}
                  closeDialog={closeDialogAndDropdown}
                />
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
