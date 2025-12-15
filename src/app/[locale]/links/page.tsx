"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  ExternalLink,
  FileText,
  FolderKanban,
  FolderLock,
  FolderOpenDot,
  Globe,
  MapPinned,
  Search,
  Shirt,
  ShieldCheck,
  Target,
  Users,
  Mail,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type LinkItem = {
  key: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  ActionIcon: LucideIcon;
};

type SectionShape = {
  key: string;
  icon: LucideIcon;
  accent: string;
  bg: string;
  actionIcon?: LucideIcon;
  items: string[];
  customIcons?: Record<string, LucideIcon>;
  actions?: Record<string, LucideIcon>;
};

const sectionConfig: SectionShape[] = [
  {
    key: "systems",
    icon: Target,
    accent: "text-primary",
    bg: "bg-primary/10 text-primary",
    actionIcon: ExternalLink,
    items: ["oris", "obo"],
  },
  {
    key: "documents",
    icon: FileText,
    accent: "text-emerald-500",
    bg: "bg-emerald-500/10 text-emerald-500",
    items: ["csos", "rules", "guidelines"],
  },
  {
    key: "club",
    icon: Users,
    accent: "text-pink-500",
    bg: "bg-pink-500/10 text-pink-500",
    items: ["trainings", "docs", "apparel"],
    customIcons: {
      trainings: CalendarDays,
      docs: FolderKanban,
      apparel: Shirt,
    },
    actions: {
      trainings: ExternalLink,
      docs: FolderLock,
      apparel: ExternalLink,
    },
  },
  {
    key: "maps",
    icon: MapPinned,
    accent: "text-purple-500",
    bg: "bg-purple-500/10 text-purple-500",
    items: ["archive"],
  },
];

const defaultItemIcons: Record<string, LucideIcon> = {
  oris: Target,
  obo: FolderOpenDot,
  csos: Globe,
  rules: ShieldCheck,
  guidelines: FileText,
  archive: MapPinned,
};

export default function LinksPage() {
  const t = useTranslations("links");
  const [query, setQuery] = useState("");

  const filteredSections = useMemo(() => {
    const q = query.toLowerCase().trim();
    return sectionConfig
      .map((section) => {
        const items = section.items
          .map<LinkItem | null>((itemKey) => {
            const title = t(`sections.${section.key}.items.${itemKey}.title`);
            const description = t(`sections.${section.key}.items.${itemKey}.description`);
            const Icon =
              section.customIcons?.[itemKey as keyof typeof section.customIcons] ??
              defaultItemIcons[itemKey] ??
              section.icon;
            const ActionIcon =
              section.actions?.[itemKey as keyof typeof section.actions] ??
              section.actionIcon ??
              ExternalLink;
            const matches =
              !q ||
              title.toLowerCase().includes(q) ||
              description.toLowerCase().includes(q) ||
              t(`sections.${section.key}.label`).toLowerCase().includes(q);

            if (!matches) return null;
            return {
              key: itemKey,
              title,
              description,
              Icon,
              ActionIcon,
            };
          })
          .filter((item): item is LinkItem => Boolean(item));

        if (items.length === 0) return null;
        return { ...section, label: t(`sections.${section.key}.label`), items };
      })
      .filter(
        (section): section is SectionShape & { label: string; items: LinkItem[] } =>
          section !== null,
      );
  }, [query, t]);

  return (
    <div className="space-y-8 lg:space-y-10">
      <Card className="border-border bg-card/80 p-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <Link href="../">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t("title")}</p>
            <h1 className="text-2xl font-semibold text-foreground">{t("title")}</h1>
          </div>
        </div>
        <div className="mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t("searchPlaceholder")}
              className="h-12 rounded-2xl border-border bg-background pl-9"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </div>
      </Card>

      {filteredSections.length > 0 ? (
        filteredSections.map((section) => (
          <section key={section.key} className="space-y-3">
            <div className="flex items-center gap-3 px-1">
              <div
                className={cn("flex h-10 w-10 items-center justify-center rounded-2xl", section.bg)}
              >
                <section.icon className="h-5 w-5" />
              </div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {section.label}
              </h2>
            </div>
            <Card className="border-border/70 bg-card/80">
              <div className="divide-y divide-border/60">
                {section.items.map((item) => (
                  <Link
                    key={item.key}
                    href="#"
                    className="flex items-center gap-4 px-4 py-4 transition hover:bg-muted/40"
                  >
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-2xl",
                        section.bg,
                      )}
                    >
                      <item.Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-base font-medium text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <item.ActionIcon className="h-5 w-5 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </Card>
          </section>
        ))
      ) : (
        <Card className="border-border/70 bg-card/80 p-6 text-center text-sm text-muted-foreground">
          {t("searchPlaceholder")}
        </Card>
      )}

      <div className="rounded-3xl border border-primary/20 bg-primary/10 p-6 text-center">
        <Button
          variant="ghost"
          className="mx-auto mb-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-primary/50 text-primary hover:bg-primary/20 lg:w-auto"
        >
          <Mail className="h-4 w-4" />
          {t("contactCta")}
        </Button>
      </div>
    </div>
  );
}
