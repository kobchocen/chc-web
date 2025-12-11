"use client";

import { Children, useMemo } from "react";
import { Bell, CalendarCheck2, Home, Info, Link2, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { IconBadge } from "@/components/atoms/icon-badge";
import { IconButton } from "@/components/atoms/icon-button";
import { LocaleSwitcher } from "@/components/atoms/locale-switcher";
import { ThemeToggle } from "@/components/atoms/theme-toggle";
import { BottomNavigation } from "@/components/organisms/bottom-navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Locale, locales } from "@/lib/i18n/config";
import { Link, usePathname } from "@/lib/i18n/routing";

type SiteLayoutProps = {
  children: React.ReactNode;
};

//
// ────────────────────────────────────────────────────────────
//   HEADER CONTENT (outside component, pure, deterministic)
// ────────────────────────────────────────────────────────────
//

type HeaderContentProps = {
  t: ReturnType<typeof useTranslations>;
};

const HeaderContent = ({ t }: HeaderContentProps) => (
  <>
    <div className="flex items-center gap-3">
      <IconBadge icon={Home} variant="primary" />
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t("club")}</p>
        <h2 className="text-lg font-bold text-foreground">{t("title")}</h2>
      </div>
    </div>

    <div className="flex items-center gap-2">
      <LocaleSwitcher />
      <ThemeToggle />
      <IconButton icon={Bell} aria-label={t("notifications")} />
    </div>
  </>
);

//
// ────────────────────────────────────────────────────────────
//   NAVIGATION LIST (outside component, pure)
// ────────────────────────────────────────────────────────────
//

type NavItem = {
  label: string;
  icon: LucideIcon;
  href: string;
  active: boolean;
};

type NavigationListProps = {
  navItems: NavItem[];
};

const NavigationList = ({ navItems }: NavigationListProps) => (
  <div className="flex flex-col gap-2">
    {navItems.map((item) => (
      <Button
        key={item.label}
        type="button"
        variant={item.active ? "default" : "ghost"}
        className="justify-start gap-3"
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

//
// ────────────────────────────────────────────────────────────
//   SITE LAYOUT (clean, deterministic, no purity violations)
// ────────────────────────────────────────────────────────────
//

export function SiteLayout({ children }: SiteLayoutProps) {
  const t = useTranslations("layout");
  const pathname = usePathname();

  // Navigation config (pure object)
  const navigationItems = [
    { label: t("nav.home"), icon: Home, href: "/" },
    { label: t("nav.calendar"), icon: CalendarCheck2, href: "/calendar" },
    { label: t("nav.about"), icon: Info, href: "/about" },
    { label: t("nav.links"), icon: Link2, href: "/links" },
    { label: t("nav.profile"), icon: User, href: "#" },
  ];

  // Normalize path once
  const normalizedPath = useMemo(() => {
    if (!pathname) return "/";

    const segments = pathname.split("/");
    const localeSegment = segments[1];

    if (locales.includes(localeSegment as Locale)) {
      const remainder = segments.slice(2).join("/");
      return remainder ? `/${remainder}` : "/";
    }

    return pathname;
  }, [pathname]);

  // Add "active" field to navigation items
  const navItems: NavItem[] = navigationItems.map((item) => ({
    ...item,
    active: normalizedPath === item.href,
  }));

  const childArray = Children.toArray(children);
  const mainContent = childArray[0] ?? null;
  const extraContent = childArray.slice(1);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background via-background to-background text-foreground">
      <div className="mx-auto w-full max-w-[110rem] px-4 pb-28 pt-4 sm:px-6 lg:pb-12 lg:pt-10 xl:px-10">
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
          {/* DESKTOP SIDEBAR */}
          <aside className="hidden lg:sticky lg:top-10 lg:flex lg:h-fit lg:max-h-[calc(100vh-5rem)] lg:flex-col lg:gap-6">
            <Card className="flex flex-col gap-6 border-border bg-card/80 p-6">
              <HeaderContent t={t} />
            </Card>

            <Card className="border-border bg-card/80 p-4">
              <NavigationList navItems={navItems} />
            </Card>
          </aside>

          {/* MAIN CONTENT */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* MOBILE HEADER */}
            <Card className="flex items-center justify-between border-border bg-card/80 px-4 py-3 backdrop-blur lg:hidden">
              <HeaderContent t={t} />
            </Card>

            <main className="space-y-6 lg:space-y-8">{mainContent}</main>
          </div>
        </div>

        {/* EXTRA CONTENT */}
        {extraContent.length > 0 && <div className="mt-6 space-y-6 lg:mt-8">{extraContent}</div>}

        <footer className="mt-10 border-t border-border/70 pt-6 text-center text-xs text-muted-foreground">
          © 2025 KOB Choceň. Všechna práva vyhrazena.
        </footer>
      </div>

      {/* MOBILE NAV */}
      <BottomNavigation items={navItems} className="lg:hidden" />
    </div>
  );
}
