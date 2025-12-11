import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { LocaleProvider } from "@/providers/locale-provider";
import { SiteLayout } from "@/components/templates/site-layout";
import { ThemeProvider } from "@/providers/theme-provider";
import { Locale, locales } from "@/lib/i18n/config";

type LocaleParams = { locale: Locale };

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<LocaleParams>;
};

type LocaleMetadataProps = {
  params: Promise<LocaleParams>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleMetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
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
