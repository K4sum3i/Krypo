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
import { ChevronDown, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { dataHeaderMain } from "./HeaderMain.data";
import { useState } from "react";
import { FormAddElement } from "../FormAddElement";
import { Toaster } from "sileo";

export function HeaderMain() {
  const [typeElement, setTypeElement] = useState<"password" | "folder" | "">();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const closeDialogAndDropdown = () => {
    setOpenDialog(false);
    setOpenDropdown(false);
  };

  return (
    <header className="mb-8 h-18 px-8 flex items-center justify-between border-b border-border">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="w-8 h-8 rounded-md flex items-center justify-center text-foreground border border-border bg-background" />
        <div className="relative w-80">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search passwords..."
            className="pl-9 bg-input/50 border-transparent shadow-none"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
            <DropdownMenuTrigger asChild>
              <Button className="px-2.5 px-4 rounded-md text-sm font-medium flex items-center gap-2 cursor-pointer">
                New
                <div className="w-4 h-4 flex items-center justify-center">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-full">
              <DropdownMenuLabel>
                <DialogTrigger asChild>
                  <div className="flex flex-col">
                    {dataHeaderMain.map(({ icon: Icon, typeElement, text }) => (
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
                    ))}
                  </div>
                </DialogTrigger>
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold m-0 text-card-foreground">
                New Password
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground m-0">
                Securely store a new credential in your vault.
              </DialogDescription>
            </DialogHeader>
            {typeElement === "password" && <FormAddElement />}
          </DialogContent>
        </Dialog>
        <Avatar className="h-8 w-8 rounded-lg cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
          <AvatarFallback className="rounded-lg">CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
