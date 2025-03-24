import { forwardRef } from "react";
import { cn } from "@/common/lib/utils/mergeClasses";
import type { BaseProps } from "@/common/types/index";

// Props específicas do componente Button
interface ButtonProps extends BaseProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
}

// Componente Button reutilizável com suporte a diferentes variantes e tamanhos
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "rounded-md font-medium transition-colors",
          {
            "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600":
              variant === "primary",
            "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600":
              variant === "secondary",
            "border-2 border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800":
              variant === "outline",
              "bg-transparent text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800":
              variant === "ghost",
            "px-3 py-1.5 text-sm": size === "sm",
            "px-4 py-2 text-base": size === "md",
            "px-6 py-3 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
