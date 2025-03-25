import React from "react";
import { useTheme } from "@/common/contexts/ThemeContext";
import { cn } from "@/common/lib/utils/mergeClasses";
import { Moon, Sun } from "lucide-react";
import { IconButton } from "./IconButton"; // Importe o IconButton

export const DarkModeToggle: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <IconButton
      icon={theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
      tooltip={theme === "light" ? "Ativar Modo Escuro" : "Ativar Modo Claro"}
      onClick={toggleTheme}
      tooltipPosition="bottom"
      className={cn(className)}
    />
  );
};
