import Image from "next/image";
import { MapPin, Timer } from "lucide-react";
import { SectionLabel } from "@/components/atoms/section-label";
import { cn } from "@/lib/utils";

type HeroBannerProps = {
  label: string;
  title: string;
  location: string;
  startIn: string;
  startLabel: string;
  imageUrl: string;
  imageAlt: string;
  className?: string;
};

export function HeroBanner({
  title,
  location,
  startIn,
  startLabel,
  label,
  imageUrl,
  imageAlt,
  className,
}: HeroBannerProps) {
  return (
    <section
      className={cn(
        "relative min-h-[20rem] overflow-hidden rounded-3xl border border-border bg-card shadow-2xl",
        className,
      )}
    >
      <Image
        alt={imageAlt}
        src={imageUrl}
        fill
        priority
        className="object-cover"
        sizes="(min-width: 1024px) 960px, 100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/70 to-background/10" />
      <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-primary/30 bg-background/80 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary">
        <Timer className="h-4 w-4" />
        {startLabel} {startIn}
      </div>
      <div className="relative z-10 flex h-full flex-col justify-end gap-3 p-6">
        <SectionLabel className="text-primary">{label}</SectionLabel>
        <h1 className="text-3xl font-extrabold leading-tight text-foreground lg:text-4xl">
          {title}
        </h1>
        <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {location}
        </p>
      </div>
    </section>
  );
}
