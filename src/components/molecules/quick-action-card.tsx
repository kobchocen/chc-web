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
      className={cn("group h-auto w-full flex-col items-start gap-4 text-left", className)}
    >
      <IconBadge icon={icon} />
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
    </Button>
  );
}
