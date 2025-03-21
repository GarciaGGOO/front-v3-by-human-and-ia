import React from "react";
import { useTheme } from "@/common/contexts/ThemeContext";
import { cn } from "@/common/lib/utils/mergeClasses";
import { Moon, Sun } from "lucide-react";
import { Button } from "./Button";

export const DarkModeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className={cn("ml-4", className)}
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </Button>
  );
};
