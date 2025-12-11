import { NavItem } from "@/components/molecules/nav-item";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type NavEntry = {
  label: string;
  icon: LucideIcon;
  active?: boolean;
};

type BottomNavigationProps = {
  items: NavEntry[];
  className?: string;
};

export function BottomNavigation({ items, className }: BottomNavigationProps) {
  return (
    <nav
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-background/90 px-3 pb-3 pt-2 backdrop-blur",
        className,
      )}
    >
      <div className="mx-auto flex max-w-3xl items-end justify-around">
        {items.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </div>
    </nav>
  );
}
