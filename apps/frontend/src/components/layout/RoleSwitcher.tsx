import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Store, ShoppingBag, Loader2 } from 'lucide-react';
import { apiClient } from '../../lib/api-client';
import { authClient } from '../../lib/auth-client';

export const RoleSwitcher = () => {
  const { data: session } = authClient.useSession();
  const [isSwitching, setIsSwitching] = useState(false);

  if (!session?.user) return null;
  
  const currentRole = session.user.role || 'CUSTOMER';

  const navigate = useNavigate();

  const handleSwitchRole = async () => {
    try {
      setIsSwitching(true);
      const newRole = currentRole === 'CREATOR' ? 'CUSTOMER' : 'CREATOR';
      
      await apiClient.patch('/api/users/role', { role: newRole });
      
      // Reload the page to completely reset states and refetch session
      window.location.reload();
    } catch (error: any) {
      if (currentRole === 'CUSTOMER' && error.message?.includes('creator profile')) {
        navigate('/onboarding?role=creator');
      } else {
        alert(error.message || 'Failed to switch mode.');
      }
    } finally {
      setIsSwitching(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleSwitchRole} 
      disabled={isSwitching}
      className="gap-2 hidden sm:flex"
    >
      {isSwitching ? (
        <Loader2 className="size-4 animate-spin" />
      ) : currentRole === 'CREATOR' ? (
        <>
          <ShoppingBag className="size-4" />
          Switch to Shopping
        </>
      ) : (
        <>
          <Store className="size-4" />
          Switch to Creator
        </>
      )}
    </Button>
  );
};
