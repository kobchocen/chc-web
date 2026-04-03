import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageTemplateProps = {
  heading?: ReactNode;
  lead?: ReactNode;
  main: ReactNode;
  aside?: ReactNode;
  after?: ReactNode;
  floatingAction?: ReactNode;
  className?: string;
  mainClassName?: string;
  asideClassName?: string;
  gridClassName?: string;
};

export function PageTemplate({
  heading,
  lead,
  main,
  aside,
  after,
  floatingAction,
  className,
  mainClassName,
  asideClassName,
  gridClassName,
}: PageTemplateProps) {
  const hasAside = Boolean(aside);

  return (
    <div className={cn("page-stack", className)}>
      {heading}
      {lead}

      <div
        className={cn(
          "grid gap-6 xl:gap-8",
          hasAside ? "lg:grid-cols-[minmax(0,1fr)_minmax(320px,24rem)]" : "grid-cols-1",
          gridClassName,
        )}
      >
        <div className={cn("page-stack min-w-0", mainClassName)}>{main}</div>
        {hasAside ? <aside className={cn("page-stack", asideClassName)}>{aside}</aside> : null}
      </div>

      {after}
      {floatingAction}
    </div>
  );
}
