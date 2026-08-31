import { type CreatorProfileData } from '../hooks/useStorefront';

interface CreatorProfileProps {
  creator: CreatorProfileData;
}

export const CreatorProfile = ({ creator }: CreatorProfileProps) => {
  return (
    <div className="flex flex-col items-center border-b border-neutral-200 pb-12 pt-16 text-center dark:border-neutral-800">
      <div className="mb-6 h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-neutral-100 shadow-lg dark:border-neutral-900 dark:bg-neutral-800">
        {creator.image ? (
          <img src={creator.image} alt={creator.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl font-semibold text-neutral-400">
            {creator.name.charAt(0)}
          </div>
        )}
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">{creator.name}</h1>
      <p className="mt-2 text-lg text-neutral-500">@{creator.username}</p>
      
      {creator.bio && (
        <p className="mt-6 max-w-2xl text-neutral-600 dark:text-neutral-400">{creator.bio}</p>
      )}

      {creator.socialLinks && Object.keys(creator.socialLinks).length > 0 && (
        <div className="mt-6 flex gap-4">
          {Object.entries(creator.socialLinks).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 transition-colors hover:text-neutral-900 dark:hover:text-neutral-50 capitalize"
            >
              {platform}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
