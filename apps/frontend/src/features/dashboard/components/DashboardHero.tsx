interface DashboardHeroProps {
  creatorName: string | undefined;
}

export const DashboardHero = ({ creatorName }: DashboardHeroProps) => {
  return (
    <div className="relative bg-white rounded-md p-6 md:p-12 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
      <div className="relative z-10 max-w-xl">
        <div className="inline-block px-3 py-1 bg-red-50 text-[#FF3333] text-xs font-bold tracking-wider uppercase rounded-md mb-6">
          Storefront Active
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6 leading-tighter">
          Welcome back, <br />
          <span className="text-[#FF3333]">{creatorName}.</span>
        </h1>
        <p className="text-lg text-gray-500 font-medium">
          Check your latest sales, fulfill orders, and drop new products to your
          audience.
        </p>
      </div>

      {/* Abstract Graphic */}
      <div className="relative w-full max-w-sm hidden md:block">
        <img
          src="https://freepngimg.com/save/25303-sunglasses-photos/400x300"
          alt=""
        />
      </div>
    </div>
  );
};
