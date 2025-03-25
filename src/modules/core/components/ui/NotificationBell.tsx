import React, { useState, useEffect, useRef } from 'react';// Ajuste para o ícone que você está usando
import { Bell} from "lucide-react";
import { NotificationDropdown } from './NotificationDropdown';
import { IconButton } from '@/common/components/ui/IconButton';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationBellProps {
  unreadCount: number;
  notifications: Notification[];
  handleMarkAsRead: (id: string) => void;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ unreadCount, notifications, handleMarkAsRead }) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Fechar o dropdown se o clique for fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // Limpar o ouvinte de evento quando o componente for desmontado
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      {/* Usando o IconButton para o ícone de notificação */}
      <IconButton
        icon={<Bell className="w-5 h-5" />} // Passa o ícone como JSX
        tooltip="Notificações"
        tooltipPosition="bottom"
        onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
        className="relative"
      />
      
      {/* Exibição do contador de notificações */}
      {unreadCount > 0 && (
        <span className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {unreadCount}
        </span>
      )}

      {/* Dropdown de notificações */}
      {isNotificationsOpen && (
        <div
          ref={dropdownRef} // Define o ref no container do dropdown
          className="absolute right-0 mt-2 w-80 border border-gray-200 rounded-md shadow-lg bg-white text-black z-50 dark:bg-gray-800 dark:text-white dark:border-gray-700"
        >
          <NotificationDropdown
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
          />
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
