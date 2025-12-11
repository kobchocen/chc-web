import { QuickActionCard } from "@/components/molecules/quick-action-card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type QuickAction = {
  title: string;
  icon: LucideIcon;
};

type QuickActionsGridProps = {
  actions: QuickAction[];
  title: string;
  className?: string;
};

export function QuickActionsGrid({ actions, title, className }: QuickActionsGridProps) {
  return (
    <section className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between px-1">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {actions.map((action) => (
          <QuickActionCard key={action.title} title={action.title} icon={action.icon} />
        ))}
      </div>
    </section>
  );
}
