import { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavItemProps = {
  label: string;
  icon: LucideIcon;
  active?: boolean;
};

export function NavItem({ label, icon: Icon, active }: NavItemProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={cn(
        "flex w-16 flex-col items-center gap-1 rounded-xl px-2 text-xs font-medium",
        active ? "text-primary" : "text-muted-foreground hover:text-foreground",
      )}
    >
      <Icon className={cn("h-6 w-6", active ? "fill-primary" : undefined)} />
      <span className="text-[11px]">{label}</span>
    </Button>
  );
}
