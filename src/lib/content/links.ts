import {
  CalendarDays,
  ExternalLink,
  FileText,
  FolderKanban,
  FolderLock,
  FolderOpenDot,
  Globe,
  MapPinned,
  Shirt,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { siteConfig } from "@/config/site";

export type ResourceItemConfig = {
  key: string;
  href: string;
  icon?: LucideIcon;
  actionIcon?: LucideIcon;
  kind?: "internal" | "external";
};

export type ResourceSectionConfig = {
  key: string;
  icon: LucideIcon;
  tone: "primary" | "emerald" | "rose" | "sky";
  items: ResourceItemConfig[];
};

export const resourceSections: ResourceSectionConfig[] = [
  {
    key: "systems",
    icon: Target,
    tone: "primary",
    items: [
      { key: "oris", href: "https://oris.orientacnisporty.cz", icon: Target },
      { key: "obo", href: "https://www.vco-ob.cz", icon: FolderOpenDot },
    ],
  },
  {
    key: "documents",
    icon: FileText,
    tone: "emerald",
    items: [
      { key: "csos", href: "https://www.orientacnisporty.cz", icon: Globe },
      {
        key: "rules",
        href: "https://www.orientacnisporty.cz/orientacni-beh/dokumenty-ob/",
        icon: ShieldCheck,
      },
      {
        key: "guidelines",
        href: "https://www.orientacnisporty.cz/orientacni-beh/dokumenty-ob/",
        icon: FileText,
      },
    ],
  },
  {
    key: "club",
    icon: Users,
    tone: "rose",
    items: [
      { key: "trainings", href: "/calendar", icon: CalendarDays, kind: "internal" },
      { key: "docs", href: "/posts", icon: FolderKanban, actionIcon: FolderLock, kind: "internal" },
      {
        key: "apparel",
        href: `mailto:${siteConfig.contact.email}?subject=Klubov%C3%A9%20oble%C4%8Den%C3%AD`,
        icon: Shirt,
      },
    ],
  },
  {
    key: "maps",
    icon: MapPinned,
    tone: "sky",
    items: [{ key: "archive", href: "https://mapy.orientacnisporty.cz", icon: MapPinned }],
  },
];

export const defaultResourceActionIcon = ExternalLink;
