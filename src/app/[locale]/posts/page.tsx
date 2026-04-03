import Image from "next/image";
import { Search, Timer } from "lucide-react";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { PageHeading } from "@/components/molecules/page-heading";
import { PostsFeed } from "@/components/organisms/posts-feed";
import { PageTemplate } from "@/components/templates";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { getMockPostEntries, postImages, postSlugs, postsPageConfig } from "@/lib/content/posts";
import { isLocale } from "@/lib/i18n/config";
import { Link } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils";

type PageParams = { locale: string };

type PageProps = {
  params: Promise<PageParams>;
};

export default async function PostsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "posts" });

  const filters = [
    { key: "all", label: t("filters.all"), active: true },
    { key: "races", label: t("filters.races") },
    { key: "trainings", label: t("filters.trainings") },
    { key: "club", label: t("filters.club") },
    { key: "camps", label: t("filters.camps") },
  ];

  const hero = {
    badge: t("hero.badge"),
    category: t("hero.category"),
    title: t("hero.title"),
    description: t("hero.description"),
    date: t("hero.date"),
    cta: t("hero.cta"),
    imageAlt: t("hero.imageAlt"),
  };

  const listItems = t.raw("list.items") as Record<
    keyof typeof postImages,
    { category: string; title: string; description: string; date: string }
  >;
  const basePostEntries = getMockPostEntries();
  const allPosts = basePostEntries.map((entry) => {
    const baseContent = listItems[entry.key];

    return {
      key: entry.key,
      slug: entry.slug,
      category: baseContent.category,
      title: entry.cycle === 0 ? baseContent.title : `${baseContent.title} (${entry.cycle + 1})`,
      description: baseContent.description,
      date: baseContent.date,
      imageUrl: postImages[entry.key],
    };
  });

  const paginationStatusTemplate = t("pagination.status", {
    current: "{current}",
    total: "{total}",
  });

  return (
    <PageTemplate
      heading={
        <PageHeading
          title={t("title")}
          description={t("subtitle")}
          eyebrow={siteConfig.name}
          backHref="/"
          backLabel={t("backLabel")}
          actions={
            <Button variant="outline" size="sm" className="rounded-full">
              <Search className="h-4 w-4" />
              {t("searchLabel")}
            </Button>
          }
        />
      }
      lead={
        <>
          <Card className="surface-panel p-4">
            <div className="no-scrollbar flex gap-2 overflow-x-auto">
              {filters.map((filter) => (
                <Button
                  key={filter.key}
                  type="button"
                  variant={filter.active ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "rounded-full px-4",
                    filter.active ? "bg-primary text-primary-foreground" : "border-border/80",
                  )}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </Card>

          <Card className="surface-panel overflow-hidden">
            <div className="relative aspect-[16/9] w-full">
              <Image
                alt={hero.imageAlt}
                src={postsPageConfig.heroImage}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 900px, 100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/45 to-transparent" />
              <Badge className="absolute left-5 top-5 bg-primary/95 text-primary-foreground">
                {hero.badge}
              </Badge>
            </div>
            <div className="space-y-4 p-5 sm:p-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
                <span>{hero.category}</span>
                <span aria-hidden className="text-muted-foreground">
                  •
                </span>
                <span className="text-muted-foreground">{hero.date}</span>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                  {hero.title}
                </h2>
                <p className="max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
                  {hero.description}
                </p>
              </div>
              <Button className="gap-2" asChild>
                <Link href={`/posts/${postSlugs.results}`}>
                  {hero.cta}
                  <Timer className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Card>
        </>
      }
      main={
        <PostsFeed
          items={allPosts}
          perPage={postsPageConfig.perPage}
          title={t("list.title")}
          previousLabel={t("pagination.previous")}
          nextLabel={t("pagination.next")}
          statusTemplate={paginationStatusTemplate}
        />
      }
    />
  );
}
