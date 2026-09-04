import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PackagePlus } from "lucide-react";

interface DashboardEmptyStateModalProps {
  productsCount: number;
  isLoading: boolean;
}

export const DashboardEmptyStateModal = ({
  productsCount,
  isLoading,
}: DashboardEmptyStateModalProps) => {
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
      <DialogContent className="w-[85vw] sm:max-w-5xl lg:max-h-125 p-0 overflow-hidden bg-white rounded-2xl shadow-2xl border-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:max-h-125">
          {/* Left Side: Image (Placeholder for user's image) */}
          <img
            src="https://images.pexels.com/photos/35989689/pexels-photo-35989689.jpeg?cs=srgb&dl=pexels-magda-ehlers-pexels-35989689.jpg&fm=jpg"
            alt="Luxury SHopping"
            className="w-full hidden lg:block lg:h-125 object-cover"
          />

          {/* Right Side: CTA Content */}
          <div className="p-10 md:p-14 w-full flex flex-col justify-center">
            <div className="size-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <PackagePlus className="size-6 text-primary" />
            </div>

            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-4">
              Welcome to Your Store
            </h2>

            <p className="text-gray-500 mb-8 leading-relaxed">
              It looks like you haven't added any products yet. Let's get your
              store set up and ready to start generating sales. It only takes a
              few minutes to create your first drop!
            </p>

            <div className="flex flex-col 2xl:flex-row gap-3">
              <Button asChild className="bg-primary">
                <Link to="/dashboard/products/new">Create First Product</Link>
              </Button>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Explore Dashboard
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
