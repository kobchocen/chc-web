import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  CalendarCheck2,
  CalendarDays,
  Globe,
  Handshake,
  Instagram,
  MapPin,
  MapPinned,
  Medal,
  Timer,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { siteFeatures } from "@/config/features";
import { siteConfig } from "@/config/site";
import { isLocale } from "@/lib/i18n/config";
import { IconBadge } from "@/components/atoms/icon-badge";
import { PageHeading } from "@/components/molecules/page-heading";
import { HeroBanner } from "@/components/organisms/hero-banner";
import { NewsSection } from "@/components/organisms/news-section";
import { PartnersSection } from "@/components/organisms/partners-section";
import { QuickActionsGrid } from "@/components/organisms/quick-actions-grid";
import { PageTemplate } from "@/components/templates";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type PageParams = { locale: string };

type PageProps = {
  params: Promise<PageParams>;
};

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const t = await getTranslations({ locale, namespace: "home" });
  const layoutT = await getTranslations({ locale, namespace: "layout" });

  const heroData = {
    label: t("hero.label"),
    title: t("hero.title"),
    location: t("hero.location"),
    startIn: t("hero.startIn"),
    startLabel: t("hero.startLabel"),
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAYYy9JLH9lb7eodQEWz_TZcLi7oKI28axiuWbpTlmFGud9lzfiDVOOy_Cm4HcAxbgvZS85KgNbzl4M9SQhc4y2C0wR6rdyY5o8kpqDnKjs_bVFc6J18JKliROhinK-ubc2i27wkbUoB4tM0oQmMlLa-qvGTbquHvtIMtCZmLvg7mh9Fuh0JH9XvZQr4cu_xiIzP5LFRI_ENQ-3mlGLkKDeMGkbYRid5I42ee02r7hV0GGVe7pZ-4wAS6c5Xs4aXI_d-NDbeGb0uIA",
    imageAlt: t("hero.imageAlt"),
  };

  const supporters = [
    {
      label: t("partners.cards.club.label"),
      description: t.rich("partners.cards.club.description", {
        highlight: (chunks) => <span className="font-semibold text-primary">{chunks}</span>,
      }),
      icon: Handshake,
    },
    {
      label: t("partners.cards.institutional.label"),
      description: t.rich("partners.cards.institutional.description", {
        highlight: (chunks) => <span className="font-semibold text-primary">{chunks}</span>,
      }),
      icon: Globe,
    },
  ];

  const instagramPosts = [
    {
      id: "training",
      caption: t("instagram.posts.training.caption"),
      time: t("instagram.posts.training.time"),
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBgzHzVHu-0pHRS4V-3MTpR-RV-gmYSmGpIZnu9MTfmhSGOfMjZ1EW2V1yPwpStsbRR45XLT2V24BZiBj0GgW4WWQ90Zu1lJ9LPSJe0P3BQdLW50YNtwY8PGYuKiAg2FP9KmnIA2ErsX7RLEARHzFTPmnO5D4uKZh-gUMTu3ADE6XzDjk9Dfr4joF9i-smkAtVZJqeB2apoIVueUjkcwwKHKsKKqXKWO6D7Qii3YzJQUIwPW_9bTOdeAuSDGF830O2FvsmjPBfApWA",
    },
    {
      id: "relay",
      caption: t("instagram.posts.relay.caption"),
      time: t("instagram.posts.relay.time"),
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBvH5q5b2GSPXwvzbGSCyx4uzfYZLZnxvmU44nUAShifFpj7zslPqdqTGQEc6hP4PPygsu7qaArxet4PNcJAIFkTPtlm2O3o_R2U8T4zGPRTVyEKGVJmAiJRtZZ-4KbIHyahNdRjCtJfQO1rxls519vdrcfSBOmSyIYBHrDM2yJz7vXGvYGGy57qAV0dyr_inHBPVzW7QffAMFP4xV-ehQLgu2NKXlnxOxpTFuvu3_pHuGqPU8IfYMCTR_rNOyxC2_YlBT3jyA-Jzo",
    },
    {
      id: "camp",
      caption: t("instagram.posts.camp.caption"),
      time: t("instagram.posts.camp.time"),
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCCv73aQUYrGj7StWA_-F5WWPqOtAFMNJM-JHiCkku8V5LkPSRoGhrmQlWG5XiSfyeIOMaRp-5rNBZouWyTu3XVDjtBdkbK7pXyW1zt7pw456WjBATgkw93zGH82ccONsprCejHzjoQ8jhZcaAs8k1xTfFcYSkDTfc_Bg7TcxiwQBR9KNdSfOoUte2Wcaz17Gh4BqdLf9q39t40hFUDWTKIODJHKdXHVTErw-pJR4bUskjHuUVLh6rO1KMQ5wsaoYoSV25yt3KMBC8",
    },
  ];

  const upcomingRaces = [
    {
      id: "springClassic",
      title: t("upcoming.items.springClassic.title"),
      location: t("upcoming.items.springClassic.location"),
      date: t("upcoming.items.springClassic.date"),
      level: t("upcoming.items.springClassic.level"),
    },
    {
      id: "relayCup",
      title: t("upcoming.items.relayCup.title"),
      location: t("upcoming.items.relayCup.location"),
      date: t("upcoming.items.relayCup.date"),
      level: t("upcoming.items.relayCup.level"),
    },
    {
      id: "nightSprint",
      title: t("upcoming.items.nightSprint.title"),
      location: t("upcoming.items.nightSprint.location"),
      date: t("upcoming.items.nightSprint.date"),
      level: t("upcoming.items.nightSprint.level"),
    },
  ];

  const archiveMaps = [
    {
      id: "peklo",
      name: t("archive.items.peklo.name"),
      type: t("archive.items.peklo.type"),
      date: t("archive.items.peklo.date"),
    },
    {
      id: "chocen",
      name: t("archive.items.chocen.name"),
      type: t("archive.items.chocen.type"),
      date: t("archive.items.chocen.date"),
    },
    {
      id: "orlicke",
      name: t("archive.items.orlicke.name"),
      type: t("archive.items.orlicke.type"),
      date: t("archive.items.orlicke.date"),
    },
  ];

  const partnerLogos = [
    t("partnerLogos.logos.nadOrlici"),
    t("partnerLogos.logos.pardubice"),
    t("partnerLogos.logos.nsa"),
    t("partnerLogos.logos.city"),
  ];

  const pageHeading = (
    <PageHeading
      title={layoutT("title")}
      description={layoutT("tagline")}
      eyebrow={siteConfig.name}
    />
  );

  const partnerLogosCard = (
    <Card className="surface-panel p-6">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold text-foreground">{t("partnerLogos.title")}</h3>
        <IconBadge icon={Handshake} variant="primary" />
      </div>
      <div className="grid grid-cols-2 gap-4 pt-4">
        {partnerLogos.map((logo) => (
          <div
            key={logo}
            className="flex h-20 items-center justify-center rounded-2xl border border-dashed border-border/60 bg-card/60 text-center text-sm font-semibold uppercase text-muted-foreground"
          >
            {logo}
          </div>
        ))}
      </div>
    </Card>
  );

  if (siteFeatures.maintenance.enabled) {
    return (
      <PageTemplate
        heading={pageHeading}
        lead={
          <Card className="surface-panel border-primary/20 bg-primary/5 p-5 sm:p-6">
            <div className="space-y-4">
              <Badge className="w-fit bg-primary text-primary-foreground">
                {layoutT("maintenance.badge")}
              </Badge>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {layoutT("maintenance.title")}
                </h2>
                <p className="max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
                  {layoutT("maintenance.description")}
                </p>
              </div>
              <Button className="w-fit" asChild>
                <a href={`mailto:${siteConfig.contact.email}`}>{layoutT("maintenance.cta")}</a>
              </Button>
            </div>
          </Card>
        }
        main={
          <>
            <PartnersSection title={t("partners.title")} supporters={supporters} />
            {partnerLogosCard}
          </>
        }
      />
    );
  }

  const quickActions = [
    { title: t("actions.calendar"), icon: CalendarCheck2, href: "/calendar" },
    { title: t("actions.results"), icon: Medal, href: "/posts" },
    { title: t("actions.trainings"), icon: MapPin, href: "/calendar" },
    { title: t("actions.about"), icon: Globe, href: "/about" },
  ];

  const highlight = {
    title: t("news.highlight.title"),
    description: t("news.highlight.description"),
    date: t("news.highlight.date"),
    badge: t("news.highlight.badge"),
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCH2FVPhv1T4_q6WuInwYacrxRGcABdNOb20t5LtywwNKfulwwTrCzdY2uR8q5lOU9lDxKl0VZqrjKAAhK3_Fe-pFmJPWri3OX-HKCa3NfVxK97K47_psPA-UClhjtIHp577J8fxIrnG1vmqClZE5MHpbEeTKa9pns5LFbbSwWxU8vx0QOq7X2q-F-ENCw8Ni-fDJvs4PvOZqOCz0wxHZce_IDnnWoT6_ns-7AKysvBWCCrv_VUr1gdfS-3vuV-rM-7CkNznDwWVX8",
    imageAlt: t("news.highlight.imageAlt"),
    ctaLabel: t("news.highlight.cta"),
    icon: Timer,
  };

  const newsItems = [
    {
      category: t("news.items.training.category"),
      title: t("news.items.training.title"),
      description: t("news.items.training.description"),
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBgzHzVHu-0pHRS4V-3MTpR-RV-gmYSmGpIZnu9MTfmhSGOfMjZ1EW2V1yPwpStsbRR45XLT2V24BZiBj0GgW4WWQ90Zu1lJ9LPSJe0P3BQdLW50YNtwY8PGYuKiAg2FP9KmnIA2ErsX7RLEARHzFTPmnO5D4uKZh-gUMTu3ADE6XzDjk9Dfr4joF9i-smkAtVZJqeB2apoIVueUjkcwwKHKsKKqXKWO6D7Qii3YzJQUIwPW_9bTOdeAuSDGF830O2FvsmjPBfApWA",
      imageAlt: t("news.items.training.imageAlt"),
    },
    {
      category: t("news.items.club.category"),
      title: t("news.items.club.title"),
      description: t("news.items.club.description"),
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBvH5q5b2GSPXwvzbGSCyx4uzfYZLZnxvmU44nUAShifFpj7zslPqdqTGQEc6hP4PPygsu7qaArxet4PNcJAIFkTPtlm2O3o_R2U8T4zGPRTVyEKGVJmAiJRtZZ-4KbIHyahNdRjCtJfQO1rxls519vdrcfSBOmSyIYBHrDM2yJz7vXGvYGGy57qAV0dyr_inHBPVzW7QffAMFP4xV-ehQLgu2NKXlnxOxpTFuvu3_pHuGqPU8IfYMCTR_rNOyxC2_YlBT3jyA-Jzo",
      imageAlt: t("news.items.club.imageAlt"),
    },
    {
      category: t("news.items.race.category"),
      title: t("news.items.race.title"),
      description: t("news.items.race.description"),
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCCv73aQUYrGj7StWA_-F5WWPqOtAFMNJM-JHiCkku8V5LkPSRoGhrmQlWG5XiSfyeIOMaRp-5rNBZouWyTu3XVDjtBdkbK7pXyW1zt7pw456WjBATgkw93zGH82ccONsprCejHzjoQ8jhZcaAs8k1xTfFcYSkDTfc_Bg7TcxiwQBR9KNdSfOoUte2Wcaz17Gh4BqdLf9q39t40hFUDWTKIODJHKdXHVTErw-pJR4bUskjHuUVLh6rO1KMQ5wsaoYoSV25yt3KMBC8",
      imageAlt: t("news.items.race.imageAlt"),
    },
  ];

  return (
    <PageTemplate
      heading={pageHeading}
      gridClassName="lg:grid-cols-[minmax(0,1.7fr)_minmax(360px,1fr)]"
      main={
        <>
          <HeroBanner {...heroData} className="lg:min-h-[26rem]" />
          <NewsSection
            title={t("news.title")}
            viewAllLabel={t("news.viewAll")}
            viewAllHref="/posts"
            highlightLabel={t("news.highlightLabel")}
            highlight={highlight}
            items={newsItems}
          />
          <Card className="surface-panel p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {t("instagram.title")}
                </p>
                <h3 className="text-2xl font-semibold text-foreground">
                  {t("instagram.subtitle")}
                </h3>
              </div>
              <Button variant="outline" size="sm" className="gap-2" asChild>
                <a href="https://www.instagram.com/kobchocen" target="_blank" rel="noreferrer">
                  <Instagram className="h-4 w-4" />
                  {t("instagram.cta")}
                </a>
              </Button>
            </div>
            <div className="grid gap-4 pt-4 sm:grid-cols-3">
              {instagramPosts.map((post) => (
                <div
                  key={post.id}
                  className="space-y-3 rounded-2xl border border-border/60 bg-card/60 p-3 shadow-sm"
                >
                  <div className="relative h-32 w-full overflow-hidden rounded-xl">
                    <Image
                      alt={post.caption}
                      src={post.imageUrl}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 180px, 100vw"
                    />
                  </div>
                  <p className="text-sm font-medium text-foreground">{post.caption}</p>
                  <p className="text-xs text-muted-foreground">{post.time}</p>
                </div>
              ))}
            </div>
          </Card>
        </>
      }
      aside={
        <>
          <QuickActionsGrid actions={quickActions} title={t("actions.title")} />
          <PartnersSection title={t("partners.title")} supporters={supporters} />
          <Card className="surface-panel p-6">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl font-semibold text-foreground">{t("upcoming.title")}</h3>
              <Button variant="ghost" size="sm" className="gap-2">
                <CalendarDays className="h-4 w-4" />
                {t("upcoming.cta")}
              </Button>
            </div>
            <div className="space-y-4 pt-4">
              {upcomingRaces.map((race) => (
                <div
                  key={race.id}
                  className="rounded-2xl border border-border/60 bg-card/70 p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {race.date}
                      </p>
                      <h4 className="text-base font-semibold text-foreground">{race.title}</h4>
                      <p className="text-sm text-muted-foreground">{race.location}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs font-medium uppercase">
                      {race.level}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          {partnerLogosCard}
          <Card className="surface-panel p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground">{t("archive.title")}</h3>
                <p className="text-sm text-muted-foreground">{t("archive.subtitle")}</p>
              </div>
              <Button variant="ghost" size="sm" className="gap-2">
                <MapPinned className="h-4 w-4" />
                {t("archive.cta")}
              </Button>
            </div>
            <div className="space-y-4 pt-4">
              {archiveMaps.map((map) => (
                <div
                  key={map.id}
                  className="rounded-2xl border border-border/60 bg-card/70 p-4 transition-colors hover:border-primary/40"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {map.date}
                      </p>
                      <h4 className="text-base font-semibold text-foreground">{map.name}</h4>
                      <p className="text-sm text-muted-foreground">{map.type}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground"
                      aria-label={t("archive.cta")}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </>
      }
    />
  );
}
