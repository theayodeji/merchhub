import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../../lib/api-client';
import type { NotificationResponseDTO, PaginatedResponse } from '@merchhub/shared';

export const useNotifications = (role?: 'CREATOR' | 'CUSTOMER', page = 1, limit = 20) => {
  return useQuery({
    queryKey: ['notifications', role, page, limit],
    queryFn: () => {
      const url = new URL('/api/notifications', window.location.origin);
      url.searchParams.set('page', page.toString());
      url.searchParams.set('limit', limit.toString());
      if (role) {
        url.searchParams.set('role', role);
      }
      return apiClient.get<PaginatedResponse<NotificationResponseDTO>>(url.pathname + url.search);
    }
  });
};

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => 
      apiClient.patch(`/api/notifications/${id}/read`, { isRead: true }),
    onSuccess: () => {
      // Invalidate all notification queries to refresh unread counts and lists
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};
