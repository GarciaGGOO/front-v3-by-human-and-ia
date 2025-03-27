import { Outlet } from "react-router-dom";
import { Header } from "../ui/HeaderExample";
import { Sidebar } from "../ui/SidebarExample";

export function MainLayout() {
  return (
    <div className="h-screen w-screen bg-white overflow-hidden text-gray-900 transition-colors dark:bg-gray-900 dark:text-gray-100">
      {/* Header fixo */}
      <Header />

      <div className="flex">
        {/* Sidebar fixa à esquerda */}
        <Sidebar />

        {/* Main ajustado para não vazar da tela */}
        <main className="ml-12 mt-16 flex-1 h-[calc(100vh-64px)] overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
