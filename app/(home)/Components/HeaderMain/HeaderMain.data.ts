import { KeyRound, Folder } from "lucide-react";
import { DataHeaderMainItemProps } from "./HeaderMain.types";

export const dataHeaderMain: DataHeaderMainItemProps[] = [
  {
    icon: KeyRound,
    text: "New Password",
    typeElement: "password",
  },
  {
    icon: Folder,
    text: "New Folder",
    typeElement: "folder",
  },
];
