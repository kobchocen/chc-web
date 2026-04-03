import type { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

import { InfoCard } from "@/components/molecules/info-card";
import { SectionHeading } from "@/components/molecules/section-heading";
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
      <SectionHeading title={title} />
      <div className="grid gap-4">
        {supporters.map((supporter) => (
          <InfoCard
            key={supporter.label}
            icon={supporter.icon}
            title={supporter.label}
            description={supporter.description}
            className="min-h-[12rem]"
          />
        ))}
      </div>
    </section>
  );
}
