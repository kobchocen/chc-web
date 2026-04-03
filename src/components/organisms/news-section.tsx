import { LucideIcon } from "lucide-react";

import { NewsHighlightCard } from "@/components/molecules/news-highlight-card";
import { NewsListItem } from "@/components/molecules/news-list-item";
import { SectionHeading } from "@/components/molecules/section-heading";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils";

type Highlight = {
  title: string;
  description: string;
  date: string;
  badge?: string;
  imageUrl: string;
  imageAlt: string;
  ctaLabel: string;
  icon: LucideIcon;
};

type NewsItem = {
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
};

type NewsSectionProps = {
  title: string;
  viewAllLabel: string;
  viewAllHref?: string;
  highlightLabel: string;
  highlight: Highlight;
  items: NewsItem[];
  className?: string;
};

export function NewsSection({
  title,
  viewAllLabel,
  highlightLabel,
  highlight,
  items,
  viewAllHref,
  className,
}: NewsSectionProps) {
  const action = viewAllHref ? (
    <Button variant="link" className="px-0 text-primary" size="sm" asChild>
      <Link href={viewAllHref}>{viewAllLabel}</Link>
    </Button>
  ) : (
    <Button variant="link" className="px-0 text-primary" size="sm">
      {viewAllLabel}
    </Button>
  );

  return (
    <section className={cn("space-y-4", className)}>
      <SectionHeading title={title} action={action} />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr),minmax(320px,1fr)]">
        <NewsHighlightCard {...highlight} sectionLabel={highlightLabel} />
        <div className="space-y-3">
          {items.map((item) => (
            <NewsListItem key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
