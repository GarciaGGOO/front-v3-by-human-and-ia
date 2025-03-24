import React from "react";
import { useTheme } from "@/common/contexts/ThemeContext";
import { cn } from "@/common/lib/utils/mergeClasses";
import { Moon, Sun } from "lucide-react";
import { IconButton } from "./IconButton"; // Importe o IconButton

export const DarkModeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <IconButton
      icon={theme === "light" ? <Moon size={20} /> : <Sun size={20} />} // O ícone depende do tema
      tooltip={theme === "light" ? "Ativar Modo Escuro" : "Ativar Modo Claro"}
      onClick={toggleTheme}
      tooltipPosition="top"
      className={cn(
        "text-gray-600 dark:text-gray-400",
        "hover:bg-gray-100 dark:hover:bg-gray-800",
        "transition-all duration-200",
        className
      )}
    />
  );
};
