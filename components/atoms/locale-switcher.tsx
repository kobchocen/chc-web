"use client";

import { Languages } from "lucide-react";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { locales } from "@/lib/i18n/config";
import { usePathname, useRouter } from "@/lib/i18n/routing";

export function LocaleSwitcher() {
  const locale = useLocale();
  const t = useTranslations("layout");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const nextLocale = locales.find((loc) => loc !== locale) ?? locale;

  function handleSwitch() {
    startTransition(() => {
      router.replace({ pathname, locale: nextLocale });
    });
  }

  return (
    <Button
      type="button"
      onClick={handleSwitch}
      disabled={isPending}
      variant="outline"
      size="icon"
      className="rounded-full border-border bg-card/70 text-foreground transition-colors hover:border-primary/50 hover:text-primary"
      aria-label={t("toggleLanguage")}
    >
      <Languages className="h-5 w-5" />
    </Button>
  );
}
