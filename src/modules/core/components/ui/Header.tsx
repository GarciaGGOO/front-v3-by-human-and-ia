import { useModules } from "@/common/hooks/useModules";
import { Button } from "@/common/components/ui/Button";
import { useNavigate } from "react-router-dom";
import { DarkModeToggle } from "@/common/components/ui/DarkModeToggle";

export function Header() {
  const { currentModule, setCurrentModule, modules } = useModules();
  const navigate = useNavigate();

  const handleModuleChange = (module: (typeof modules)[0]) => {
    setCurrentModule(module);
    // Navega para a primeira rota do módulo selecionado
    if (module.routes.length > 0) {
      navigate(module.routes[0].path);
    }
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center border-b bg-white px-4 border-gray-200 dark:border-gray-800 dark:bg-gray-900">
      <div className="mr-8 text-xl font-bold">Dashboard</div>

      <nav className="flex flex-1 gap-2">
        {modules.map((module) => (
          <Button
            key={module.id}
            variant={currentModule?.id === module.id ? "primary" : "secondary"}
            onClick={() => handleModuleChange(module)}
            className="flex items-center gap-2"
          >
            <module.icon size={20} />
            {module.name}
          </Button>
        ))}
      </nav>

      {/* <Button
        variant="outline"
        size="sm"
        onClick={toggleTheme}
        className="ml-4"
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </Button> */}
      <DarkModeToggle />
    </header>
  );
}
