import React from "react";
import { Container } from "@/common/components/layouts/Container";
import { Check } from "lucide-react";

type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

type NotificationDropdownProps = {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
};

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notifications,
  onMarkAsRead,
}) => {
  return (
    <Container bordered={false}>
  <div className="absolute right-0 mt-2 w-80 border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto bg-white text-black z-50 dark:bg-gray-800 dark:text-white dark:border-gray-700">
    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
        Notificações
      </h3>
    </div>
    <div className="max-h-[400px] overflow-y-auto">
      {notifications.length === 0 ? (
        <div className="px-4 py-3 text-sm text-gray-400 dark:text-gray-500">
          Nenhuma notificação
        </div>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className={`px-4 py-3 border-b last:border-b-0 ${
              notification.read
                ? "bg-gray-100 dark:bg-gray-700"
                : "bg-gray-50 dark:bg-gray-800"
            } hover:bg-gray-200 dark:hover:bg-gray-700`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {notification.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {notification.time}
                </p>
              </div>
              {!notification.read && (
                <button
                  onClick={() => onMarkAsRead(notification.id)}
                  className="ml-2 p-1 text-gray-400 hover:text-black dark:text-gray-400 dark:hover:text-gray-200"
                  title="Marcar como lida"
                >
                  <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  </div>
</Container>

  );
};
