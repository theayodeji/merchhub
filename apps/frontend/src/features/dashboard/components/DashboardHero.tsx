import { PackageOpen, TrendingUp, Plus } from 'lucide-react';

interface DashboardHeroProps {
  displayName: string | undefined;
}

export const DashboardHero = ({ displayName }: DashboardHeroProps) => {
  return (
    <div className="relative bg-white rounded-md p-10 md:p-16 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
      <div className="relative z-10 max-w-xl">
        <div className="inline-block px-3 py-1 bg-red-50 text-[#FF3333] text-xs font-bold tracking-wider uppercase rounded-md mb-6">
          Storefront Active
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
          Manage your <br/>
          <span className="text-[#FF3333]">Merch Empire.</span>
        </h1>
        <p className="text-lg text-gray-500 mb-8 font-medium">
          Welcome back, {displayName}. Check your latest sales, fulfill orders, and drop new products to your audience.
        </p>
        <button className="flex items-center gap-2 px-8 py-4 rounded-md bg-[#FF3333] text-white font-bold hover:bg-red-600 hover:shadow-lg transition-all active:scale-95">
          <Plus className="size-5" />
          Create New Drop
        </button>
      </div>

      {/* Abstract Graphic */}
      <div className="relative w-full max-w-sm hidden md:block">
        <div className="absolute inset-0 bg-[#FF3333]/10 rounded-full blur-[80px]"></div>
        <div className="relative z-10 bg-white rounded-md border border-gray-100 shadow-xl p-6 rotate-3 transform hover:rotate-0 transition-all duration-500">
          <div className="h-40 bg-gray-50 rounded-md mb-4 flex items-center justify-center">
            <PackageOpen className="size-12 text-gray-300" />
          </div>
          <div className="h-4 w-3/4 bg-gray-200 rounded-md mb-2"></div>
          <div className="h-4 w-1/2 bg-gray-100 rounded-md"></div>
        </div>
        <div className="absolute -bottom-8 -left-8 z-20 bg-white rounded-md border border-gray-100 shadow-xl p-5 -rotate-6 transform hover:rotate-0 transition-all duration-500">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <TrendingUp className="size-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Revenue</p>
              <p className="text-lg font-bold text-gray-900">+24%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
