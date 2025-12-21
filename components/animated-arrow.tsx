import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedArrowProps {
  className?: string;
  size?: number;
}

export function AnimatedArrow({ className, size = 16 }: AnimatedArrowProps) {
  return (
    <ArrowRight
      className={cn(
        "ml-2 h-4 w-4 arrow-animate",
        className
      )}
      size={size}
    />
  );
}

