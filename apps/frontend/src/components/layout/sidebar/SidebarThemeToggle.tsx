import { Sun, Moon } from 'lucide-react';

interface SidebarThemeToggleProps {
  isCollapsed: boolean;
}

export const SidebarThemeToggle = ({ isCollapsed }: SidebarThemeToggleProps) => {
  if (isCollapsed) return null;

  return (
    <div className="mt-8 px-2">
      <div className="bg-gray-50 p-1 rounded-xl flex items-center">
        <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white rounded-lg shadow-sm text-xs font-bold text-gray-900">
          <Sun className="size-4" /> Light
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold text-gray-400 hover:text-gray-600">
          <Moon className="size-4" /> Dark
        </button>
      </div>
    </div>
  );
};
