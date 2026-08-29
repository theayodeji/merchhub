import { User, LogOut } from 'lucide-react';
import type { UserProfile } from '../../../features/profile/types';

interface SidebarUserFooterProps {
  profile: UserProfile | undefined;
  isCollapsed: boolean;
  onLogout: () => void;
}

export const SidebarUserFooter = ({ profile, isCollapsed, onLogout }: SidebarUserFooterProps) => {
  return (
    <div className="p-4 border-t border-gray-100">
      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        <div className="flex items-center gap-3 overflow-y-hidden">
          <div className="size-9 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
            {profile?.image ? (
              <img src={profile.image} alt="Avatar" className="size-9 rounded-full object-cover" />
            ) : (
              <User className="size-5 text-gray-500" />
            )}
          </div>
          {!isCollapsed && (
            <div className="truncate">
              <p className="text-sm font-bold text-gray-900 truncate">{profile?.name}</p>
              <p className="text-xs text-gray-500 truncate">{profile?.email}</p>
            </div>
          )}
        </div>
        
        {!isCollapsed ? (
          <button 
            onClick={onLogout}
            className="p-2 text-gray-400 hover:text-[#FF3333] hover:bg-red-50 rounded-lg transition-colors shrink-0"
            title="Log out"
          >
            <LogOut className="size-5" />
          </button>
        ) : (
          <button 
            onClick={onLogout}
            className="absolute bottom-16 right-0 p-2 bg-white border border-gray-200 shadow-sm rounded-full text-gray-400 hover:text-[#FF3333] translate-x-1/2"
            title="Log out"
          >
            <LogOut className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
};
