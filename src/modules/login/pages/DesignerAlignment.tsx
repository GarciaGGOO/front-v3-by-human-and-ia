import { useState } from "react";

import { Container } from "@/common/components/layouts/Container";
import { Button } from "@/common/components/ui/Button";
import { Combobox } from "@/common/components/ui/Combobox";
import { DarkModeToggle } from "@/common/components/ui/DarkModeToggle";
import { IconButton } from "@/common/components/ui/IconButton";

import NotificationBell from "@/modules/core/components/ui/NotificationBell";
import { RefreshCcw } from "lucide-react";

export function DesignerAlignment() {
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
    { value: "left", label: "Esquerda" },
    { value: "center", label: "Centro" },
    { value: "right", label: "Direita" },
  ];

  const handleMarkAsRead = (id: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Designer de alinhamento</h1>
      <Container bordered={true}>
        <div className="flex items-center space-x-4 mt-4">
          <Combobox
            options={options}
            placeholder="Alinhamento"
            selectedValue={options[0].value}
            onSelect={(value) => console.log(value)}
          />
          <Button variant="primary">primary</Button>
          <Button variant="secondary">secondary</Button>
          <Button variant="outline">outline</Button>
          <Button variant="ghost">ghost</Button>
          <IconButton icon={<RefreshCcw />} tooltip="Atualizar" />
          <DarkModeToggle />
          <NotificationBell
            unreadCount={notifications.filter((n) => !n.read).length}
            notifications={notifications}
            handleMarkAsRead={handleMarkAsRead}
          />
        </div>
      </Container>
      <Container bordered={true}>
        <div className="flex items-center space-x-4 mt-4"></div>
      </Container>
    </div>
  );
}
