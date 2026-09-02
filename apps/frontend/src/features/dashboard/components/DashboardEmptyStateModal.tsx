import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PackagePlus } from 'lucide-react';

interface DashboardEmptyStateModalProps {
  productsCount: number;
  isLoading: boolean;
}

export const DashboardEmptyStateModal = ({ productsCount, isLoading }: DashboardEmptyStateModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Auto-open modal if there are no products and we finish loading
  useEffect(() => {
    if (!isLoading && productsCount === 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [productsCount, isLoading]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-4xl p-0 overflow-hidden bg-white rounded-2xl shadow-2xl border-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Side: Image (Placeholder for user's image) */}
          <div className="relative h-64 md:h-auto bg-neutral-100 flex items-center justify-center">
            {/* TODO: Replace with the actual image the user supplies */}
            <div className="absolute inset-0 bg-neutral-200 animate-pulse" />
            <span className="relative text-neutral-400 font-medium text-sm">
              Image Placeholder
            </span>
          </div>

          {/* Right Side: CTA Content */}
          <div className="p-10 md:p-14 flex flex-col justify-center">
            <div className="size-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <PackagePlus className="size-6 text-primary" />
            </div>
            
            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-4">
              Welcome to Your Store
            </h2>
            
            <p className="text-gray-500 mb-8 leading-relaxed">
              It looks like you haven't added any products yet. Let's get your store set up and ready to start generating sales. It only takes a few minutes to create your first drop!
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 font-bold shadow-lg shadow-primary/20 transition-all">
                <Link to="/dashboard/products/new">
                  Create First Product
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="rounded-full px-8 py-6 font-bold border-gray-200 text-gray-600 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Explore Dashboard
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
