import React from "react";
import { useModules } from "@/common/hooks/useModules";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@/common/components/ui/IconButton";
import { cn } from "@/common/lib/utils/mergeClasses";

export function Sidebar() {
  const { currentModule } = useModules();

  const navigate = useNavigate();

  if (!currentModule) return null;

  return (
    <aside className="flex-shrink-0 fixed bottom-0 left-0 top-16 border-r border-gray-200 bg-gray-50 p-1 dark:border-gray-800 dark:bg-gray-900">
      <nav className="flex flex-col space-y-1">
        {currentModule.routes.map((route) => (
          <IconButton
            key={route.path}
            tooltipPosition="right"
            icon={
              route.icon ? (
                React.createElement(route.icon, { className: "w-5 h-5"}) 
              ) : (
                <span>{route.name[0]}</span>
              )
            }
            tooltip={route.name}
            className={cn("w-full justify-start border-none text-left")}
            onClick={() => navigate(route.path)}
          />
        ))}
      </nav>
    </aside>
  );
}
