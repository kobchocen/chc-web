import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Flag,
  MapPinned,
  MapPin,
  Plus,
  Users,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

type PageParams = { locale: Locale };

type PageProps = {
  params: Promise<PageParams>;
};

const attendeeAvatars = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC_a11OsbXc7ezszeHlV7HLQT4I1VzlwpBFnTvc-6JxkNFY4nxGpeBQ-xEVgJdiFuazaIzBGAQ4jPG7T5lo9vbRMN5CBb5WgCZovkoLHc394YmPK1oS0hd_LREdJcCTNnBB7SGy6SUnFL4_y_fbE6xYX-_5OMPunLXP6-rSJfaqMile2YgnxV5t61Heqk1lE81UBOOBY0dKIaKvvdDhxHDQ8S4i-JNjdoJWVjsNC3Z8wQlm__JhPoCRactUvPyL3tGJaHwpLGE_B-I",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCBuqV1TEUi1WbEirA-Ji3X4bEZiuho7C1yPfXqv0doYhOLAl5aEXk4rxjr-iIns90ZvRoVok_X5h4I6BdLp0wYtAuqu4wDpJspT_JbLrutPxjMCdN9qSQ8Kx8g_SaSQZ1lNlrqdhVlTc64OThcGBCl7qWIge5TKURcBJY9IaObBWxMuIy1oobxOkHFceIO93PaLRdGxh0NmRiwZ2v38OhTmpqGOAlnBEnGTRnE-L9gs78_pk2wu1EPhtF68wmXOWFcPVWFhQHd64Q",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCgqR83YngwCkhTiiVpDPylpMeJml3JJCRp40Z7wPMYx_WN3phJ06sHOWwmc92F8DbDIGE9p_Q1oToMqlqJOe9BB7aBtugn9LA7otlKPL5ZIafAPxit9tJAyt_ENVrGlkJiQ2uLSFTOk1Re661WvkbcjIMSCgrtj4FV4WoBBeOlkV-Z-7G15ks_C7QHInVnCxeuoclWJqfE5cgM6QqmyOam1QQ2sZAuBBh3X1oDDxFhhHCGLhQmKdwYWSUFhK-Wx8nVvfDXe7uF0DI",
];

const eventImages = {
  race: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-0UeQYaoZtC3InKCQ3svUkh21GBTLKrOFtLDGbWdWAFFoolH3eShaMVT5gPy0u1Sh64-se6q8L52p3h6EMobrrvEI7JI6LHASDCoSdTex-jWNZknYnX2YEkyiam0ZcNe3EQ67kqoKBbmP9hug0Joj9RDVpeTepuQG-mtb7rYNJbJEL6i3gJFrcDzVDW9AkE6DA1Yfrx4lmvRJzTu9JsyUkiIN5W-nSfaNKkgJGFAFSPSTlGuU2zybDUD357rppTHwzAwe_HBgMCA",
};

export default async function CalendarPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "calendar" });

  const viewModes = [
    { key: "month", label: t("viewModes.month"), active: true },
    { key: "list", label: t("viewModes.list") },
  ];

  const filters = [
    { key: "all", label: t("filters.all"), active: true },
    { key: "trainings", label: t("filters.trainings") },
    { key: "races", label: t("filters.races") },
    { key: "camps", label: t("filters.camps") },
  ];

  const daysInMonth = 31;
  const startOffset = 4;
  const specialDays: Record<number, "today" | "primary" | "danger"> = {
    3: "primary",
    5: "today",
    7: "danger",
    10: "primary",
    13: "danger",
    17: "primary",
    24: "primary",
    28: "danger",
  };

  const calendarDays = [
    ...Array.from({ length: startOffset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];
  const weekdayLabels = (() => {
    const raw = t.raw("weekdays");
    return Array.isArray(raw) ? (raw as string[]) : [];
  })();

  const events = [
    {
      id: "mapTraining",
      tag: t("events.mapTraining.tag"),
      time: t("events.mapTraining.time"),
      title: t("events.mapTraining.title"),
      location: t("events.mapTraining.location"),
      group: t("events.mapTraining.group"),
      detail: t("events.mapTraining.detail"),
      badgeClasses: "bg-primary/15 text-primary border-primary/30",
      accent: "text-primary",
      hasAttendees: true,
    },
    {
      id: "race",
      tag: t("events.race.tag"),
      time: t("events.race.time"),
      title: t("events.race.title"),
      location: t("events.race.location"),
      map: t("events.race.map"),
      badgeClasses: "bg-destructive/10 text-destructive border-destructive/30",
      accent: "text-destructive",
      imageUrl: eventImages.race,
    },
    {
      id: "camp",
      tag: t("events.camp.tag"),
      time: t("events.camp.time"),
      title: t("events.camp.title"),
      location: t("events.camp.location"),
      badgeClasses: "bg-blue-500/15 text-blue-500 border-blue-500/30",
      accent: "text-blue-500",
    },
    {
      id: "runTraining",
      tag: t("events.runTraining.tag"),
      time: t("events.runTraining.time"),
      title: t("events.runTraining.title"),
      location: t("events.runTraining.location"),
      badgeClasses: "bg-primary/15 text-primary border-primary/30",
      accent: "text-primary",
    },
  ];

  return (
    <div className="space-y-8 lg:space-y-10">
      <Card className="border-border bg-card/80 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t("title")}</p>
            <h1 className="text-2xl font-semibold text-foreground">{t("title")}</h1>
          </div>
          <Button variant="link" className="px-0 text-primary" size="sm">
            {t("today")}
          </Button>
        </div>
        <div className="mt-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 rounded-2xl border border-border/60 bg-muted/20 p-1">
            {viewModes.map((mode) => (
              <Button
                key={mode.key}
                variant={mode.active ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "flex-1 rounded-xl",
                  mode.active ? "" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {mode.label}
              </Button>
            ))}
          </div>
          <div className="no-scrollbar flex gap-2 overflow-x-auto pt-1">
            {filters.map((filter) => (
              <Button
                key={filter.key}
                variant={filter.active ? "default" : "outline"}
                size="sm"
                className={cn(
                  "rounded-full",
                  filter.active ? "bg-primary text-primary-foreground" : "border-border/80",
                )}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      <Card className="border-border bg-card/80 p-6">
        <div className="flex items-center justify-between gap-4 pb-4">
          <Button variant="ghost" size="icon" className="rounded-full border border-border/60">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <p className="text-lg font-semibold text-foreground">{t("monthLabel")}</p>
          <Button variant="ghost" size="icon" className="rounded-full border border-border/60">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {weekdayLabels.map((weekday) => (
            <span key={weekday} className="py-1">
              {weekday}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-4 pt-4">
          {calendarDays.map((day, index) =>
            day ? (
              <button
                key={`${day}-${index}`}
                type="button"
                className={cn(
                  "relative flex h-10 items-center justify-center rounded-full text-sm font-medium transition-colors",
                  specialDays[day] === "today"
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted/40",
                )}
              >
                {day}
                {specialDays[day] && specialDays[day] !== "today" ? (
                  <span
                    className={cn(
                      "absolute bottom-1 h-1.5 w-1.5 rounded-full",
                      specialDays[day] === "primary" ? "bg-primary" : "bg-destructive",
                    )}
                  />
                ) : null}
              </button>
            ) : (
              <div key={`blank-${index}`} className="h-10" />
            ),
          )}
        </div>
      </Card>

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-foreground">{t("upcomingTitle")}</h2>
          <Button variant="link" size="sm" className="px-0 text-primary" asChild>
            <Link href="#">{t("viewAll")}</Link>
          </Button>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {events.map((event) => (
            <Card
              key={event.id}
              className={cn(
                "space-y-4 border-border/70 bg-card/80 p-5 shadow-sm transition hover:border-primary/50",
                event.id === "mapTraining" ? "border-primary/30" : undefined,
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className={cn("border text-xs", event.badgeClasses)}>
                      {event.tag}
                    </Badge>
                    <span className="text-xs font-medium text-muted-foreground">{event.time}</span>
                  </div>
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                </div>
                {event.id === "race" ? (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-destructive">
                    <Flag className="h-5 w-5" />
                  </div>
                ) : event.id === "mapTraining" ? (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-primary">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-muted-foreground">
                    <MapPinned className="h-5 w-5" />
                  </div>
                )}
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                {event.group ? (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{event.group}</span>
                  </div>
                ) : null}
              </div>

              {event.id === "mapTraining" ? (
                <div className="flex items-center justify-between border-t border-border/60 pt-3">
                  <div className="flex -space-x-2">
                    {attendeeAvatars.map((avatar, index) => (
                      <div
                        key={`${event.id}-attendee-${index}`}
                        className="h-7 w-7 overflow-hidden rounded-full border-2 border-background"
                      >
                        <Image
                          alt=""
                          src={avatar}
                          width={28}
                          height={28}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-muted text-[11px] font-medium text-muted-foreground">
                      +12
                    </div>
                  </div>
                  <Button variant="link" size="sm" className="gap-1 text-primary">
                    {event.detail}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ) : null}

              {event.imageUrl ? (
                <div className="relative h-28 overflow-hidden rounded-2xl">
                  <Image
                    alt={event.title}
                    src={event.imageUrl}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 300px, 100vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                      <MapPinned className="h-3.5 w-3.5" />
                      {event.map}
                    </span>
                  </div>
                </div>
              ) : null}
            </Card>
          ))}
        </div>
      </section>

      <Button
        type="button"
        className="fixed bottom-24 right-6 z-40 h-14 w-14 rounded-full shadow-xl shadow-primary/30 lg:hidden"
        size="icon"
      >
        <Plus className="h-6 w-6" />
        <span className="sr-only">{t("floatingCta")}</span>
      </Button>
    </div>
  );
}
