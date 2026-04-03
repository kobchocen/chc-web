"use client";

import { Children } from "react";
import { useTranslations } from "next-intl";

import { IconButton } from "@/components/atoms/icon-button";
import { LocaleSwitcher } from "@/components/atoms/locale-switcher";
import { ThemeToggle } from "@/components/atoms/theme-toggle";
import { siteFeatures } from "@/config/features";
import { siteConfig, siteHeaderActions, siteNavigation, siteSocialLinks } from "@/config/site";
import { BottomNavigation } from "@/components/organisms/bottom-navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Locale, locales } from "@/lib/i18n/config";
import { Link, usePathname } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils";

type SiteLayoutProps = {
  children: React.ReactNode;
};

type NavItem = {
  label: string;
  href: string;
  icon: (typeof siteNavigation)[number]["icon"];
  active: boolean;
};

function normalizePathname(pathname: string | null) {
  if (!pathname) {
    return "/";
  }

  const segments = pathname.split("/");
  const localeSegment = segments[1];

  if (locales.includes(localeSegment as Locale)) {
    const remainder = segments.slice(2).join("/");
    return remainder ? `/${remainder}` : "/";
  }

  return pathname;
}

function SiteHeaderActions({ notificationLabel }: { notificationLabel: string }) {
  return (
    <div className="flex items-center gap-2">
      <LocaleSwitcher />
      <ThemeToggle />
      {siteHeaderActions.map((action) => (
        <IconButton
          key={action.key}
          icon={action.icon}
          aria-label={action.key === "notifications" ? notificationLabel : action.label}
        />
      ))}
    </div>
  );
}

function SiteBrand({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{t("club")}</p>
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">{t("title")}</h2>
          <p className="max-w-xs text-sm text-muted-foreground">{t("tagline")}</p>
        </div>
      </div>
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
        <span className="text-sm font-semibold tracking-[0.24em]">{siteConfig.shortName}</span>
      </div>
    </div>
  );
}

function NavigationList({ navItems }: { navItems: NavItem[] }) {
  return (
    <div className="flex flex-col gap-2">
      {navItems.map((item) => (
        <Button
          key={item.label}
          type="button"
          variant={item.active ? "default" : "ghost"}
          className={cn(
            "h-12 justify-start gap-3 rounded-2xl px-4 text-sm",
            !item.active && "text-muted-foreground hover:text-foreground",
          )}
          size="lg"
          asChild
        >
          <Link href={item.href} className="flex w-full items-center gap-3">
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        </Button>
      ))}
    </div>
  );
}

export function SiteLayout({ children }: SiteLayoutProps) {
  const t = useTranslations("layout");
  const pathname = usePathname();
  const showNavigation = !siteFeatures.maintenance.enabled;

  const normalizedPath = normalizePathname(pathname);
  const navItems: NavItem[] = siteNavigation.map((item) => ({
    ...item,
    label: t(`nav.${item.key}`),
    active: normalizedPath === item.href,
  }));

  const childArray = Children.toArray(children);
  const mainContent = childArray[0] ?? null;
  const extraContent = childArray.slice(1);
  const year = new Date().getFullYear();

  return (
    <div className="relative min-h-screen text-foreground">
      <div className="mx-auto w-full max-w-[112rem] px-4 pb-28 pt-4 sm:px-6 lg:pb-12 lg:pt-8 xl:px-10">
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[300px_minmax(0,1fr)] xl:gap-8">
          <aside className="hidden lg:sticky lg:top-8 lg:flex lg:h-fit lg:flex-col lg:gap-4">
            <Card className="nav-surface p-6">
              <div className="space-y-6">
                <SiteBrand t={t} />
                <div className="border-t border-border/60 pt-4">
                  <SiteHeaderActions notificationLabel={t("notifications")} />
                </div>
              </div>
            </Card>

            {showNavigation ? (
              <Card className="nav-surface p-4">
                <NavigationList navItems={navItems} />
              </Card>
            ) : null}

            <Card className="surface-subtle px-5 py-5">
              <div className="space-y-4">
                <p className="text-sm leading-6 text-muted-foreground">{t("description")}</p>
                <div className="flex flex-wrap gap-2">
                  {siteSocialLinks.slice(0, 2).map((item) =>
                    item.href ? (
                      <Button
                        key={item.key}
                        variant="secondary"
                        size="sm"
                        className="gap-2"
                        asChild
                      >
                        <a href={item.href} target="_blank" rel="noreferrer">
                          <item.icon className="h-4 w-4" />
                          {item.label}
                        </a>
                      </Button>
                    ) : null,
                  )}
                </div>
              </div>
            </Card>
          </aside>

          <div className="page-stack">
            <Card className="nav-surface px-4 py-4 lg:hidden">
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                      {t("club")}
                    </p>
                    <h2 className="text-xl font-semibold tracking-tight text-foreground">
                      {t("title")}
                    </h2>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                    <span className="text-sm font-semibold tracking-[0.24em]">
                      {siteConfig.shortName}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <p className="max-w-[18rem] text-sm text-muted-foreground">{t("tagline")}</p>
                  <SiteHeaderActions notificationLabel={t("notifications")} />
                </div>
              </div>
            </Card>

            <main className="page-stack">{mainContent}</main>
            {extraContent.length > 0 ? <div className="page-stack">{extraContent}</div> : null}

            <footer className="surface-subtle px-5 py-4 text-sm text-muted-foreground">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p>
                  © {year} {siteConfig.name}. {t("footer")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {siteSocialLinks.slice(0, 2).map((item) =>
                    item.href ? (
                      <Button key={item.key} variant="ghost" size="sm" className="gap-2" asChild>
                        <a href={item.href} target="_blank" rel="noreferrer">
                          <item.icon className="h-4 w-4" />
                          {item.label}
                        </a>
                      </Button>
                    ) : null,
                  )}
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>

      {showNavigation ? <BottomNavigation items={navItems} className="lg:hidden" /> : null}
    </div>
  );
}
