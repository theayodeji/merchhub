import { type LucideIcon } from "lucide-react";

export interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center text-center p-8 rounded-2xl border border-dashed border-gray-300 bg-gray-50/50">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 mb-6">
        <Icon className="h-10 w-10 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="mt-2 text-neutral-500 max-w-sm">{description}</p>
    </div>
  );
}
