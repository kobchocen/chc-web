import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

import { SectionLabel } from "@/components/atoms/section-label";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils";

type PageHeadingProps = {
  title: string;
  description?: ReactNode;
  eyebrow?: string;
  backHref?: string;
  backLabel?: string;
  actions?: ReactNode;
  className?: string;
};

export function PageHeading({
  title,
  description,
  eyebrow,
  backHref,
  backLabel,
  actions,
  className,
}: PageHeadingProps) {
  return (
    <header className={cn("surface-panel overflow-hidden", className)}>
      <div className="border-b border-border/60 px-5 py-4 sm:px-6 sm:py-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {backHref ? (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="surface-subtle h-10 rounded-full border-border/70 px-4 text-sm font-medium"
              >
                <Link href={backHref}>
                  <ArrowLeft className="h-4 w-4" />
                  <span>{backLabel ?? title}</span>
                </Link>
              </Button>
            ) : null}
            {eyebrow ? <SectionLabel>{eyebrow}</SectionLabel> : null}
          </div>
          {actions ? (
            <div className="flex w-full flex-wrap items-center gap-2 lg:w-auto lg:justify-end">
              {actions}
            </div>
          ) : null}
        </div>
      </div>

      <div className="space-y-3 px-5 py-5 sm:px-6 sm:py-6">
        <h1 className="max-w-4xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <div className="max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
            {description}
          </div>
        ) : null}
      </div>
    </header>
  );
}
