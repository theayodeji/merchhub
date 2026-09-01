import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useProfileCategories, useUpdateProfile } from '../hooks/useProfile';
import { ArrowRight, Upload } from 'lucide-react';

export const ProfileForm = () => {
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
    
    // Filter out empty social links
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
      role: 'CREATOR',
    };
    
    if (avatarFile) {
      payload.avatar = avatarFile;
    }

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

        {/* Display Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Storefront Name</label>
          <Input 
            name="displayUsername" 
            placeholder="Your Brand Name (e.g. ✨ JD's Merch ✨)" 
            required 
            value={formData.displayUsername}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Avatar (Optional)</label>
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
            placeholder="A short description of what you do..." 
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
