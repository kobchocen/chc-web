import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { SectionLabel } from "@/components/atoms/section-label";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const accentStyles = {
  primary: "bg-primary/10 text-primary",
  emerald: "bg-emerald-500/10 text-emerald-500",
  rose: "bg-rose-500/10 text-rose-500",
  sky: "bg-sky-500/10 text-sky-500",
  amber: "bg-amber-500/10 text-amber-500",
} as const;

type InfoCardProps = {
  title: string;
  description?: ReactNode;
  eyebrow?: string;
  icon?: LucideIcon;
  media?: ReactNode;
  footer?: ReactNode;
  accent?: keyof typeof accentStyles;
  align?: "left" | "center";
  className?: string;
};

export function InfoCard({
  title,
  description,
  eyebrow,
  icon: Icon,
  media,
  footer,
  accent = "primary",
  align = "left",
  className,
}: InfoCardProps) {
  return (
    <Card
      className={cn(
        "surface-panel flex h-full flex-col gap-4 px-5 py-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {media}
      {Icon ? (
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-2xl",
            accentStyles[accent],
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      ) : null}
      <div className={cn("space-y-2", align === "center" && "text-center")}>
        {eyebrow ? <SectionLabel>{eyebrow}</SectionLabel> : null}
        <h3 className="text-lg font-semibold tracking-tight text-foreground">{title}</h3>
        {description ? (
          <div className="text-sm leading-6 text-muted-foreground">{description}</div>
        ) : null}
      </div>
      {footer ? <div className="mt-auto">{footer}</div> : null}
    </Card>
  );
}
