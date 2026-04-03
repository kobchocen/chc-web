import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

import { getPathLocale, isMaintenanceRouteAllowed, siteFeatures } from "./config/features";
import { routing } from "./lib/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  if (siteFeatures.maintenance.enabled && !isMaintenanceRouteAllowed(request.nextUrl.pathname)) {
    const locale = getPathLocale(request.nextUrl.pathname);
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(cs|en)/:path*"],
};
