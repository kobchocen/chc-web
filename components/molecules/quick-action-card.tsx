import { LucideIcon } from "lucide-react";

import { IconBadge } from "@/components/atoms/icon-badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type QuickActionCardProps = {
  title: string;
  icon: LucideIcon;
  className?: string;
};

export function QuickActionCard({ title, icon, className }: QuickActionCardProps) {
  return (
    <Button
      type="button"
      variant="secondary"
      className={cn(
        "group h-32 w-full flex-col justify-between rounded-2xl border border-border bg-card/80 p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-accent",
        className,
      )}
    >
      <IconBadge
        icon={icon}
        className="transition-colors group-hover:border-primary/40 group-hover:text-primary"
      />
      <h3 className="text-sm font-semibold text-foreground group-hover:text-primary">{title}</h3>
    </Button>
  );
}
