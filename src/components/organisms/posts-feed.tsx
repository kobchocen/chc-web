"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState, useTransition } from "react";

import { PageSection } from "@/components/organisms/page-section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "@/lib/i18n/routing";
import { PostKey, postAccentClassName } from "@/lib/content/posts";
import { cn } from "@/lib/utils";

type PostListItem = {
  key: PostKey;
  slug: string;
  category: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
};

type PostsFeedProps = {
  items: PostListItem[];
  perPage: number;
  title: string;
  previousLabel: string;
  nextLabel: string;
  statusTemplate: string;
};

export function PostsFeed({
  items,
  perPage,
  title,
  previousLabel,
  nextLabel,
  statusTemplate,
}: PostsFeedProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isPending, startTransition] = useTransition();
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const pages = useMemo(
    () => Array.from({ length: totalPages }, (_, index) => index + 1),
    [totalPages],
  );
  const paginatedPosts = useMemo(
    () => items.slice((currentPage - 1) * perPage, currentPage * perPage),
    [currentPage, items, perPage],
  );

  const status = statusTemplate
    .replace("{current}", String(currentPage))
    .replace("{total}", String(totalPages));

  const changePage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    startTransition(() => {
      setCurrentPage(page);
    });
  };

  return (
    <>
      <PageSection title={title} surface="default" contentClassName="p-4 lg:p-5">
        <div className="space-y-3">
          {paginatedPosts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`} className="group block">
              <Card className="flex flex-col gap-4 rounded-3xl border border-border/80 bg-card/70 p-4 transition-all hover:border-primary/40 hover:bg-accent/30 md:flex-row">
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted md:w-28">
                  <Image
                    alt={post.title}
                    src={post.imageUrl}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 768px) 112px, 100vw"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 uppercase tracking-wide",
                        postAccentClassName[post.key],
                      )}
                    >
                      {post.category}
                    </span>
                    <span className="text-muted-foreground">{post.date}</span>
                  </div>
                  <h3 className="text-base font-semibold text-foreground">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">{post.description}</p>
                </div>
                <div className="flex items-center justify-end text-muted-foreground">
                  <ChevronRight className="h-5 w-5" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </PageSection>

      <div className="surface-subtle space-y-3 px-4 py-4 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1 || isPending}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            {previousLabel}
          </Button>
          {pages.map((page) => (
            <Button
              key={page}
              type="button"
              variant={page === currentPage ? "default" : "outline"}
              onClick={() => changePage(page)}
              disabled={isPending}
              className="min-w-10"
            >
              {page}
            </Button>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages || isPending}
            className="gap-2"
          >
            {nextLabel}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">{status}</p>
      </div>
    </>
  );
}
