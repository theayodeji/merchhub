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

  // If they have no creatorCategory setup and we aren't on onboarding, send them to onboarding
  // We assume no category means they haven't made a choice yet. Wait, if they choose customer, they bypass the form.
  // Actually, we need to track if they've completed onboarding. 
  // For now, if the API errors (404), go to onboarding.
  if (isError && !isOnboardingRoute) {
    return <Navigate to={paths.app.onboarding.path} replace />;
  }

  // If profile successfully loads, it means they exist. We don't force onboarding again.
  if (profile && isOnboardingRoute) {
    return <Navigate to={paths.app.dashboard.path} replace />;
  }

  return <>{children}</>;
};
