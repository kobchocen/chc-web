import { LucideIcon } from "lucide-react";

import { Link } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils";

type NavItemProps = {
  label: string;
  icon: LucideIcon;
  href: string;
  active?: boolean;
};

export function NavItem({ label, icon: Icon, href, active }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex w-16 flex-col items-center gap-1 rounded-xl px-2 py-1 text-xs font-medium transition-colors",
        active ? "text-primary" : "text-muted-foreground hover:text-foreground",
      )}
    >
      <Icon className={cn("h-6 w-6", active ? "fill-primary" : undefined)} />
      <span className="text-[11px]">{label}</span>
    </Link>
  );
}
