import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCategories, updateProfile, fetchProfile, type UpdateProfileData } from '../api/user-api';
import { paths } from '../../../config/paths';

import { useToast } from '@/components/ui/use-toast';

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
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: UpdateProfileData) => updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      toast({
        title: "Profile Update Complete",
        description: "Details Updated successfully.",
        variant: "success",
      });
      // Force full reload to resync session role globally
      window.location.href = paths.app.dashboard.getHref();
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.message || "Something went wrong while saving your profile.",
        variant: "destructive",
      });
    },
  });
};
