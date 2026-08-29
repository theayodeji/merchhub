import { useState, useEffect } from 'react';
import { Button, Input, Textarea } from '@merchhub/ui';
import { useProfileCategories, useProfile, useUpdateProfile } from '../hooks/useProfile';
import { Upload } from 'lucide-react';

export const EditProfileForm = () => {
  const { data: profile, isLoading: loadingProfile } = useProfile();
  const { data: categories, isLoading: loadingCategories } = useProfileCategories();
  const { mutate: updateProfile, isPending: isSubmitting, error } = useUpdateProfile();

  const [formData, setFormData] = useState({
    displayUsername: '',
    bio: '',
    creatorCategoryId: '',
    instagram: '',
    twitter: '',
    youtube: '',
    tiktok: '',
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');

  // Pre-populate form when profile data loads
  useEffect(() => {
    if (profile) {
      setFormData({
        displayUsername: profile.displayUsername || '',
        bio: profile.bio || '',
        creatorCategoryId: profile.creatorCategoryId || '',
        instagram: profile.socialLinks?.instagram || '',
        twitter: profile.socialLinks?.twitter || '',
        youtube: profile.socialLinks?.youtube || '',
        tiktok: profile.socialLinks?.tiktok || '',
      });
      if (profile.image) {
        setAvatarPreview(profile.image);
      }
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const socialLinks: Record<string, string> = {};
    if (formData.instagram) socialLinks.instagram = formData.instagram;
    if (formData.twitter) socialLinks.twitter = formData.twitter;
    if (formData.youtube) socialLinks.youtube = formData.youtube;
    if (formData.tiktok) socialLinks.tiktok = formData.tiktok;

    const payload: any = {
      displayUsername: formData.displayUsername,
      bio: formData.bio,
      creatorCategoryId: formData.creatorCategoryId,
      socialLinks,
    };

    if (avatarFile) {
      payload.avatar = avatarFile;
    }

    updateProfile(payload);
  };

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

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Username - Read only handle since it was set on signup */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Username Handle</label>
          <div className="flex relative">
            <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-gray-500 sm:text-sm">
              @
            </span>
            <Input 
              value={profile?.username || ''}
              disabled
              className="rounded-l-none pl-2 bg-gray-50/50 cursor-not-allowed"
            />
          </div>
          <p className="text-[11px] text-gray-400 font-medium mt-1.5">Your unique handle cannot be changed.</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Storefront Name</label>
          <Input 
            name="displayUsername" 
            placeholder="Your Brand Name" 
            required 
            value={formData.displayUsername}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Avatar Image</label>
          <div className="flex items-center gap-4">
            {avatarPreview && (
              <img src={avatarPreview} alt="Preview" className="size-16 rounded-full object-cover border border-gray-200" />
            )}
            <label className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-100 transition-colors">
              <Upload className="size-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Choose File</span>
              <input 
                type="file" 
                accept="image/*"
                className="hidden" 
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Niche / Category</label>
          <select
            name="creatorCategoryId"
            required
            value={formData.creatorCategoryId}
            onChange={handleChange}
            className="flex h-12 w-full rounded-md border border-gray-200 bg-gray-50/50 px-4 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:border-[#FF3333] focus-visible:ring-4 focus-visible:ring-red-500/10 focus:bg-white transition-all appearance-none cursor-pointer"
          >
            <option value="" disabled>Select your niche...</option>
            {loadingCategories ? (
              <option disabled>Loading categories...</option>
            ) : (
              categories?.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))
            )}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Bio</label>
          <Textarea 
            name="bio" 
            placeholder="Tell us about yourself..." 
            rows={4}
            value={formData.bio}
            onChange={handleChange}
            className="flex w-full rounded-md border border-gray-200 bg-gray-50/50 px-4 py-3 text-base ring-offset-background focus-visible:outline-none focus-visible:border-[#FF3333] focus-visible:ring-4 focus-visible:ring-red-500/10 focus:bg-white transition-all resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Social Links (Optional)</label>
          <div className="space-y-3">
            <Input 
              name="instagram" 
              placeholder="Instagram URL" 
              value={formData.instagram}
              onChange={handleChange}
            />
            <Input 
              name="twitter" 
              placeholder="Twitter/X URL" 
              value={formData.twitter}
              onChange={handleChange}
            />
            <Input 
              name="youtube" 
              placeholder="YouTube URL" 
              value={formData.youtube}
              onChange={handleChange}
            />
            <Input 
              name="tiktok" 
              placeholder="TikTok URL" 
              value={formData.tiktok}
              onChange={handleChange}
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="px-8 py-3" 
          disabled={isSubmitting || !formData.creatorCategoryId}
        >
          {isSubmitting ? 'Saving changes...' : 'Save Settings'}
        </Button>
      </form>
    </div>
  );
};
