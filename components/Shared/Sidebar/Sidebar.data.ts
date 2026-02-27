import { Landmark, LayoutList, Lock, Settings, UserPen } from "lucide-react";

export const dataSidebarElements = [
  {
    title: "Elements",
    url: "#",
    icon: LayoutList,
    isActive: true,
    items: [
      {
        item: "Favourites",
        href: "/favourites",
      },
      {
        item: "Logins",
        href: "/logins-elements",
      },
      {
        item: "Credit Card",
        href: "/credit-card",
      },
    ],
  },
];

export const dataSidebarConfiguration = [
  {
    title: "Configuration",
    icon: Settings,
    Children: [
      {
        item: "Profile",
        href: "/profile",
        icon: UserPen,
        premium: false,
      },
      {
        item: "Security",
        href: "#",
        icon: Lock,
        premium: true,
      },
      {
        item: "Suscription",
        href: "#",
        icon: Landmark,
        premium: true,
      },
    ],
  },
];
