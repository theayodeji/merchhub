import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCategories, updateProfile, fetchProfile, type UpdateProfileData } from '../api/user-api';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../config/paths';

export const useProfileCategories = () => {
  return useQuery({
    queryKey: ['creator-categories'],
    queryFn: fetchCategories,
  });
};

export const useProfile = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['user-profile'],
    queryFn: fetchProfile,
    retry: false, 
    enabled,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: UpdateProfileData) => updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      navigate(paths.app.dashboard.getHref());
    },
  });
};
