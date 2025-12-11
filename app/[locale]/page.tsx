import { CalendarCheck2, Info, MapPin, Medal, Timer } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { HeroBanner } from "@/components/organisms/hero-banner";
import { NewsSection } from "@/components/organisms/news-section";
import { QuickActionsGrid } from "@/components/organisms/quick-actions-grid";

type PageProps = {
  params: { locale: string };
};

export default async function HomePage({ params: { locale } }: PageProps) {
  const t = await getTranslations({ locale, namespace: "home" });

  const heroData = {
    label: t("hero.label"),
    title: t("hero.title"),
    location: t("hero.location"),
    startIn: t("hero.startIn"),
    startLabel: t("hero.startLabel"),
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAYYy9JLH9lb7eodQEWz_TZcLi7oKI28axiuWbpTlmFGud9lzfiDVOOy_Cm4HcAxbgvZS85KgNbzl4M9SQhc4y2C0wR6rdyY5o8kpqDnKjs_bVFc6J18JKliROhinK-ubc2i27wkbUoB4tM0oQmMlLa-qvGTbquHvtIMtCZmLvg7mh9Fuh0JH9XvZQr4cu_xiIzP5LFRI_ENQ-3mlGLkKDeMGkbYRid5I42ee02r7hV0GGVe7pZ-4wAS6c5Xs4aXI_d-NDbeGb0uIA",
    imageAlt: t("hero.imageAlt"),
  };

  const quickActions = [
    { title: t("actions.calendar"), icon: CalendarCheck2 },
    { title: t("actions.results"), icon: Medal },
    { title: t("actions.trainings"), icon: MapPin },
    { title: t("actions.about"), icon: Info },
  ];

  const highlight = {
    title: t("news.highlight.title"),
    description: t("news.highlight.description"),
    date: t("news.highlight.date"),
    badge: t("news.highlight.badge"),
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCH2FVPhv1T4_q6WuInwYacrxRGcABdNOb20t5LtywwNKfulwwTrCzdY2uR8q5lOU9lDxKl0VZqrjKAAhK3_Fe-pFmJPWri3OX-HKCa3NfVxK97K47_psPA-UClhjtIHp577J8fxIrnG1vmqClZE5MHpbEeTKa9pns5LFbbSwWxU8vx0QOq7X2q-F-ENCw8Ni-fDJvs4PvOZqOCz0wxHZce_IDnnWoT6_ns-7AKysvBWCCrv_VUr1gdfS-3vuV-rM-7CkNznDwWVX8",
    imageAlt: t("news.highlight.imageAlt"),
    ctaLabel: t("news.highlight.cta"),
    icon: Timer,
  };

  const newsItems = [
    {
      category: t("news.items.training.category"),
      title: t("news.items.training.title"),
      description: t("news.items.training.description"),
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBgzHzVHu-0pHRS4V-3MTpR-RV-gmYSmGpIZnu9MTfmhSGOfMjZ1EW2V1yPwpStsbRR45XLT2V24BZiBj0GgW4WWQ90Zu1lJ9LPSJe0P3BQdLW50YNtwY8PGYuKiAg2FP9KmnIA2ErsX7RLEARHzFTPmnO5D4uKZh-gUMTu3ADE6XzDjk9Dfr4joF9i-smkAtVZJqeB2apoIVueUjkcwwKHKsKKqXKWO6D7Qii3YzJQUIwPW_9bTOdeAuSDGF830O2FvsmjPBfApWA",
      imageAlt: t("news.items.training.imageAlt"),
    },
    {
      category: t("news.items.club.category"),
      title: t("news.items.club.title"),
      description: t("news.items.club.description"),
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBvH5q5b2GSPXwvzbGSCyx4uzfYZLZnxvmU44nUAShifFpj7zslPqdqTGQEc6hP4PPygsu7qaArxet4PNcJAIFkTPtlm2O3o_R2U8T4zGPRTVyEKGVJmAiJRtZZ-4KbIHyahNdRjCtJfQO1rxls519vdrcfSBOmSyIYBHrDM2yJz7vXGvYGGy57qAV0dyr_inHBPVzW7QffAMFP4xV-ehQLgu2NKXlnxOxpTFuvu3_pHuGqPU8IfYMCTR_rNOyxC2_YlBT3jyA-Jzo",
      imageAlt: t("news.items.club.imageAlt"),
    },
    {
      category: t("news.items.race.category"),
      title: t("news.items.race.title"),
      description: t("news.items.race.description"),
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCCv73aQUYrGj7StWA_-F5WWPqOtAFMNJM-JHiCkku8V5LkPSRoGhrmQlWG5XiSfyeIOMaRp-5rNBZouWyTu3XVDjtBdkbK7pXyW1zt7pw456WjBATgkw93zGH82ccONsprCejHzjoQ8jhZcaAs8k1xTfFcYSkDTfc_Bg7TcxiwQBR9KNdSfOoUte2Wcaz17Gh4BqdLf9q39t40hFUDWTKIODJHKdXHVTErw-pJR4bUskjHuUVLh6rO1KMQ5wsaoYoSV25yt3KMBC8",
      imageAlt: t("news.items.race.imageAlt"),
    },
  ];

  return (
    <>
      <HeroBanner {...heroData} />
      <QuickActionsGrid actions={quickActions} title={t("actions.title")} />
      <NewsSection
        title={t("news.title")}
        viewAllLabel={t("news.viewAll")}
        highlightLabel={t("news.highlightLabel")}
        highlight={highlight}
        items={newsItems}
      />
    </>
  );
}
