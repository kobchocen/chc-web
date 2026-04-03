import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { SectionLabel } from "@/components/atoms/section-label";
import { Link } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils";

const toneStyles = {
  primary: "bg-primary/10 text-primary",
  emerald: "bg-emerald-500/10 text-emerald-500",
  rose: "bg-rose-500/10 text-rose-500",
  sky: "bg-sky-500/10 text-sky-500",
  muted: "bg-muted text-foreground",
} as const;

type ActionListItemProps = {
  href: string;
  title: string;
  description?: ReactNode;
  label?: string;
  icon: LucideIcon;
  actionIcon?: LucideIcon;
  tone?: keyof typeof toneStyles;
  linkKind?: "internal" | "external";
  className?: string;
};

export function ActionListItem({
  href,
  title,
  description,
  label,
  icon: Icon,
  actionIcon: ActionIcon = ArrowUpRight,
  tone = "muted",
  linkKind = "external",
  className,
}: ActionListItemProps) {
  const classes = cn(
    "group flex items-center gap-4 rounded-2xl border border-border/70 px-4 py-4 transition-colors hover:bg-accent/30 hover:border-primary/35",
    className,
  );

  const content = (
    <>
      <div
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
          toneStyles[tone],
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1 space-y-1">
        {label ? <SectionLabel className="text-muted-foreground">{label}</SectionLabel> : null}
        <p className="truncate text-sm font-semibold text-foreground sm:text-base">{title}</p>
        {description ? <div className="text-sm text-muted-foreground">{description}</div> : null}
      </div>
      <ActionIcon className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </>
  );

  if (linkKind === "internal") {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className={classes}
    >
      {content}
    </a>
  );
}
