import type { MetadataRoute } from "next";

import { siteFeatures } from "@/config/features";
import { siteConfig, siteNavigation } from "@/config/site";
import { defaultLocale, locales } from "@/lib/i18n/config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.contact.website;
  const staticPaths = siteFeatures.maintenance.enabled
    ? ["/"]
    : Array.from(
        new Set(["/", ...siteNavigation.map((item) => item.href).filter((href) => href !== "#")]),
      );

  return locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${baseUrl}/${locale}${path === "/" && locale === defaultLocale ? "" : path}`.replace(
        /\/$/,
        "",
      ),
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? 1 : 0.7,
    })),
  );
}
