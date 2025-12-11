"use client";

import { Bell, CalendarCheck2, Home, MapPin, User } from "lucide-react";
import { useTranslations } from "next-intl";

import { IconBadge } from "@/components/atoms/icon-badge";
import { IconButton } from "@/components/atoms/icon-button";
import { LocaleSwitcher } from "@/components/atoms/locale-switcher";
import { ThemeToggle } from "@/components/atoms/theme-toggle";
import { BottomNavigation } from "@/components/organisms/bottom-navigation";
import { Card } from "@/components/ui/card";

type SiteLayoutProps = {
  children: React.ReactNode;
};

export function SiteLayout({ children }: SiteLayoutProps) {
  const t = useTranslations("layout");

  const navItems = [
    { label: t("nav.home"), icon: Home, active: true },
    { label: t("nav.calendar"), icon: CalendarCheck2 },
    { label: t("nav.map"), icon: MapPin },
    { label: t("nav.profile"), icon: User },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background via-background to-background text-foreground">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 pb-28 pt-4 sm:px-6">
        <Card className="flex items-center justify-between border-border bg-card/80 px-4 py-3 backdrop-blur">
          <div className="flex items-center gap-3">
            <IconBadge icon={Home} variant="primary" />
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {t("club")}
              </p>
              <h2 className="text-lg font-bold text-foreground">{t("title")}</h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LocaleSwitcher />
            <ThemeToggle />
            <IconButton icon={Bell} aria-label={t("notifications")} />
          </div>
        </Card>

        <main className="space-y-6">{children}</main>
      </div>
      <BottomNavigation items={navItems} />
    </div>
  );
}
