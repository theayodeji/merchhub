import React from 'react';
import { Upload } from 'lucide-react';

interface ProfileAvatarUploadProps {
  avatarPreview: string;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfileAvatarUpload = ({ avatarPreview, onFileChange }: ProfileAvatarUploadProps) => {
  return (
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
            onChange={onFileChange}
          />
        </label>
      </div>
    </div>
  );
};
