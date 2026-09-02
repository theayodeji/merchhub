import { type CreatorProfileData } from '../hooks/useStorefront';
import { Globe, Camera, MessageSquare, Video, Link as LinkIcon } from 'lucide-react';

interface CreatorProfileProps {
  creator: CreatorProfileData;
}

const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'twitter': return <MessageSquare className="size-5" />;
    case 'instagram': return <Camera className="size-5" />;
    case 'youtube': return <Video className="size-5" />;
    case 'website': return <Globe className="size-5" />;
    default: return <LinkIcon className="size-5" />;
  }
};

export const CreatorProfile = ({ creator }: CreatorProfileProps) => {
  return (
    <div className="relative mb-16 pt-32 sm:pt-48">
      {/* Cover Banner (Solid Color or Pattern) */}
      <div className="absolute top-0 left-0 right-0 h-48 sm:h-64 bg-neutral-900 overflow-hidden rounded-b-3xl">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white via-transparent to-transparent bg-size-[20px_20px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        {/* Avatar */}
        <div className="mb-6 size-32 sm:size-40 overflow-hidden rounded-full border-8 border-white bg-white shadow-xl">
          {creator.image ? (
            <img src={creator.image} alt={creator.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-primary text-4xl font-bold text-white">
              {creator.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Info */}
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-gray-900">{creator.name}</h1>
        <p className="mt-2 text-lg font-medium text-gray-500">@{creator.username}</p>
        
        {creator.bio && (
          <p className="mt-6 max-w-2xl text-base sm:text-lg text-gray-700 leading-relaxed">{creator.bio}</p>
        )}

        {/* Social Links */}
        {creator.socialLinks && Object.keys(creator.socialLinks).length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {Object.entries(creator.socialLinks).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-200 hover:text-gray-900"
              >
                {getSocialIcon(platform)}
                <span className="capitalize">{platform}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
