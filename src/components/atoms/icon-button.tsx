import { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type IconButtonProps = {
  icon: LucideIcon;
  className?: string;
  "aria-label"?: string;
};

export function IconButton({ icon: Icon, className, ...rest }: IconButtonProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "surface-subtle h-10 w-10 border-border text-foreground hover:border-primary/40 hover:text-primary",
        className,
      )}
      type="button"
      {...rest}
    >
      <Icon className="h-5 w-5" strokeWidth={2} />
    </Button>
  );
}
