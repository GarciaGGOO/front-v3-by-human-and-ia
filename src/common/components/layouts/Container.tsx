import { cn } from "@/common/lib/utils/mergeClasses";
import type { BaseProps } from "@/common/types/index";

interface ContainerProps extends BaseProps {
  bordered?: boolean;
}

export function Container({ className, children, bordered = false }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
        bordered
          ? "rounded-lg border bg-white p-6 border-gray-200 dark:border-gray-800 dark:bg-gray-900"
          : "",
        className
      )}
    >
      {children}
    </div>
  );
}
