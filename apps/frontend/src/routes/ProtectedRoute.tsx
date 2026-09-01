import { Navigate, useLocation } from 'react-router-dom';
import { authClient } from '../lib/auth-client';
import { paths } from '../config/paths';
import { useProfile } from '../features/profile/hooks/useProfile';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const location = useLocation();

  // Only attempt to fetch profile if we have a valid session
  const { data: profile, isLoading: isProfileLoading, isError } = useProfile(!!session);

  if (isSessionPending || (session && isProfileLoading)) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <h1 className="text-2xl font-black uppercase">Loading...</h1>
      </div>
    );
  }

  if (!session) {
    return (
      <Navigate 
        to={paths.auth.login.getHref(location.pathname + location.search)} 
        replace 
      />
    );
  }

  const isOnboardingRoute = location.pathname === paths.app.onboarding.path;
  const searchParams = new URLSearchParams(location.search);
  const isUpgradingToCreator = isOnboardingRoute && searchParams.get('role') === 'creator' && !profile?.creatorCategoryId;

  // Redirect to onboarding if not onboarded
  if (profile && !profile.isOnboarded && !isOnboardingRoute) {
    return <Navigate to={paths.app.onboarding.path} replace />;
  }

  // Redirect away from onboarding if already onboarded, UNLESS they are upgrading to creator
  if (profile && profile.isOnboarded && isOnboardingRoute && !isUpgradingToCreator) {
    const role = session.user?.role;
    if (role === 'CREATOR') {
      return <Navigate to={paths.app.dashboard.path} replace />;
    }
    return <Navigate to={paths.app.home.path} replace />;
  }

  // Prevent CUSTOMER from accessing dashboard routes
  const role = session.user?.role;
  if (location.pathname.startsWith(paths.app.dashboard.path) && role !== 'CREATOR') {
    return <Navigate to={paths.app.home.path} replace />;
  }
  
  // If profile is missing completely (e.g. error fetching) and they are not on onboarding, send them there as fallback
  if (isError && !isOnboardingRoute) {
    return <Navigate to={paths.app.onboarding.path} replace />;
  }

  return <>{children}</>;
};
