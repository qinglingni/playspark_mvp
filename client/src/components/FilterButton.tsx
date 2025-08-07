import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FilterButtonProps {
  children: ReactNode;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

export function FilterButton({ children, isSelected, onClick, className }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-3 border-2 rounded-xl text-center transition-all",
        isSelected
          ? "border-primary bg-primary/5 text-primary"
          : "border-neutral-200 text-neutral-600 hover:border-neutral-300",
        className
      )}
    >
      {children}
    </button>
  );
}
