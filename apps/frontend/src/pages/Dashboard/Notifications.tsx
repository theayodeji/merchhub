import { formatDistanceToNow } from 'date-fns';
import { User, Bell, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNotifications, useMarkNotificationRead } from '../../features/notifications/hooks/useNotifications';
import type { NotificationResponseDTO } from '@merchhub/shared';

type ExtendedNotification = NotificationResponseDTO & {
  actor?: {
    profileImage?: string;
  };
};

export const NotificationsPage = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useNotifications('CREATOR', 1, 50); // Larger limit for page
  const markAsRead = useMarkNotificationRead();

  const notifications = (data?.data || []) as ExtendedNotification[];
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleNotificationClick = (notification: ExtendedNotification) => {
    if (!notification.isRead) {
      markAsRead.mutate(notification.id);
    }
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Notifications</h1>
          <p className="mt-2 text-sm text-gray-500">
            Stay updated with your latest sales, alerts, and platform announcements.
          </p>
        </div>
        {unreadCount > 0 && (
          <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium">
            <Bell className="size-4" />
            {unreadCount} Unread
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="size-8 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />
          </div>
        ) : notifications.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`flex w-full items-start gap-4 p-5 transition-colors cursor-pointer hover:bg-gray-50 ${
                  !notification.isRead ? 'bg-blue-50/30' : ''
                }`}
              >
                <div className="mt-1 shrink-0">
                  {notification.actor?.profileImage ? (
                    <img 
                      src={notification.actor.profileImage} 
                      alt="Avatar" 
                      className="size-10 rounded-full border border-gray-200 object-cover"
                    />
                  ) : (
                    <div className="flex size-10 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-500">
                      <User className="size-5" />
                    </div>
                  )}
                </div>
                
                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex justify-between items-start">
                    <p className={`text-base font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                      {notification.title}
                    </p>
                    <span className="text-xs font-medium text-gray-400 whitespace-nowrap ml-4">
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  
                  {notification.message && (
                    <p className={`text-sm ${!notification.isRead ? 'text-gray-600' : 'text-gray-500'}`}>
                      {notification.message}
                    </p>
                  )}
                </div>
                
                {!notification.isRead && (
                  <div className="flex items-center justify-center shrink-0 mt-2">
                    <div className="size-2.5 rounded-full bg-blue-600" title="Unread" />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="size-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
              <CheckCircle2 className="size-8 text-green-500" />
            </div>
            <p className="text-lg font-semibold text-gray-900">All caught up!</p>
            <p className="text-sm text-gray-500 mt-1 max-w-sm">
              You don't have any notifications right now. When you do, they'll show up here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
