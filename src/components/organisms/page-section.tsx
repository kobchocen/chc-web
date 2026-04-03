import type { ReactNode } from "react";

import { SectionHeading } from "@/components/molecules/section-heading";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type PageSectionProps = {
  title: string;
  eyebrow?: string;
  description?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  surface?: "default" | "subtle" | "none";
};

export function PageSection({
  title,
  eyebrow,
  description,
  action,
  children,
  className,
  contentClassName,
  surface = "none",
}: PageSectionProps) {
  const content =
    surface === "none" ? (
      children
    ) : (
      <Card
        className={cn(surface === "default" ? "surface-panel" : "surface-subtle", contentClassName)}
      >
        {children}
      </Card>
    );

  return (
    <section className={cn("space-y-4", className)}>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} action={action} />
      {content}
    </section>
  );
}
