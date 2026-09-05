import { useNavigate } from 'react-router-dom';
import { authClient } from '../../../lib/auth-client';
import { useQueryClient } from '@tanstack/react-query';
import { useCartStore } from '../../../store/useCartStore';
import { useWishlistStore } from '../../../store/useWishlistStore';

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await authClient.signOut({});
    
    // Clear React Query cache fully
    queryClient.clear();
    queryClient.removeQueries();
    
    // Clear Zustand stores
    useCartStore.getState().clearCart();
    useWishlistStore.getState().clearWishlist();
    
    // Clear all local storage
    localStorage.clear();
    
    // Redirect to landing page
    navigate('/');
  };

  return { handleLogout };
};
