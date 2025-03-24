import { useModules } from "@/common/hooks/useModules";
import { useLocation, useNavigate } from "react-router-dom";
import { IconButton } from "@/common/components/ui/IconButton";
import { cn } from "@/common/lib/utils/mergeClasses";

export function Sidebar() {
  const { currentModule } = useModules();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  if (!currentModule) return null;

  return (
    <aside className="fixed bottom-0 left-0 top-16 w-64 border-r  border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
      <nav className="space-y-1">
        {currentModule.routes.map((route) => (
          <IconButton
            key={route.path}
            icon={<span>{route.name[0]}</span>} // Substitua por um ícone apropriado
            tooltip={route.name}
            className={cn("w-full justify-start border-none text-left")}
            onClick={() => navigate(route.path)}
          />
        ))}
      </nav>
    </aside>
  );
}
