import { EditProfileForm } from '../../features/profile/components/EditProfileForm';

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Settings</h1>
      </div>
      
      <EditProfileForm />
    </div>
  );
}
