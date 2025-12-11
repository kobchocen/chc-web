import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { LocaleProvider } from "@/components/providers/locale-provider";
import { SiteLayout } from "@/components/templates/site-layout";
import { ThemeProvider } from "@/components/theme-provider";
import { locales } from "@/lib/i18n/config";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: LocaleLayoutProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({ children, params: { locale } }: LocaleLayoutProps) {
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LocaleProvider locale={locale}>
        <ThemeProvider defaultTheme="dark">
          <SiteLayout>{children}</SiteLayout>
        </ThemeProvider>
      </LocaleProvider>
    </NextIntlClientProvider>
  );
}
