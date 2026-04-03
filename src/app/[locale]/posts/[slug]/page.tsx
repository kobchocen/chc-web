import Image from "next/image";
import { Bookmark, CalendarDays, MapPinned, Quote, Share2, Timer } from "lucide-react";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { IconButton } from "@/components/atoms/icon-button";
import { PageHeading } from "@/components/molecules/page-heading";
import { PageTemplate } from "@/components/templates";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { getMockPostEntries, postsPageConfig } from "@/lib/content/posts";
import { isLocale, locales } from "@/lib/i18n/config";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type PageParams = { locale: string; slug: string };

type PageProps = {
  params: Promise<PageParams>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const entries = getMockPostEntries();

  return locales.flatMap((locale) =>
    entries.map((entry) => ({
      locale,
      slug: entry.slug,
    })),
  );
}

export default async function PostDetailPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const t = await getTranslations({ locale, namespace: "posts.detail" });

  const paragraphs = (t.raw("body.paragraphs") as string[]) ?? [];
  const successItems = (t.raw("success.items") as { label: string; text: string }[]) ?? [];

  return (
    <PageTemplate
      heading={
        <PageHeading
          title={t("title")}
          description={t("excerpt")}
          eyebrow={siteConfig.name}
          backHref="/posts"
          backLabel={t("back")}
          actions={
            <>
              <IconButton icon={Bookmark} aria-label={t("actions.bookmark")} />
              <IconButton icon={Share2} aria-label={t("actions.share")} />
            </>
          }
        />
      }
      lead={
        <Card className="surface-panel overflow-hidden">
          <div className="relative aspect-[16/9] w-full">
            <Image
              alt={t("hero.imageAlt")}
              src={postsPageConfig.detailHeroImage}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 1000px, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/85 to-transparent" />
          </div>
        </Card>
      }
      main={
        <Card className="surface-panel space-y-6 p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="bg-primary/15 text-primary">{t("category")}</Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Timer className="h-4 w-4" />
              {t("readingTime")}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 border-b border-border/60 pb-4 text-sm">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsVzD9FoJt5logeOPI8Yu76z2_gWgLylnG54V0P9y6LPkClbq-6aMO-tXkmkJKaI60UhdDICg20kESJZxWVLvYd71ee6A3h0w43oeh8Nafu4BIjlB2EAqdWRTHHJz_rHxV0_lWo9H0mvfg5aN7k-9RNDB1sxJrsWx5lA4yM0LcYU9laEnDsUtg71__clKcZx_WKuupyJdLD0i1YZOwVhsknUUkQafx97iadMmpICCZXE99Y_PTxlyj1Gt65a_dN0VUAT25jPaHzqw"
                  alt={t("author.name")}
                />
                <AvatarFallback>PN</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-foreground">{t("author.name")}</p>
                <p className="text-xs text-muted-foreground">{t("author.role")}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              <div className="flex flex-col text-xs">
                <span className="font-semibold text-foreground">{t("date")}</span>
                <span>{t("dateLabel")}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPinned className="h-4 w-4" />
              <span className="text-xs">{t("location")}</span>
            </div>
          </div>

          <article className="space-y-6 text-base leading-7 text-muted-foreground">
            <p className="text-lg font-medium text-foreground">{t("body.lead")}</p>
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <div className="rounded-3xl border border-primary/30 bg-primary/5 p-5">
              <Quote className="mb-3 h-6 w-6 text-primary" />
              <p className="italic text-foreground">{t("body.quote.text")}</p>
              <p className="mt-2 text-sm font-semibold text-primary">{t("body.quote.author")}</p>
              <p className="text-xs text-muted-foreground">{t("body.quote.role")}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">{t("success.title")}</h2>
              <ul className="mt-4 space-y-2">
                {successItems.map((item) => (
                  <li key={item.text} className="flex items-start gap-3">
                    <span className="mt-1 inline-block size-2 rounded-full bg-primary" />
                    <p>
                      <strong>{item.label}: </strong>
                      {item.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <p>{t("body.closing")}</p>

            <div className="overflow-hidden rounded-3xl border border-border/70">
              <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-4 py-3 text-sm font-semibold text-foreground">
                <span className="flex items-center gap-2">
                  <MapPinned className="h-4 w-4 text-primary" />
                  {t("map.title")}
                </span>
                <span className="text-primary">{t("map.cta")}</span>
              </div>
              <div className="relative h-56 w-full">
                <Image
                  alt={t("map.imageAlt")}
                  src={postsPageConfig.detailMapImage}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 600px, 100vw"
                />
              </div>
            </div>
          </article>
        </Card>
      }
    />
  );
}
