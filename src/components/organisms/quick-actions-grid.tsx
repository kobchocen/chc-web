import { LucideIcon } from "lucide-react";

import { SectionHeading } from "@/components/molecules/section-heading";
import { QuickActionCard } from "@/components/molecules/quick-action-card";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type QuickAction = {
  title: string;
  icon: LucideIcon;
  href?: string;
  description?: string;
};

type QuickActionsGridProps = {
  actions: QuickAction[];
  title: string;
  className?: string;
};

export function QuickActionsGrid({ actions, title, className }: QuickActionsGridProps) {
  return (
    <section className={cn("space-y-3", className)}>
      <SectionHeading title={title} />
      <Card className="surface-panel p-4 sm:p-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {actions.map((action) => (
            <QuickActionCard
              key={action.title}
              title={action.title}
              icon={action.icon}
              href={action.href}
              description={action.description}
            />
          ))}
        </div>
      </Card>
    </section>
  );
}
