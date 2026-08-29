import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../config/paths';

type OnboardingRole = 'none' | 'creator' | 'customer';

export const useOnboarding = () => {
  const [role, setRole] = useState<OnboardingRole>('none');
  const navigate = useNavigate();

  useEffect(() => {
    if (role === 'customer') {
      navigate(paths.app.dashboard.getHref());
    }
  }, [role, navigate]);

  return { role, setRole };
};
