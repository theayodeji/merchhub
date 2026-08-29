import { Search } from 'lucide-react';

interface SidebarSearchProps {
  isCollapsed: boolean;
}

export const SidebarSearch = ({ isCollapsed }: SidebarSearchProps) => {
  if (isCollapsed) return null;

  return (
    <div className="mb-6 px-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full bg-gray-50 border-none rounded-xl pl-9 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-[#FF3333]/20 focus:bg-white outline-none transition-all"
        />
      </div>
    </div>
  );
};
