import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Flag,
  Eye,
  Handshake,
  Leaf,
  Users,
  MapPin,
  Mail,
  Phone,
  Globe,
  Instagram,
  MapPinned,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

type PageParams = { locale: Locale };

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
  const t = await getTranslations({ locale, namespace: "about" });

  const heroStats = ["members", "events", "founded"].map((key) => ({
    id: key,
    value: t(`hero.stats.${key}.value`),
    label: t(`hero.stats.${key}.label`),
  }));

  const valueCards = [
    { key: "fairPlay", icon: Handshake },
    { key: "nature", icon: Leaf },
    { key: "community", icon: Users },
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
    { key: "address", href: "#" },
    { key: "email", href: "mailto:info@kobchocen.cz" },
    { key: "phone", href: "tel:+420123456789" },
  ].map((item) => ({
    ...item,
    label: t(`contact.items.${item.key}.label`),
    value: t(`contact.items.${item.key}.value`),
  }));

  return (
    <div className="space-y-8 lg:space-y-10">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="rounded-full" asChild>
          <Link href="../">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{t("title")}</p>
      </div>

      <section className="relative overflow-hidden rounded-3xl border border-border/80 bg-card/80 shadow-2xl">
        <Image
          alt={t("hero.title")}
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-FsDwENGQ4-OMymvQQCWLZ9llyVcdrqWnFjF-XIZgKhTH1UmaDk1v6j-4LH-PSTeCUFKgLyDbhF1_LDJxafqeOxqo6FhvNjeA7-hm1yh0oBRCxURuK03bRx1lMRO0XUn8Z1GRd5d-PwJfSoBz5IFbrdB_dlbwzDcaiD90GHqk610TW1CsxMHCOcodZ5HDNdAVsrGbiQpdF2sEzvZp8B5XmZFLQMXe7pxpIFxByKcgD2uke0zS6WoZkiac0fXrXesCeqE2Fphaf4g"
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 1200px, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/80 to-background/95" />
        <div className="relative z-10 flex flex-col items-center gap-6 px-6 py-16 text-center sm:px-10 lg:px-16">
          <div className="flex items-center gap-2 rounded-full border border-primary/40 bg-background/80 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-primary">
            {t("hero.badge")}
          </div>
          <div className="space-y-3 max-w-3xl">
            <h1 className="text-3xl font-extrabold leading-tight text-foreground sm:text-4xl lg:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="text-base text-muted-foreground sm:text-lg">{t("hero.description")}</p>
          </div>
          <div className="grid w-full gap-4 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <Card key={stat.id} className="border-border/70 bg-background/70 p-4 text-center">
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {stat.label}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card className="border-border/70 bg-card/80 p-6">
          <div className="flex items-center gap-3 text-primary">
            <Flag className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]">
              {t("mission.label")}
            </span>
          </div>
          <p className="mt-3 text-lg font-semibold text-foreground">{t("mission.title")}</p>
        </Card>
        <Card className="border-border/70 bg-card/80 p-6">
          <div className="flex items-center gap-3 text-primary">
            <Eye className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]">
              {t("vision.label")}
            </span>
          </div>
          <p className="mt-3 text-lg font-semibold text-foreground">{t("vision.title")}</p>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">{t("valuesTitle")}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {valueCards.map((value) => (
            <Card key={value.key} className="border-border/70 bg-card/80 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <value.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{value.title}</p>
                  <p className="text-xs text-muted-foreground">{value.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">{t("history.title")}</h2>
        <div className="relative pl-10">
          <span className="absolute left-4 top-0 h-full w-px bg-border/70" aria-hidden="true" />
          {timeline.map((entry, index) => (
            <div key={entry.key} className="relative flex gap-6 pb-10 last:pb-0">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold",
                    entry.highlight
                      ? "border-primary bg-primary text-primary-foreground shadow-[0_4px_12px_rgba(96,165,250,0.35)]"
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
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">{t("leadership.title")}</h2>
          <Button variant="ghost" size="sm" className="text-primary">
            {t("leadership.cta")}
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {leadershipMembers.map((member) => (
            <Card key={member.key} className="border-border/70 bg-card/80 p-5 text-center">
              <div className="mx-auto h-20 w-20 overflow-hidden rounded-full border-2 border-primary/40">
                <Image
                  alt={member.name}
                  src={member.image}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-3 text-sm font-semibold text-foreground">{member.name}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-primary">{member.role}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">{t("contact.title")}</h2>
        <Card className="border-border/70 bg-card/80">
          <div className="grid gap-6 p-6 lg:grid-cols-[2fr,1fr]">
            <div className="space-y-5">
              <div className="relative h-40 overflow-hidden rounded-2xl border border-border/70">
                <Image
                  alt="Club map"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCW7IziSJXrQhgtdRL_C5TbEfg1-bfXrokhSCnvpqN5nFAMDORpHPDI1klFEtylIwfq2tnreXF1Ky_8jr0hTQadoXvjQs9TMP0pZkWSHQ9PGn-dlwp7uHCJlSufeIbgNadEa9nvcS3jo4GFi8vAXzw0rEeBFJ9sOsE-buyouqGcNYZd1gt4fcuGQVAsuhRhukdMQ5cFRGoeKPbhyLGXRbbmPzn2cCZAtxSUpmYT3FBe_GceVWWfy0ns-Y4rjT9IRYc522h6_PhFNVk"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 600px, 100vw"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Button variant="secondary" className="gap-2">
                    <MapPinned className="h-4 w-4" />
                    {t("contact.mapCta")}
                  </Button>
                </div>
              </div>
              <div className="space-y-3">
                {contactItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="flex items-center gap-4 rounded-2xl border border-border/60 px-4 py-3 transition hover:border-primary/40"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {item.key === "address" ? <MapPin className="h-4 w-4" /> : null}
                      {item.key === "email" ? <Mail className="h-4 w-4" /> : null}
                      {item.key === "phone" ? <Phone className="h-4 w-4" /> : null}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="text-sm font-medium text-foreground">{item.value}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </div>
            <div className="space-y-4 rounded-2xl border border-border/60 bg-background/70 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">
                  {t("contact.social.site")}
                </span>
                <Button variant="ghost" size="sm" className="text-primary">
                  <Globe className="mr-2 h-4 w-4" />
                  kobchocen.cz
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">
                  {t("contact.social.instagram")}
                </span>
                <Button variant="ghost" size="sm" className="text-primary">
                  <Instagram className="mr-2 h-4 w-4" />
                  @kobchocen
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
