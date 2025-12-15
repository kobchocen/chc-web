import { getRequestConfig } from "next-intl/server";
import type { Locale } from "./src/lib/i18n/config";
import { defaultLocale, locales } from "./src/lib/i18n/config";

const isLocale = (locale: string | undefined): locale is Locale =>
  typeof locale === "string" && (locales as readonly string[]).includes(locale);

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = isLocale(locale) ? locale : defaultLocale;

  return {
    locale: resolvedLocale,
    messages: (await import(`./src/i18n/locales/${resolvedLocale}/common.json`)).default,
  };
});
