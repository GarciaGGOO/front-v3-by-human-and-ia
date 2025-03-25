import { Routes, Route } from "react-router-dom";
import { MainLayout } from "@/modules/core/components/layouts/MainLayout";
import { useModules } from "@/common/hooks/useModules";
import { ProtectedRoute } from "@/auth/components/ProtectedRoute";
import { authRoutes } from "@/auth/routes/routes";

export function AppRoutes() {
  const { modules } = useModules();

  return (
      <Routes>
        {/* Rotas de autenticação (login, registro) */}
        {authRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        {/* Protege as rotas de módulos */}
        <Route element={<ProtectedRoute />}>
          {modules.flatMap((module) =>
            module.routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))
          )}
        </Route>
      </Routes>
  );
}
