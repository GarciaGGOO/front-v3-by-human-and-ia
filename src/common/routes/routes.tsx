import { Route, Routes } from "react-router-dom";
import { MainLayout } from "@/modules/core/components/layouts/MainLayout";
import { useModules } from "@/common/hooks/useModules";

export function AppRoutes() {
  const { modules } = useModules();

  return (
    <Routes>
      <Route element={<MainLayout />}>
        {modules.map((module) =>
          module.routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))
        )}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Route>
    </Routes>
  );
}
