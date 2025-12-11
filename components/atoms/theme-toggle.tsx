"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const t = useTranslations("layout");
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      type="button"
      onClick={toggleTheme}
      variant="outline"
      size="icon"
      className="rounded-full border-border bg-card/70 text-foreground transition-colors hover:border-primary/50 hover:text-primary"
      aria-label={isDark ? t("toggleThemeLight") : t("toggleThemeDark")}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}
