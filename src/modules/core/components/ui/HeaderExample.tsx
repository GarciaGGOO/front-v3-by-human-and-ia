import { useState } from "react";

import { useModules } from "@/common/hooks/useModules";
import { useNavigate } from "react-router-dom";
import { DarkModeToggle } from "@/common/components/ui/DarkModeToggle";
import { Combobox } from "@/common/components/ui/Combobox";
import NotificationBell from "./NotificationBell";
import { cn } from "@/common/lib/utils/mergeClasses";

export function Header() {
  const { currentModule, setCurrentModule, modules } = useModules();
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState<
    string | number | undefined
  >("BMTECH");

  // const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "Novo ticket criado",
      message: "O ticket #12345 foi criado e aguarda atendimento",
      time: "Há 5 minutos",
      read: false,
    },
    {
      id: "2",
      title: "Backup concluído",
      message: "O backup diário foi concluído com sucesso",
      time: "Há 30 minutos",
      read: false,
    },
    {
      id: "3",
      title: "Atualização disponível",
      message: "Nova versão do sistema disponível para instalação",
      time: "Há 1 hora",
      read: false,
    },
  ]);

  const options = [
    { value: "BMTECH", label: "Bmtech" },
    { value: "GOOGLE", label: "Google" },
  ];

  const profile = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleModuleChange = (module: (typeof modules)[0]) => {
    setCurrentModule(module);
    if (module.routes.length > 0) {
      navigate(module.routes[0].path);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top bar */}
      <div
        className={cn(
          "h-16 flex items-center gap-8 px-4",
          "bg-white dark:bg-gray-900",
          "border-b border-gray-200 dark:border-gray-800",
          "transition-all duration-200"
        )}
      >
        {/* Logo section */}
        <div
          className={cn(
            "flex items-center h-full transition-all duration-200",
            // isSidebarExpanded ? "w-56" : "w-12"
          )}
        >

          <Combobox
            options={options}
            selectedValue={selectedValue}
            onSelect={(value) => {
              setSelectedValue(value);
              console.log("Selected value:", value);
            }}
            placeholder="Selecione uma opção"
            notNull={true} // Se você quiser a opção de 'Nenhum'
          />
        </div>

        {/* Module navigation */}
        <nav className="flex items-center h-full flex-1">
          {modules.map((module) => {
            const isActive = currentModule?.id === module.id;

            return (
              <button
                key={module.id}
                onClick={() => handleModuleChange(module)}
                className={cn(
                  "h-full px-4 flex items-center gap-2",
                  "border-b-2 -mb-[1px]",
                  "transition-all duration-200",
                  isActive
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                <module.icon className="w-5 h-5" />
                {isActive && module.name && (
                  <span className="font-medium">{module.name}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <NotificationBell
            unreadCount={notifications.filter((n) => !n.read).length}
            notifications={notifications}
            handleMarkAsRead={handleMarkAsRead}
          />

          <DarkModeToggle />

          <div className="h-6 w-px bg-gray-200 dark:bg-gray-800" />

          <button className="flex items-center gap-3">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className={cn(
                "w-8 h-8 rounded-lg object-cover",
                "ring-2 ring-transparent",
                "hover:ring-blue-500 dark:hover:ring-blue-400",
                "transition-all duration-200"
              )}
            />
          </button>
        </div>
      </div>
    </header>
  );
}
