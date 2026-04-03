import { notFound } from "next/navigation";

import { LinksPageClient } from "@/components/templates/links-page-client";
import { isMaintenanceRouteAllowed } from "@/config/features";
import { isLocale } from "@/lib/i18n/config";

type PageParams = { locale: string };

type PageProps = {
  params: Promise<PageParams>;
};

export default async function LinksPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale) || !isMaintenanceRouteAllowed("/links")) {
    notFound();
  }

  return <LinksPageClient />;
}
