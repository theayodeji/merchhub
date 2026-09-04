import { type CreatorProfileData } from '../hooks/useStorefront';
import { Globe, Camera, MessageSquare, Video, Link as LinkIcon, BadgeCheck } from 'lucide-react';

interface CreatorProfileProps {
  creator: CreatorProfileData;
}

const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'twitter': return <MessageSquare className="size-4" />;
    case 'instagram': return <Camera className="size-4" />;
    case 'youtube': return <Video className="size-4" />;
    case 'website': return <Globe className="size-4" />;
    default: return <LinkIcon className="size-4" />;
  }
};

export const CreatorProfile = ({ creator }: CreatorProfileProps) => {
  return (
    <div className="mb-10 w-full border-b border-neutral-100 pb-10">
      {/* Cover Banner */}
      <div className="h-40 sm:h-56 bg-neutral-100 w-full overflow-hidden relative">
        <div className="absolute inset-0 bg-neutral-200/50" />
      </div>

      <div className="relative px-4 sm:px-8 max-w-4xl mx-auto">
        {/* Avatar */}
        <div className="-mt-16 sm:-mt-20 mb-4 relative size-32 sm:size-40 overflow-hidden rounded-full border-4 sm:border-[6px] border-white bg-white shadow-sm">
          {creator.image ? (
            <img src={creator.image} alt={creator.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-neutral-900 text-4xl font-bold text-white">
              {creator.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Info Container */}
        <div className="flex flex-col">
          <h1 className="flex items-center gap-2 text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
            {creator.name}
            <BadgeCheck className="size-6 text-blue-500 shrink-0" aria-label="Verified" />
          </h1>
          <p className="mt-1 text-base font-medium text-neutral-500">@{creator.username}</p>
          
          {creator.bio && (
            <p className="mt-4 max-w-2xl text-base text-neutral-800 leading-relaxed whitespace-pre-wrap">{creator.bio}</p>
          )}

          {/* Social Links */}
          {creator.socialLinks && Object.keys(creator.socialLinks).length > 0 && (
            <div className="flex flex-wrap gap-3 mt-6">
              {Object.entries(creator.socialLinks).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-neutral-100 px-4 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-200 hover:text-neutral-900"
                >
                  {getSocialIcon(platform)}
                  <span className="capitalize">{platform}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
