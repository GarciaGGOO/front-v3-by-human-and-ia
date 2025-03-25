// IconButton.tsx
import { forwardRef, useState } from "react";
import { cn } from "@/common/lib/utils/mergeClasses";
import type { BaseProps } from "@/common/types/index";
import { Button } from "@/common/components/ui/Button"; // Importe seu Button aqui

interface IconButtonProps extends BaseProps {
  icon: React.ReactNode;
  tooltip: string;
  tooltipPosition?: "left" | "right" | "top" | "bottom";
  onClick?: () => void;
  disabled?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, icon, tooltip, tooltipPosition = "right", ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    const tooltipClasses = {
      left: "right-full top-1/2 -translate-y-1/2 mr-2",
      right: "left-full top-1/2 -translate-y-1/2 ml-2",
      top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
      bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    };

    return (
      <div className="relative inline-flex items-center align-middle"> {/* Garantindo alinhamento correto */}
        {isHovered && (
          <div
            className={cn(
              "absolute z-50 w-max rounded-md bg-gray-800 px-2 py-1 text-sm text-white shadow-md opacity-0 transition-opacity duration-200",
              tooltipClasses[tooltipPosition],
              isHovered && "opacity-100"
            )}
          >
            {tooltip}
          </div>
        )}
        {/* Usando o seu componente Button aqui */}
        <Button
          ref={ref}
          className={cn(
            "rounded-full p-2",
            className
          )}
          variant="ghost"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label={tooltip}
          {...props}
        >
          {icon}
        </Button>
      </div>
    );
  }
);

IconButton.displayName = "IconButton";
