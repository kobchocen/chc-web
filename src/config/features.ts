import { defaultLocale, isLocale } from "@/lib/i18n/config";

function readBooleanEnv(value: string | undefined, fallback = false) {
  if (value === undefined) {
    return fallback;
  }

  const normalized = value.trim().toLowerCase();

  if (["1", "true", "yes", "on"].includes(normalized)) {
    return true;
  }

  if (["0", "false", "no", "off"].includes(normalized)) {
    return false;
  }

  return fallback;
}

export const siteFeatures = {
  maintenance: {
    enabled: readBooleanEnv(process.env.NEXT_PUBLIC_SITE_MAINTENANCE, false),
    allowedRoutes: ["/"] as const,
  },
} as const;

export function normalizeAppPath(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return "/";
  }

  const [first, ...rest] = segments;

  if (isLocale(first)) {
    return rest.length === 0 ? "/" : `/${rest.join("/")}`;
  }

  return pathname;
}

export function getPathLocale(pathname: string) {
  const [firstSegment] = pathname.split("/").filter(Boolean);
  return firstSegment && isLocale(firstSegment) ? firstSegment : defaultLocale;
}

export function isMaintenanceRouteAllowed(pathname: string) {
  if (!siteFeatures.maintenance.enabled) {
    return true;
  }

  const normalizedPath = normalizeAppPath(pathname);

  return siteFeatures.maintenance.allowedRoutes.some((route) => route === normalizedPath);
}
