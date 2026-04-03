import { redirect } from "next/navigation";
import { siteFeatures } from "@/config/features";
import { defaultLocale } from "@/lib/i18n/config";

export default function RootPage() {
  if (siteFeatures.githubPages.export) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <meta httpEquiv="refresh" content={`0;url=${defaultLocale}/`} />
        <p className="text-sm text-muted-foreground">Redirecting to the maintenance homepage…</p>
        <a href={`${defaultLocale}/`} className="text-sm font-semibold text-primary underline">
          Continue
        </a>
      </main>
    );
  }

  redirect(`/${defaultLocale}`);
}
