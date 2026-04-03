import {
  Bell,
  CalendarCheck2,
  Globe,
  Home,
  Info,
  Instagram,
  Link2,
  Mail,
  Newspaper,
  Phone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SiteNavigationItem = {
  key: "home" | "posts" | "calendar" | "about" | "links";
  href: string;
  icon: LucideIcon;
};

export type SiteActionItem = {
  key: "notifications" | "website" | "instagram" | "email" | "phone";
  label: string;
  href?: string;
  icon: LucideIcon;
};

export const siteConfig = {
  name: "KOB Choceň",
  shortName: "CHC",
  title: "CHC orientační běh",
  description: "Oficiální web orientačního běžeckého klubu KOB Choceň.",
  contact: {
    email: "info@kobchocen.cz",
    phone: "+420 123 456 789",
    phoneHref: "tel:+420123456789",
    website: "https://kobchocen.cz",
    instagram: "https://www.instagram.com/kobchocen",
  },
} as const;

export const siteNavigation: SiteNavigationItem[] = [
  { key: "home", href: "/", icon: Home },
  { key: "posts", href: "/posts", icon: Newspaper },
  { key: "calendar", href: "/calendar", icon: CalendarCheck2 },
  { key: "about", href: "/about", icon: Info },
  { key: "links", href: "/links", icon: Link2 },
];

export const siteHeaderActions: SiteActionItem[] = [
  { key: "notifications", label: "notifications", icon: Bell },
];

export const siteSocialLinks: SiteActionItem[] = [
  { key: "website", label: "kobchocen.cz", href: siteConfig.contact.website, icon: Globe },
  {
    key: "instagram",
    label: "@kobchocen",
    href: siteConfig.contact.instagram,
    icon: Instagram,
  },
  {
    key: "email",
    label: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
    icon: Mail,
  },
  {
    key: "phone",
    label: siteConfig.contact.phone,
    href: siteConfig.contact.phoneHref,
    icon: Phone,
  },
];
