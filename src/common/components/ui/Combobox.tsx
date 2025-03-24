import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

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
}

export const Combobox: React.FC<ComboboxProps> = ({
  options,
  selectedValue,
  onSelect,
  placeholder,
  notNull = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownAbove, setIsDropdownAbove] = useState(false);
  const comboboxRef = useRef<HTMLDivElement>(null);

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
    if (!isOpen) {
      // Verifica o espaço disponível acima ou abaixo do Combobox
      if (comboboxRef.current) {
        const rect = comboboxRef.current.getBoundingClientRect();
        const spaceAbove = rect.top;
        const spaceBelow = window.innerHeight - rect.bottom;

        // Se há mais espaço acima do que abaixo, abre para cima
        setIsDropdownAbove(spaceAbove > spaceBelow);
      }
    }
    setIsOpen(!isOpen);
  };

  return (
    <div ref={comboboxRef} className="relative w-full max-w-md">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          toggleDropdown();
        }}
        className="w-full px-4 py-2 text-left border border-gray-200 rounded-md flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
      >
        <span>{selectedLabel}</span>
        <ChevronDown className="w-4 h-4 text-gray-400 dark:text-gray-400" />
      </button>

      {isOpen && (
        <div
          className={`absolute z-10 w-full mt-1 border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700 ${
            isDropdownAbove ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          {optionsWithNull.map((option) => (
            <div
              key={option.value}
              onMouseDown={(event) => handleSelect(event, option.value)}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <span className="flex-1">{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
