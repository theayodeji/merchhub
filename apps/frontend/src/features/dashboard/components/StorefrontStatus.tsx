import { Button } from '@/components/ui/button';
import { PackagePlus } from 'lucide-react';

export const StorefrontStatus = () => {
  return (
    <div className="p-6 md:p-12 border-4 border-secondary bg-background shadow-[8px_8px_0px_0px_var(--color-secondary)]">
      <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Your Storefront</h3>
      <p className="mb-8 opacity-80 text-lg">No products uploaded yet. Start building your drop.</p>
      
      <Button variant="default" className="w-full sm:w-auto">
        Create Product <PackagePlus className="ml-2 size-5" />
      </Button>
    </div>
  );
};
