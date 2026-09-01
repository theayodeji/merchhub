import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { paths } from '../../../config/paths';
import { apiClient } from '../../../lib/api-client';

type OnboardingRole = 'none' | 'creator' | 'customer';

export const useOnboarding = () => {
  const [searchParams] = useSearchParams();
  const initialRole = (searchParams.get('role') as OnboardingRole) || 'none';
  const [role, setRole] = useState<OnboardingRole>(initialRole);
  const [isSubmittingCustomer, setIsSubmittingCustomer] = useState(false);

  const handleSetRole = async (newRole: OnboardingRole) => {
    setRole(newRole);
    if (newRole === 'customer') {
      try {
        setIsSubmittingCustomer(true);
        // Explicitly set the role to CUSTOMER for standard shoppers
        await apiClient.patch('/api/users/role', { role: 'CUSTOMER' });
        
        // Use full reload to sync session state across app
        window.location.href = paths.app.home.getHref ? paths.app.home.getHref() : '/';
      } catch (e) {
        console.error(e);
      } finally {
        setIsSubmittingCustomer(false);
      }
    }
  };

  return { role, setRole: handleSetRole, isSubmittingCustomer };
};
