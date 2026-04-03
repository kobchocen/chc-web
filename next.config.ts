import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./next-intl.config.ts");
const isGithubPagesExport = process.env.NEXT_PUBLIC_GITHUB_PAGES_EXPORT === "true";
const pagesBasePath = (() => {
  const rawValue = process.env.NEXT_PUBLIC_SITE_BASE_PATH?.trim();

  if (!rawValue || rawValue === "/") {
    return "";
  }

  return `/${rawValue.replace(/^\/+|\/+$/g, "")}`;
})();

const nextConfig: NextConfig = {
  output: isGithubPagesExport ? "export" : "standalone",
  trailingSlash: isGithubPagesExport,
  basePath: pagesBasePath || undefined,
  assetPrefix: pagesBasePath || undefined,
  images: {
    unoptimized: isGithubPagesExport,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/aida-public/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
