import type { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useProfileCategories } from '../hooks/useProfile';
import type { ProfileFormData } from '../schemas/profile.schema';

interface ProfileBasicInfoProps {
  form: UseFormReturn<ProfileFormData>;
  username: string;
}

export const ProfileBasicInfo = ({ form, username }: ProfileBasicInfoProps) => {
  const { data: categories, isLoading: loadingCategories } = useProfileCategories();
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-6">
      {/* Username - Read only handle since it was set on signup */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Username Handle</label>
        <div className="flex relative">
          <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-gray-500 sm:text-sm">
            @
          </span>
          <Input 
            value={username}
            disabled
            className="rounded-l-none pl-2 bg-gray-50/50 cursor-not-allowed"
          />
        </div>
        <p className="text-[11px] text-gray-400 font-medium mt-1.5">Your unique handle cannot be changed.</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Storefront Name</label>
        <Input 
          {...register('displayUsername')} 
          placeholder="Your Brand Name" 
        />
        {errors.displayUsername && <p className="text-sm text-red-500 mt-1">{errors.displayUsername.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Niche / Category</label>
        <select
          {...register('creatorCategoryId')}
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
        {errors.creatorCategoryId && <p className="text-sm text-red-500 mt-1">{errors.creatorCategoryId.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Bio</label>
        <Textarea 
          {...register('bio')} 
          placeholder="Tell us about yourself..." 
          rows={4}
          className="flex w-full rounded-md border border-gray-200 bg-gray-50/50 px-4 py-3 text-base ring-offset-background focus-visible:outline-none focus-visible:border-[#FF3333] focus-visible:ring-4 focus-visible:ring-red-500/10 focus:bg-white transition-all resize-none"
        />
        {errors.bio && <p className="text-sm text-red-500 mt-1">{errors.bio.message}</p>}
      </div>
    </div>
  );
};
