import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileFormSchema, type ProfileFormData } from '@merchhub/shared';
import { useProfile, useUpdateProfile } from './useProfile';

export const useEditProfileForm = () => {
  const { data: profile, isLoading: loadingProfile } = useProfile();
  const { mutate: updateProfile, isPending: isSubmitting, error } = useUpdateProfile();

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      displayUsername: '',
      bio: '',
      creatorCategoryId: '',
      instagram: '',
      twitter: '',
      youtube: '',
      tiktok: '',
    },
  });

  // Pre-populate form when profile data loads
  useEffect(() => {
    if (profile) {
      form.reset({
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
  }, [profile, form]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data: ProfileFormData) => {
    const socialLinks: Record<string, string> = {};
    if (data.instagram) socialLinks.instagram = data.instagram;
    if (data.twitter) socialLinks.twitter = data.twitter;
    if (data.youtube) socialLinks.youtube = data.youtube;
    if (data.tiktok) socialLinks.tiktok = data.tiktok;

    const payload: any = {
      displayUsername: data.displayUsername,
      bio: data.bio,
      creatorCategoryId: data.creatorCategoryId,
      socialLinks,
    };

    if (avatarFile) {
      payload.avatar = avatarFile;
    }

    updateProfile(payload);
  };

  return {
    form,
    loadingProfile,
    isSubmitting,
    error,
    avatarFile,
    avatarPreview,
    handleFileChange,
    onSubmit: form.handleSubmit(onSubmit),
    username: profile?.username || '',
  };
};
