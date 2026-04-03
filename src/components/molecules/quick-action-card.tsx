import { LucideIcon } from "lucide-react";

import { IconBadge } from "@/components/atoms/icon-badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils";

type QuickActionCardProps = {
  title: string;
  icon: LucideIcon;
  href?: string;
  description?: string;
  className?: string;
};

export function QuickActionCard({
  title,
  icon,
  href,
  description,
  className,
}: QuickActionCardProps) {
  const content = (
    <>
      <IconBadge icon={icon} />
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {description ? <p className="text-xs text-muted-foreground">{description}</p> : null}
      </div>
    </>
  );

  return href ? (
    <Button
      variant="secondary"
      className={cn(
        "group h-auto w-full flex-col items-start gap-4 rounded-2xl px-4 py-4 text-left",
        className,
      )}
      asChild
    >
      <Link href={href}>{content}</Link>
    </Button>
  ) : (
    <Button
      type="button"
      variant="secondary"
      className={cn(
        "group h-auto w-full flex-col items-start gap-4 rounded-2xl px-4 py-4 text-left",
        className,
      )}
    >
      {content}
    </Button>
  );
}
