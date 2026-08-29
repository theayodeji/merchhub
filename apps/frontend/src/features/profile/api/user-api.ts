import { apiClient } from '../../../lib/api-client';
import type { CreatorCategory, UpdateProfileData, UserProfile } from '../types';

export type { CreatorCategory, UpdateProfileData, UserProfile };

export const fetchCategories = (): Promise<CreatorCategory[]> =>
  apiClient.get('/api/users/categories');

// Data may include a File object for 'avatar', so we use FormData
export const updateProfile = async (data: UpdateProfileData & { avatar?: File, username?: string }): Promise<UserProfile> => {
  const formData = new FormData();
  
  if (data.username) formData.append('username', data.username);
  if (data.bio) formData.append('bio', data.bio);
  if (data.creatorCategoryId) formData.append('creatorCategoryId', data.creatorCategoryId);
  if (data.displayUsername) formData.append('displayUsername', data.displayUsername);
  
  if (data.socialLinks && Object.keys(data.socialLinks).length > 0) {
    formData.append('socialLinks', JSON.stringify(data.socialLinks));
  }

  if (data.avatar) {
    formData.append('avatar', data.avatar);
  } else if (data.image) {
    formData.append('image', data.image);
  }

  const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
  const response = await fetch(`${BASE_URL}/api/users/profile`, {
    method: 'PUT',
    body: formData,
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Failed to update profile');
  }

  return response.json();
};

export const fetchProfile = (): Promise<UserProfile> =>
  apiClient.get('/api/users/profile');
