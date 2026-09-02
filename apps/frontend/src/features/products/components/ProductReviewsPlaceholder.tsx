import { MessageSquarePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ProductReviewsPlaceholder = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 justify-between">
        <div className="flex-1 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4">
            Coming Soon
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Customer Reviews & Ratings
          </h3>
          <p className="text-gray-500 font-medium text-sm leading-relaxed mb-6">
            We're building a powerful new feature that will allow your customers to leave verified photo reviews and star ratings directly on this product. This will help build social proof and dramatically increase your conversion rates!
          </p>
          <Button variant="outline" className="border-gray-200 text-gray-600 font-semibold" disabled>
            <MessageSquarePlus className="mr-2 size-4" />
            Enable Reviews (Soon)
          </Button>
        </div>
        
        {/* Decorative graphic */}
        <div className="relative w-full max-w-[240px] hidden sm:block shrink-0">
          <div className="absolute inset-0 bg-blue-100 rounded-full blur-[60px] opacity-60"></div>
          <div className="relative z-10 bg-white border border-gray-100 shadow-xl rounded-xl p-5 -rotate-3 transform">
            <div className="flex items-center gap-2 mb-3">
              {[1, 2, 3, 4, 5].map(i => (
                <svg key={i} className="size-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className="space-y-2">
              <div className="h-2.5 bg-gray-200 rounded w-full"></div>
              <div className="h-2.5 bg-gray-200 rounded w-5/6"></div>
              <div className="h-2.5 bg-gray-100 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
