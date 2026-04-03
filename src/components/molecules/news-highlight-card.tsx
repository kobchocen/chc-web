import Image from "next/image";
import { LucideIcon } from "lucide-react";

import { IconBadge } from "@/components/atoms/icon-badge";
import { SectionLabel } from "@/components/atoms/section-label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type NewsHighlightCardProps = {
  title: string;
  description: string;
  date: string;
  badge?: string;
  imageAlt: string;
  imageUrl: string;
  ctaLabel: string;
  icon: LucideIcon;
  sectionLabel: string;
  className?: string;
};

export function NewsHighlightCard({
  title,
  description,
  date,
  badge,
  imageAlt,
  imageUrl,
  ctaLabel,
  icon,
  sectionLabel,
  className,
}: NewsHighlightCardProps) {
  return (
    <Card
      className={cn(
        "surface-panel group relative overflow-hidden transition-transform hover:-translate-y-1",
        className,
      )}
    >
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          alt={imageAlt}
          src={imageUrl}
          fill
          priority
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(min-width: 1024px) 640px, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
        {badge ? (
          <Badge
            variant="default"
            className="absolute left-3 top-3 border-none px-3 py-1 text-[11px]"
          >
            {badge}
          </Badge>
        ) : null}
      </div>
      <CardContent className="relative z-10 flex grow flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <SectionLabel className="text-primary">{sectionLabel}</SectionLabel>
          <span className="text-xs font-medium text-muted-foreground">{date}</span>
        </div>
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground/90">{description}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="text-xs font-medium text-muted-foreground">{date}</div>
          <Button type="button" className="px-4" variant="default" size="sm">
            {ctaLabel}
            <IconBadge icon={icon} variant="primary" className="h-9 w-9 rounded-xl" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
