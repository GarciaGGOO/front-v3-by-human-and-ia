import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/common/lib/utils/mergeClasses";

interface ComboboxOption {
  value: string | number | undefined;
  label: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  selectedValue: string | number | undefined;
  onSelect: (value: string | number | undefined) => void;
  placeholder: string;
  notNull?: boolean;
  className?: string;
  variant?: "default" | "ghost";
}

export const Combobox: React.FC<ComboboxProps> = ({
  options,
  selectedValue,
  onSelect,
  placeholder,
  notNull = false,
  className,
  variant = "default",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownAbove, setIsDropdownAbove] = useState(false);
  const comboboxRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (
    event: React.MouseEvent,
    value: string | number | undefined
  ) => {
    event.preventDefault();
    event.stopPropagation();
    onSelect(value);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      comboboxRef.current &&
      !comboboxRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const optionsWithNull = notNull
    ? options
    : [{ value: "", label: "Nenhum" }, ...options];

  const selectedLabel =
    optionsWithNull.find((option) => option.value === selectedValue)?.label ||
    placeholder;

  const toggleDropdown = () => {
    if (!isOpen && comboboxRef.current) {
      const rect = comboboxRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;

      requestAnimationFrame(() => {
        if (dropdownRef.current) {
          const dropdownHeight = dropdownRef.current.offsetHeight;
          setIsDropdownAbove(spaceBelow < dropdownHeight);
        }
      });
    }
    setIsOpen(!isOpen);
  };

  return (
    <div ref={comboboxRef} className={cn("relative w-full max-w-md")}>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          toggleDropdown();
        }}
        className={cn(
          "w-full px-2 py-1 text-left flex rounded-md items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500",
          variant === "default"
            ? "border rounded-md border-gray-200 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            : "hover:bg-gray-100 dark:hover:bg-gray-700",
          className
        )}
      >
        <span>{selectedLabel}</span>
        <ChevronDown className="w-4 h-4 text-gray-400 dark:text-gray-400" />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className={cn(
            "absolute z-50 w-full mt-2 border rounded-md shadow-lg border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700",
            isDropdownAbove ? "bottom-full mb-2" : "top-full mt-2"
          )}
        >
          {optionsWithNull.map((option) => (
            <div
              key={option.value}
              onMouseDown={(event) => handleSelect(event, option.value)}
              className={cn(
                "flex items-center px-2 py-2 cursor-pointer hover:rounded-md hover:bg-gray-200 dark:hover:bg-gray-600",
                selectedValue === option.value
                  ? "bg-blue-500 text-white"
                  : "text-gray-800 dark:text-gray-200"
              )}
            >
              <span className="flex-1">{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
