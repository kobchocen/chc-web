import type { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Supporter = {
  icon: LucideIcon;
  label: string;
  description: ReactNode;
};

type PartnersSectionProps = {
  title: string;
  supporters: Supporter[];
  className?: string;
};

export function PartnersSection({ title, supporters, className }: PartnersSectionProps) {
  return (
    <section className={cn("space-y-4", className)}>
      <div className="px-1">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {title}
        </h3>
      </div>
      <div className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-2xl">
        {supporters.map((supporter, index) => (
          <div key={supporter.label}>
            <div className="flex gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <supporter.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-wide text-foreground">
                  {supporter.label}
                </p>
                <div className="text-sm leading-relaxed text-muted-foreground">
                  {supporter.description}
                </div>
              </div>
            </div>
            {index < supporters.length - 1 ? (
              <div className="my-6 h-px w-full bg-border/60" />
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
