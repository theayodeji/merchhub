import { apiClient } from '../../../lib/api-client';
import type { CreatorCategory, UpdateProfileData, UserProfile } from '../types';

export type { CreatorCategory, UpdateProfileData, UserProfile };

export const fetchCategories = (): Promise<CreatorCategory[]> =>
  apiClient.get('/api/users/categories');

export const updateProfile = (data: UpdateProfileData): Promise<UserProfile> =>
  apiClient.put('/api/users/profile', data as Record<string, unknown>);

export const fetchProfile = (): Promise<UserProfile> =>
  apiClient.get('/api/users/profile');
