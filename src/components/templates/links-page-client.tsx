"use client";

import { Mail, Search } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { ActionListItem } from "@/components/molecules/action-list-item";
import { PageHeading } from "@/components/molecules/page-heading";
import { PageSection } from "@/components/organisms/page-section";
import { PageTemplate } from "@/components/templates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/config/site";
import { defaultResourceActionIcon, resourceSections } from "@/lib/content/links";

export function LinksPageClient() {
  const t = useTranslations("links");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const filteredSections = useMemo(() => {
    return resourceSections
      .map((section) => {
        const sectionLabel = t(`sections.${section.key}.label`);
        const items = section.items
          .map((item) => {
            const title = t(`sections.${section.key}.items.${item.key}.title`);
            const description = t(`sections.${section.key}.items.${item.key}.description`);
            const matches =
              !deferredQuery ||
              sectionLabel.toLowerCase().includes(deferredQuery) ||
              title.toLowerCase().includes(deferredQuery) ||
              description.toLowerCase().includes(deferredQuery);

            if (!matches) {
              return null;
            }

            return {
              ...item,
              title,
              description,
            };
          })
          .filter((item): item is NonNullable<typeof item> => Boolean(item));

        if (items.length === 0) {
          return null;
        }

        return {
          ...section,
          label: sectionLabel,
          items,
        };
      })
      .filter((section): section is NonNullable<typeof section> => Boolean(section));
  }, [deferredQuery, t]);

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
            <div className="relative w-full min-w-[16rem] sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={t("searchPlaceholder")}
                className="h-11 rounded-2xl bg-background pl-9"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
          }
        />
      }
      main={
        filteredSections.length > 0 ? (
          <>
            {filteredSections.map((section) => (
              <PageSection
                key={section.key}
                title={section.label}
                surface="default"
                contentClassName="p-2 sm:p-3"
              >
                <div className="grid gap-2">
                  {section.items.map((item) => (
                    <ActionListItem
                      key={`${section.key}-${item.key}`}
                      href={item.href}
                      title={item.title}
                      description={item.description}
                      icon={item.icon ?? section.icon}
                      actionIcon={item.actionIcon ?? defaultResourceActionIcon}
                      tone={section.tone}
                      linkKind={item.kind ?? "external"}
                    />
                  ))}
                </div>
              </PageSection>
            ))}
          </>
        ) : (
          <div className="surface-panel px-6 py-10 text-center text-sm text-muted-foreground">
            {t("emptyState")}
          </div>
        )
      }
      after={
        <div className="surface-panel px-6 py-6 text-center">
          <Button className="gap-2" asChild>
            <a href={`mailto:${siteConfig.contact.email}`}>
              <Mail className="h-4 w-4" />
              {t("contactCta")}
            </a>
          </Button>
        </div>
      }
    />
  );
}
