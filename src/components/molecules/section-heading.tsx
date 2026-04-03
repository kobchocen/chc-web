import type { ReactNode } from "react";

import { SectionLabel } from "@/components/atoms/section-label";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-wrap items-start justify-between gap-4", className)}>
      <div className="max-w-3xl space-y-2">
        {eyebrow ? <SectionLabel>{eyebrow}</SectionLabel> : null}
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
        {description ? <div className="text-sm text-muted-foreground">{description}</div> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
