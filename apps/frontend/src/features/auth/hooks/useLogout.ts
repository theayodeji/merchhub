import { useNavigate } from 'react-router-dom';
import { authClient } from '../../../lib/auth-client';
import { useQueryClient } from '@tanstack/react-query';

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await authClient.signOut({});
    queryClient.clear();
    navigate('/login');
  };

  return { handleLogout };
};
