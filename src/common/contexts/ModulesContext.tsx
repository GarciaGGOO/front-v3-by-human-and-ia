import {
  createContext,
  useContext,
  useState,
  useEffect,
  type PropsWithChildren,
} from "react";
import type { Module } from "@/common/types/index";
import { useNavigate } from "react-router-dom";

const moduleFiles = import.meta.glob("@/modules/**/routes/routes.tsx", {
  eager: true,
});

type ModulesContextType = {
  currentModule: Module | null;
  setCurrentModule: (module: Module) => void;
  modules: Module[];
};

const ModulesContext = createContext<ModulesContextType | undefined>(undefined);

const order = ["core", "administration"];

export function ModulesProvider({ children }: PropsWithChildren) {
  const [modules, setModules] = useState<Module[]>([]);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadedModules = Object.values(moduleFiles)
      .map((mod: any) => mod?.default)
      .filter((mod): mod is Module => !!mod)
      .sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));

    setModules(loadedModules);

    // Se houver módulos carregados, definir o primeiro como ativo
    if (loadedModules.length > 0) {
      setCurrentModule(loadedModules[0]);
      // Navegar automaticamente para a primeira rota do primeiro módulo
      if (loadedModules[0].routes.length > 0) {
        navigate(loadedModules[0].routes[0].path);
      }
    }
  }, []);

  return (
    <ModulesContext.Provider
      value={{ currentModule, setCurrentModule, modules }}
    >
      {children}
    </ModulesContext.Provider>
  );
}

export function useModulesContext() {
  const context = useContext(ModulesContext);
  if (!context) {
    throw new Error(
      "useModulesContext deve ser usado dentro de um ModulesProvider"
    );
  }
  return context;
}
