import { getRequestConfig } from "next-intl/server";
import type { Locale } from "./lib/i18n/config";
import { defaultLocale, locales } from "./lib/i18n/config";

const isLocale = (locale: string): locale is Locale => locales.includes(locale as Locale);

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = isLocale(locale) ? locale : defaultLocale;

  return {
    locale: resolvedLocale,
    messages: (await import(`./i18n/locales/${resolvedLocale}/common.json`)).default,
  };
});
