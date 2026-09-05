import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const ShopperSignupModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show the modal after a short delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md bg-white text-black">
        <DialogHeader>
          <DialogTitle>Save Your Order</DialogTitle>
          <DialogDescription>
            Sign up to ease tracking and get personalized recommendations.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex flex-col gap-3">
          <Link to="/signup" className="w-full">
            <Button className="w-full bg-black text-white hover:bg-neutral-800">
              Create an Account
            </Button>
          </Link>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
