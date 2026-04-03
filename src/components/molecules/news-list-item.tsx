import Image from "next/image";

import { SectionLabel } from "@/components/atoms/section-label";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type NewsListItemProps = {
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  className?: string;
};

export function NewsListItem({
  category,
  title,
  description,
  imageUrl,
  imageAlt,
  className,
}: NewsListItemProps) {
  return (
    <Card
      className={cn(
        "surface-subtle group flex cursor-pointer gap-4 p-3 transition-colors hover:border-primary/40 hover:bg-accent",
        className,
      )}
    >
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-border">
        <Image
          alt={imageAlt}
          src={imageUrl}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-2 py-1">
        <SectionLabel className="text-primary/90">{category}</SectionLabel>
        <h3 className="text-base font-semibold text-foreground transition-colors group-hover:text-primary">
          {title}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{description}</p>
      </div>
    </Card>
  );
}
