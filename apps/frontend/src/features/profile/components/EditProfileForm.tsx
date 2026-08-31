import { Button } from '@/components/ui/button';
import { useEditProfileForm } from '../hooks/useEditProfileForm';
import { ProfileBasicInfo } from './ProfileBasicInfo';
import { ProfileAvatarUpload } from './ProfileAvatarUpload';
import { ProfileSocialLinks } from './ProfileSocialLinks';

export const EditProfileForm = () => {
  const {
    form,
    loadingProfile,
    isSubmitting,
    error,
    avatarPreview,
    handleFileChange,
    onSubmit,
    username,
  } = useEditProfileForm();

  if (loadingProfile) {
    return (
      <div className="flex items-center justify-center p-12">
        <p className="text-gray-500 font-medium">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-w-2xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
        <p className="text-sm text-gray-500 font-medium mt-1">Update your storefront details and social presence.</p>
      </div>

      {error && <div className="text-destructive font-bold mb-4">{error.message}</div>}

      <form onSubmit={onSubmit} className="space-y-6">
        
        <ProfileBasicInfo form={form} username={username} />
        
        <ProfileAvatarUpload 
          avatarPreview={avatarPreview} 
          onFileChange={handleFileChange} 
        />
        
        <ProfileSocialLinks form={form} />

        <Button 
          type="submit" 
          className="px-8 py-3 mt-6" 
          disabled={isSubmitting || !form.watch('creatorCategoryId')}
        >
          {isSubmitting ? 'Saving changes...' : 'Save Settings'}
        </Button>
      </form>
    </div>
  );
};
