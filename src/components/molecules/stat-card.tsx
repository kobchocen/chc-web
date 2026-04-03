import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  value: string;
  label: string;
  className?: string;
};

export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <Card className={cn("surface-subtle px-4 py-5 text-center", className)}>
      <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">{label}</p>
    </Card>
  );
}
