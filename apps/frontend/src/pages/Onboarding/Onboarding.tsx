import { AuthSidebar } from '../../components/layout/AuthSidebar';
import { ProfileForm } from '../../features/profile/components/ProfileForm';
import { RoleSelection } from '../../features/profile/components/RoleSelection';
import { useOnboarding } from '../../features/profile/hooks/useOnboarding';

export default function Onboarding() {
  const { role, setRole } = useOnboarding();

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      {/* Form Section */}
      <div className="flex h-full w-full bg-white">
        {role === 'none' && <RoleSelection onSelect={setRole} />}
        {role === 'creator' && <ProfileForm />}
      </div>
      
      {/* Visual Section */}
      <AuthSidebar 
        title="Your empire begins."
        subtitle="Set up your profile to start dropping exclusive merchandise and owning your audience."
        imageSrc="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop"
      />
    </div>
  );
}
