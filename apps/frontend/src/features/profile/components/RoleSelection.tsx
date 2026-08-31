import { ArrowRight, ShoppingBag, Store } from 'lucide-react';

interface RoleSelectionProps {
  onSelect: (role: 'creator' | 'customer') => void;
  isLoadingCustomer?: boolean;
}

export const RoleSelection = ({ onSelect, isLoadingCustomer }: RoleSelectionProps) => {
  return (
    <div className="flex flex-col justify-center p-6 md:p-10 max-w-150 w-full mx-auto">
      <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-2 leading-none">
        Choose your
        <br />
        Path.
      </h1>
      <p className="text-base md:text-lg opacity-80 mb-10 font-medium">
        What are you here to do?
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <button
          onClick={() => onSelect('creator')}
          className="cursor-pointer group flex flex-col items-start p-6 text-left border-4 border-primary bg-background shadow-[8px_8px_0px_0px_var(--color-primary)] hover:translate-y-2 hover:translate-x-2 hover:shadow-none transition-all"
        >
          <Store className="size-10 mb-4" />
          <h2 className="text-2xl font-black uppercase mb-2">Drop Merch</h2>
          <p className="text-sm font-bold opacity-80 mb-4">Set up a storefront and start selling to your audience.</p>
          <div className="mt-auto flex items-center font-bold uppercase tracking-wider text-sm">
            I'm a Creator <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        <button
          onClick={() => onSelect('customer')}
          disabled={isLoadingCustomer}
          className="cursor-pointer group flex flex-col items-start p-6 text-left border-4 border-primary bg-background shadow-[8px_8px_0px_0px_var(--color-primary)] hover:translate-y-2 hover:translate-x-2 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingBag className="size-10 mb-4" />
          <h2 className="text-2xl font-black uppercase mb-2">Cop Merch</h2>
          <p className="text-sm font-bold opacity-80 mb-4">Browse drops, support creators, and buy exclusive gear.</p>
          <div className="mt-auto flex items-center font-bold uppercase tracking-wider text-sm">
            {isLoadingCustomer ? 'Loading...' : "I'm a Shopper"} <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>
    </div>
  );
};
