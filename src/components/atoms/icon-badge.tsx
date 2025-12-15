import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type IconBadgeProps = {
  icon: LucideIcon;
  variant?: "primary" | "muted";
  className?: string;
};

export function IconBadge({ icon: Icon, variant = "muted", className }: IconBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-2xl border",
        variant === "primary"
          ? "border-primary/40 bg-primary/10 text-primary"
          : "border-border bg-card/70 text-foreground",
        className,
      )}
    >
      <Icon className="h-5 w-5" strokeWidth={2} />
    </span>
  );
}
