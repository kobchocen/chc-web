import Image from "next/image";
import { Eye, Flag, Handshake, Leaf, Mail, MapPin, MapPinned, Phone, Users } from "lucide-react";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { SectionLabel } from "@/components/atoms/section-label";
import { ActionListItem } from "@/components/molecules/action-list-item";
import { InfoCard } from "@/components/molecules/info-card";
import { PageHeading } from "@/components/molecules/page-heading";
import { StatCard } from "@/components/molecules/stat-card";
import { PageSection } from "@/components/organisms/page-section";
import { PageTemplate } from "@/components/templates";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { isMaintenanceRouteAllowed } from "@/config/features";
import { siteConfig, siteSocialLinks } from "@/config/site";
import { isLocale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

type PageParams = { locale: string };

type PageProps = {
  params: Promise<PageParams>;
};

const leadershipImages = {
  chairman:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCuV0ndn_3P6XBkTEniK_ewcPs65sqtQTqym3WfFHYXkHYgkvhtyR8yZpBPAlBgwyioIY6djgIwB2vmMgoKpq2bfiCx32aoo26y8IBx65uiGJvY15OkFJYZtzdqmSi-OJBk2rcxPxa4pjucPk-l5KiBp5ZXt6z0gXxnr6JpqVWDPUyJgTme38d6rEHVgSenB5XWIBDKhiAZDw9qpMhJt8hY8zYHqila8Gz-DqfbY1eu_kjqqncbP8P8uSXFXl_uUxA6oG8yHocqWqU",
  coach:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBpgA1hCtfxw30vR07CQZJPeSRhVoA63qBGiLtpTkHQdifxSkNkm9Xl7vMjFx3tF5M-713acIQKuujXUOeNxArEY6_im-LsFqc-7aL7FqHq8372IDh_44-fqoyMn6Z1znypJDtLLG7LmMByqmJ2D8cdMSNevaPxiASGVZof7S8acQauLFYf_1l72UhJKFRkM78KEgnyA1GJHV95AQAZoWOKWmRAaXo6JVxcM9i9gk7pyC5_rg2AmKFd276snTvgvEW6zZ074XQ3Hwk",
  treasurer:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC7odhXo1DOm3IFEXINkGbtx46YsyG-jOcSzLqbXf5H1Al18yQTqZsPaYjirCIlyjWWXAfO92_gZBrBP5wYh7G3REm_TFIigQChiLiS_myfdO_Wl58cfaIv7DMx4C13foJNm6tPM5O89OgG835YfplL5OMWNPm-hmKbgD8UVYcc-P-bRK_ECMPljEjfs0uA3MbmJOvDOZdcYCOYtvoNokVfXsWzavwppLP-qxag8_-EEB_ZCMVwPnQ1LpDTNpTK47zZd31w9j3oCzI",
  events:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDgV7IniwrMhCRJU5gJUHjzaWGK_uaCDIuHrXRkgu2kLBqvksNqXGvlCe1FjLpfYXoMgcirjF5uXSSEFN32WJqzE1z_ZUtIdkYk3VwQ1eJ2nwa17iIep2sB7P5f6azffcFOLbRkCsvoboC-XULcCqfGp0AMKKit6-9UT9ct3K_NaBCl6DY-Sf2cl2oQao3Nfrmje77YNpMjjlusIuJ3zcldsaLG56xsx3K2VmNK1hgq2uY9wRK_vtiWSKcJ3DsAEle0iTKEOjdIcWo",
};

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale) || !isMaintenanceRouteAllowed("/about")) {
    notFound();
  }
  const t = await getTranslations({ locale, namespace: "about" });

  const heroStats = ["members", "events", "founded"].map((key) => ({
    id: key,
    value: t(`hero.stats.${key}.value`),
    label: t(`hero.stats.${key}.label`),
  }));

  const valueCards = [
    { key: "fairPlay", icon: Handshake, accent: "primary" as const },
    { key: "nature", icon: Leaf, accent: "emerald" as const },
    { key: "community", icon: Users, accent: "amber" as const },
  ].map((value) => ({
    ...value,
    title: t(`values.${value.key}.title`),
    description: t(`values.${value.key}.description`),
  }));

  const timelineOrder = ["founding", "champion", "clubhouse", "today"];
  const timeline = timelineOrder.map((key) => ({
    key,
    year: t(`history.entries.${key}.year`),
    title: t(`history.entries.${key}.title`),
    description: t(`history.entries.${key}.description`),
    highlight: key === "founding" || key === "today",
  }));

  const leadershipMembers = [
    { key: "chairman" },
    { key: "coach" },
    { key: "treasurer" },
    { key: "events" },
  ].map((member) => ({
    ...member,
    name: t(`leadership.members.${member.key}.name`),
    role: t(`leadership.members.${member.key}.role`),
    image: leadershipImages[member.key as keyof typeof leadershipImages],
  }));

  const contactItems = [
    {
      key: "address",
      href: "https://maps.google.com/?q=U%20Koupali%C5%A1t%C4%9B%20123%2C%20565%2001%20Choce%C5%88",
      icon: MapPin,
    },
    { key: "email", href: "mailto:info@kobchocen.cz", icon: Mail },
    { key: "phone", href: "tel:+420123456789", icon: Phone },
  ].map((item) => ({
    ...item,
    label: t(`contact.items.${item.key}.label`),
    value: t(`contact.items.${item.key}.value`),
  }));

  return (
    <PageTemplate
      heading={
        <PageHeading
          title={t("title")}
          description={t("hero.description")}
          eyebrow={siteConfig.name}
          backHref="/"
          backLabel={t("backLabel")}
        />
      }
      lead={
        <>
          <section className="surface-panel overflow-hidden">
            <div className="relative min-h-[22rem] overflow-hidden">
              <Image
                alt={t("hero.title")}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-FsDwENGQ4-OMymvQQCWLZ9llyVcdrqWnFjF-XIZgKhTH1UmaDk1v6j-4LH-PSTeCUFKgLyDbhF1_LDJxafqeOxqo6FhvNjeA7-hm1yh0oBRCxURuK03bRx1lMRO0XUn8Z1GRd5d-PwJfSoBz5IFbrdB_dlbwzDcaiD90GHqk610TW1CsxMHCOcodZ5HDNdAVsrGbiQpdF2sEzvZp8B5XmZFLQMXe7pxpIFxByKcgD2uke0zS6WoZkiac0fXrXesCeqE2Fphaf4g"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 1200px, 100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/70 to-background/95" />
              <div className="relative z-10 flex h-full flex-col justify-end gap-5 px-6 py-10 sm:px-10 lg:px-12">
                <div className="max-w-2xl space-y-3">
                  <SectionLabel className="text-primary">{t("hero.badge")}</SectionLabel>
                  <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                    {t("hero.title")}
                  </h2>
                  <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                    {t("mission.title")}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="grid gap-4 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <StatCard key={stat.id} value={stat.value} label={stat.label} />
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <InfoCard
              icon={Flag}
              eyebrow={t("mission.label")}
              title={t("mission.title")}
              accent="primary"
            />
            <InfoCard
              icon={Eye}
              eyebrow={t("vision.label")}
              title={t("vision.title")}
              accent="sky"
            />
          </div>
        </>
      }
      main={
        <>
          <PageSection title={t("valuesTitle")}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {valueCards.map((value) => (
                <InfoCard
                  key={value.key}
                  icon={value.icon}
                  title={value.title}
                  description={value.description}
                  accent={value.accent}
                />
              ))}
            </div>
          </PageSection>

          <PageSection title={t("history.title")} surface="default" contentClassName="px-6 py-6">
            <div className="relative pl-10">
              <span className="absolute left-4 top-0 h-full w-px bg-border/70" aria-hidden="true" />
              {timeline.map((entry, index) => (
                <div key={entry.key} className="relative flex gap-6 pb-10 last:pb-0">
                  <div className="flex flex-col items-center">
                    <span
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold",
                        entry.highlight
                          ? "border-primary bg-primary text-primary-foreground shadow-[0_4px_12px_rgba(20,184,166,0.35)]"
                          : "border-border bg-background text-muted-foreground",
                      )}
                    >
                      {index + 1}
                    </span>
                    {index < timeline.length - 1 ? (
                      <span className="mt-2 block h-full w-px bg-border/70" aria-hidden="true" />
                    ) : null}
                  </div>
                  <div className="flex-1 space-y-2">
                    <span
                      className={cn(
                        "text-xs font-semibold uppercase tracking-[0.2em]",
                        entry.highlight ? "text-primary" : "text-muted-foreground",
                      )}
                    >
                      {entry.year}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground">{entry.title}</h3>
                    <p className="text-sm text-muted-foreground">{entry.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </PageSection>

          <PageSection
            title={t("leadership.title")}
            action={
              <Button variant="ghost" size="sm" className="text-primary">
                {t("leadership.cta")}
              </Button>
            }
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {leadershipMembers.map((member) => (
                <InfoCard
                  key={member.key}
                  title={member.name}
                  description={member.role}
                  align="center"
                  media={
                    <div className="mx-auto h-20 w-20 overflow-hidden rounded-full border-2 border-primary/30">
                      <Image
                        alt={member.name}
                        src={member.image}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  }
                />
              ))}
            </div>
          </PageSection>

          <PageSection title={t("contact.title")} surface="default" contentClassName="p-6">
            <div className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">
              <div className="space-y-5">
                <div className="relative h-52 overflow-hidden rounded-3xl border border-border/70">
                  <Image
                    alt="Club map"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCW7IziSJXrQhgtdRL_C5TbEfg1-bfXrokhSCnvpqN5nFAMDORpHPDI1klFEtylIwfq2tnreXF1Ky_8jr0hTQadoXvjQs9TMP0pZkWSHQ9PGn-dlwp7uHCJlSufeIbgNadEa9nvcS3jo4GFi8vAXzw0rEeBFJ9sOsE-buyouqGcNYZd1gt4fcuGQVAsuhRhukdMQ5cFRGoeKPbhyLGXRbbmPzn2cCZAtxSUpmYT3FBe_GceVWWfy0ns-Y4rjT9IRYc522h6_PhFNVk"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 600px, 100vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                    <Button variant="secondary" className="gap-2" asChild>
                      <a
                        href="https://maps.google.com/?q=U%20Koupali%C5%A1t%C4%9B%20123%2C%20565%2001%20Choce%C5%88"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <MapPinned className="h-4 w-4" />
                        {t("contact.mapCta")}
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="grid gap-3">
                  {contactItems.map((item) => (
                    <ActionListItem
                      key={item.key}
                      href={item.href}
                      title={item.value}
                      label={item.label}
                      icon={item.icon}
                    />
                  ))}
                </div>
              </div>

              <Card className="surface-subtle p-4">
                <div className="grid gap-3">
                  {siteSocialLinks
                    .slice(0, 2)
                    .map((item) =>
                      item.href ? (
                        <ActionListItem
                          key={item.key}
                          href={item.href}
                          title={item.label}
                          label={
                            item.key === "website"
                              ? t("contact.social.site")
                              : t("contact.social.instagram")
                          }
                          icon={item.icon}
                          tone="primary"
                        />
                      ) : null,
                    )}
                </div>
              </Card>
            </div>
          </PageSection>
        </>
      }
    />
  );
}
