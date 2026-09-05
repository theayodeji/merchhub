import { useState } from 'react';
import { Bell, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as Popover from '@radix-ui/react-popover';
import { formatDistanceToNow } from 'date-fns';
import { useNotifications, useMarkNotificationRead } from '../hooks/useNotifications';
import type { NotificationResponseDTO } from '@merchhub/shared';

type ExtendedNotification = NotificationResponseDTO & {
  actor?: {
    profileImage?: string;
  };
};

export const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading } = useNotifications('CUSTOMER', 1, 20);
  const markAsRead = useMarkNotificationRead();

  const notifications = (data?.data || []) as ExtendedNotification[];
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleNotificationClick = (notification: ExtendedNotification) => {
    if (!notification.isRead) {
      markAsRead.mutate(notification.id);
    }
    
    setIsOpen(false);
    
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <button className="relative flex size-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900">
          <Bell className="size-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content 
          className="z-50 w-80 rounded-xl border border-gray-200 bg-white p-0 shadow-lg outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
          sideOffset={8}
          align="end"
        >
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                {unreadCount} new
              </span>
            )}
          </div>
          <div className="max-h-[400px] overflow-y-auto p-1">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="size-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
              </div>
            ) : notifications.length > 0 ? (
              <div className="flex flex-col gap-1">
                {notifications.map((notification) => (
                  <button
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className="flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                  >
                    <div className="mt-0.5 shrink-0">
                      {notification.actor?.profileImage ? (
                        <img 
                          src={notification.actor.profileImage} 
                          alt="Avatar" 
                          className="size-8 rounded-full border border-gray-200 object-cover"
                        />
                      ) : (
                        <div className="flex size-8 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-500">
                          <User className="size-4" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-1 overflow-hidden">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {notification.title}
                      </p>
                      {notification.message && (
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {notification.message}
                        </p>
                      )}
                      <span className="text-[10px] font-medium text-gray-400">
                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    {!notification.isRead && (
                      <div className="mt-2 shrink-0">
                        <div className="size-2 rounded-full bg-blue-500" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Bell className="mb-2 size-8 text-gray-300" />
                <p className="text-sm font-medium text-gray-900">No notifications</p>
                <p className="text-xs text-gray-500">You're all caught up!</p>
              </div>
            )}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
