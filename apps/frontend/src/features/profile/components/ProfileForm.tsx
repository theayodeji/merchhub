import { useState } from 'react';
import { Button, Input, Textarea } from '@merchhub/ui';
import { useProfileCategories, useUpdateProfile } from '../hooks/useProfile';
import { ArrowRight } from 'lucide-react';

export const ProfileForm = () => {
  const { data: categories, isLoading: loadingCategories } = useProfileCategories();
  const { mutate: updateProfile, isPending: isSubmitting, error } = useUpdateProfile();

  const [formData, setFormData] = useState({
    displayUsername: '',
    bio: '',
    creatorCategoryId: '',
    image: '',
    instagram: '',
    twitter: '',
    youtube: '',
    tiktok: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      displayUsername: formData.displayUsername,
      bio: formData.bio,
      creatorCategoryId: formData.creatorCategoryId,
      image: formData.image,
      socialLinks: {
        instagram: formData.instagram,
        twitter: formData.twitter,
        youtube: formData.youtube,
        tiktok: formData.tiktok,
      },
    };
    updateProfile(payload);
  };

  return (
    <div className="flex flex-col justify-center p-6 md:p-10 max-w-[600px] w-full mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-2">
        Setup your Profile.
      </h1>
      <p className="text-base text-gray-500 mb-8 font-medium">
        Tell us about your brand and niche.
      </p>
      
      {error && <div className="text-destructive font-bold mb-4">{error.message}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Display Name</label>
          <Input 
            name="displayUsername" 
            placeholder="Your Brand Name (e.g. ✨ JD's Merch ✨)" 
            required 
            value={formData.displayUsername}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Avatar URL (Optional)</label>
          <Input 
            name="image" 
            placeholder="https://example.com/avatar.jpg" 
            value={formData.image}
            onChange={handleChange}
          />
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
            placeholder="A short description of what you do..." 
            rows={4}
            value={formData.bio}
            onChange={handleChange}
            className="flex w-full rounded-md border border-gray-200 bg-gray-50/50 px-4 py-3 text-base ring-offset-background focus-visible:outline-none focus-visible:border-[#FF3333] focus-visible:ring-4 focus-visible:ring-red-500/10 focus:bg-white transition-all resize-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Social Links</label>
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
          className="w-full mt-8 py-6 text-lg" 
          disabled={isSubmitting || !formData.creatorCategoryId}
        >
          {isSubmitting ? 'Saving...' : 'Complete Setup'}
          {!isSubmitting && <ArrowRight className="ml-2 size-5" />}
        </Button>
      </form>
    </div>
  );
};
