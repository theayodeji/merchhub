import type { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import type { ProfileFormData } from '../schemas/profile.schema';

interface ProfileSocialLinksProps {
  form: UseFormReturn<ProfileFormData>;
}

export const ProfileSocialLinks = ({ form }: ProfileSocialLinksProps) => {
  const { register, formState: { errors } } = form;

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Social Links (Optional)</label>
      <div className="space-y-3">
        <div>
          <Input 
            {...register('instagram')} 
            placeholder="Instagram URL" 
          />
          {errors.instagram && <p className="text-sm text-red-500 mt-1">{errors.instagram.message}</p>}
        </div>
        <div>
          <Input 
            {...register('twitter')} 
            placeholder="Twitter/X URL" 
          />
          {errors.twitter && <p className="text-sm text-red-500 mt-1">{errors.twitter.message}</p>}
        </div>
        <div>
          <Input 
            {...register('youtube')} 
            placeholder="YouTube URL" 
          />
          {errors.youtube && <p className="text-sm text-red-500 mt-1">{errors.youtube.message}</p>}
        </div>
        <div>
          <Input 
            {...register('tiktok')} 
            placeholder="TikTok URL" 
          />
          {errors.tiktok && <p className="text-sm text-red-500 mt-1">{errors.tiktok.message}</p>}
        </div>
      </div>
    </div>
  );
};
