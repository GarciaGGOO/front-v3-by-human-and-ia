import {
  createContext,
  useContext,
  useState,
  useEffect,
  type PropsWithChildren,
} from "react";
import type { Module } from "@/common/types/index";
import { useNavigate } from "react-router-dom";
import { modulesConfig } from "./modulesConfig";
import { useAuth } from "@/auth/contexts/AuthContext";

const moduleFiles = import.meta.glob("@/modules/**/routes/routes.tsx", {
  eager: true,
});

type ModulesContextType = {
  currentModule: Module | null;
  setCurrentModule: (module: Module) => void;
  modules: Module[];
};

const ModulesContext = createContext<ModulesContextType | undefined>(undefined);

const order = modulesConfig.map((mod) => mod.id);

export function ModulesProvider({ children }: PropsWithChildren) {
  const [modules, setModules] = useState<Module[]>([]);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const loadedModules = Object.values(moduleFiles)
      .map((mod: any) => mod?.default)
      .filter((mod): mod is Module => !!mod && mod.enabled)
      .map((mod) => ({
        ...mod,
        routes: mod.routes.filter((route) => route.enabled),
      }))
      .filter((mod) =>
        mod.permissions
          ? user.permissions.some((permission) =>
              user.permissions.includes(permission))
          : true
      )
      .sort((a, b) => {
        const indexA = order.indexOf(a.id);
        const indexB = order.indexOf(b.id);

        const posA = indexA === -1 ? order.length : indexA;
        const posB = indexB === -1 ? order.length : indexB;

        return posA - posB;
      });

    setModules(loadedModules);

    // Se houver módulos carregados, definir o primeiro como ativo
    if (loadedModules.length > 0) {
      setCurrentModule(loadedModules[0]);
      // Navegar automaticamente para a primeira rota do primeiro módulo
      if (loadedModules[0].routes.length > 0) {
        navigate(loadedModules[0].routes[0].path);
      }
    }
  }, [user]);

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
