import { forwardRef, useState } from "react";
import { Search as SearchIcon, EyeOff, Eye } from "lucide-react";
import { cn } from "@/common/lib/utils/mergeClasses";
import type { BaseProps } from "@/common/types/index";

interface TextFieldProps extends BaseProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: "input" | "search" | "password";
  size?: "sm" | "md" | "lg";
  placeholder?: string | undefined;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, variant = "input", size = "md", ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prevState) => !prevState);
    };

    const commonClasses =
      "w-full px-4 py-2 text-left border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-500 placeholder-gray-500 dark:placeholder-gray-400";

    const variantClasses = {
      input: commonClasses,
      search: commonClasses + " pr-7",
      password: commonClasses + " pr-10",
    };

    return (
      <div className="relative">
        <input
          ref={ref}
          value={props.value}
          onChange={props.onChange}
          type={
            variant === "password"
              ? isPasswordVisible
                ? "text"
                : "password"
              : variant === "search"
              ? "search"
              : "text"
          }
          placeholder={props.placeholder}
          className={cn(
            commonClasses,
            variantClasses[variant],
            {
              // Tamanhos
              "text-sm": size === "sm",
              "text-base": size === "md",
              "text-lg": size === "lg",
            },
            className
          )}
          {...props}
        />
        {variant === "search" && (
          <SearchIcon className="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
        )}
        {variant === "password" && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
            onClick={togglePasswordVisibility}
            aria-label="Toggle password visibility"
          >
            {isPasswordVisible ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";
