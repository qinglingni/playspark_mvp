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
        "p-3 border-3 rounded-2xl text-center transition-all transform",
        isSelected
          ? "border-purple-400 bg-gradient-to-br from-purple-100 to-pink-100 text-purple-800 scale-105 shadow-lg"
          : "border-purple-200 text-purple-600 hover:border-purple-300 hover:bg-purple-50 hover:scale-105",
        className
      )}
    >
      {children}
    </button>
  );
}
