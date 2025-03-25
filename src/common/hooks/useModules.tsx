import { useModulesContext } from "../contexts/ModulesContext";
import { useAuth } from "@/auth/contexts/AuthContext";

export function useModules() {
  const { user } = useAuth();
  const { modules } = useModulesContext();

  if (!user) return { modules: [] }; // Corrigido aqui

  const filteredModules = modules.filter((mod) =>
    user.permissions.some((perm) => mod.permissions?.includes(perm))
  );

  return { modules: filteredModules };
}
