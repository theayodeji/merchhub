import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../config/paths';
import { useUpdateProfile } from './useProfile';

type OnboardingRole = 'none' | 'creator' | 'customer';

export const useOnboarding = () => {
  const [role, setRole] = useState<OnboardingRole>('none');
  const navigate = useNavigate();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const handleSetRole = (newRole: OnboardingRole) => {
    setRole(newRole);
    if (newRole === 'customer') {
      // For customers, we just mark onboarding as completed
      // The backend sets isOnboarded = true inside the updateProfile service
      // We don't need a specific role field as customers are just users without a creatorCategoryId
      updateProfile({});
    }
  };

  return { role, setRole: handleSetRole, isSubmittingCustomer: isPending };
};
