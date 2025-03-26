import { forwardRef, useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/common/lib/utils/mergeClasses";
import type { BaseProps } from "@/common/types/index";
import { Button } from "@/common/components/ui/Button";

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
    const [tooltipStyles, setTooltipStyles] = useState({ top: 0, left: 0 });
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const tooltipRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (isHovered && buttonRef.current && tooltipRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();

        const tooltipPositions = {
          left: {
            top:
              buttonRect.top + buttonRect.height / 2 - tooltipRect.height / 2,
            left: buttonRect.left - tooltipRect.width - 8, // 8px de espaço
          },
          right: {
            top:
              buttonRect.top + buttonRect.height / 2 - tooltipRect.height / 2,
            left: buttonRect.right + 8,
          },
          top: {
            top: buttonRect.top - tooltipRect.height - 8,
            left:
              buttonRect.left + buttonRect.width / 2 - tooltipRect.width / 2,
          },
          bottom: {
            top: buttonRect.bottom + 8,
            left:
              buttonRect.left + buttonRect.width / 2 - tooltipRect.width / 2,
          },
        };

        setTooltipStyles(tooltipPositions[tooltipPosition]);
      }
    }, [isHovered, tooltipPosition]);

    return (
      <>
        <Button
          ref={(node) => {
            if (node) {
              buttonRef.current = node;
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                (ref as React.RefObject<HTMLButtonElement>).current =
                  node;
              }
            }
          }}
          className={cn("rounded-full p-2", className)}
          variant="ghost"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label={tooltip}
          {...props}
        >
          {icon}
        </Button>

        {isHovered &&
          createPortal(
            <div
              ref={tooltipRef}
              className="fixed z-50 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded-md shadow-md transition-opacity duration-200"
              style={{ top: tooltipStyles.top, left: tooltipStyles.left }}
            >
              {tooltip}
            </div>,
            document.body
          )}
      </>
    );
  }
);

IconButton.displayName = "IconButton";
