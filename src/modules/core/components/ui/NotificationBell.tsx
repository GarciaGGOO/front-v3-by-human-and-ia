import React, { useState } from 'react';
import { Bell } from 'react-feather'; // Ajuste para o ícone que você está usando
import { NotificationDropdown } from './NotificationDropdown';
import { IconButton } from '@/common/components/ui/IconButton';

interface NotificationBellProps {
  unreadCount: number; // Número de notificações não lidas
  notifications: string[]; // Lista de notificações
  handleMarkAsRead: (notification: string) => void; // Função para marcar uma notificação como lida
}

const NotificationBell: React.FC<NotificationBellProps> = ({ unreadCount, notifications, handleMarkAsRead }) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Usando o IconButton para o ícone de notificação */}
      <IconButton
        icon={<Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />} // Passa o ícone como JSX
        tooltip="Notificações"
        tooltipPosition='bottom'
        onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
        className="p-2 rounded-full hover:bg-white/20 relative"
      />
      {/* Exibição do contador de notificações */}
      {unreadCount > 0 && (
        <span className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {unreadCount}
        </span>
      )}

      {/* Dropdown de notificações */}
      {isNotificationsOpen && (
        <NotificationDropdown
          notifications={notifications}
          onMarkAsRead={handleMarkAsRead}
        />
      )}
    </div>
  );
};

export default NotificationBell;
