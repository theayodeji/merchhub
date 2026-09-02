import { useMarketplaceFeed } from "@/features/marketplace/hooks/useMarketplace";
import { MarketplaceFeed } from "@/features/marketplace/components/MarketplaceFeed";
import {
  categories,
  creators,
  products as fakeProducts,
} from "../../../../../constants/index";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  RefreshCw,
  Headphones,
} from "lucide-react";
import { Link } from "react-router-dom";

export const MarketplacePage = () => {
  const { data, isLoading } = useMarketplaceFeed(1, 20);

  // We can merge API data with fake products if API is empty, to ensure UI looks good.
  const displayProducts = (
    data?.data?.length ? data.data : fakeProducts
  ) as any[];

  return (
    <div className="w-full pb-16">
      {/* Secondary Navigation */}
      <div className="w-full border-b border-gray-200 bg-white hidden md:block">
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-center gap-8 py-4 text-xs font-bold text-gray-700 tracking-widest uppercase">
            <li>
              <Link to="#" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-primary transition-colors">
                Categories
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-primary transition-colors">
                T-Shirts
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-primary transition-colors">
                Hoodies
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-primary transition-colors">
                Accessories
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-primary transition-colors">
                Creators
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-primary transition-colors">
                Best Sellers
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-red-500 hover:text-red-600 transition-colors"
              >
                Hot Offers
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full bg-neutral-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-60"
        />
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-20">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
              Discover Products <br className="hidden md:block" /> You'll Love
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 mb-8 max-w-lg">
              Shop the latest trending merch curated from your favorite creators
              worldwide.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="cursor-pointer">
                Shop Now <ArrowRight className="ml-2 size-4" />
              </Button>
              <Button size="lg" variant="secondary" className="cursor-pointer">
                Explore Collections
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm font-medium text-gray-700">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Truck className="size-5 text-primary" />
              <span>Free Shipping Over $50</span>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <ShieldCheck className="size-5 text-primary" />
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <RefreshCw className="size-5 text-primary" />
              <span>Easy 30-Day Returns</span>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Headphones className="size-5 text-primary" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Top Categories */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Shop by Categories
          </h2>
          <Link
            to="#"
            className="text-sm font-medium text-primary hover:underline flex items-center"
          >
            View All Categories <ArrowRight className="ml-1 size-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category: any, idx: number) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-square sm:aspect-[4/3]"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 p-4 md:p-6 z-20">
                <h3 className="text-white font-bold text-lg md:text-xl drop-shadow-md">
                  {category.name}
                </h3>
                <span className="text-white/80 text-sm font-medium flex items-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  Shop Now <ArrowRight className="ml-1 size-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Creators */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Trending Creators
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {creators.map((creator: any) => (
              <div
                key={creator.id}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <img
                  src={creator.image}
                  alt={creator.name}
                  className="size-16 rounded-full object-cover border-2 border-gray-100"
                />
                <div>
                  <h3 className="font-bold text-gray-900">{creator.name}</h3>
                  <p className="text-sm text-gray-500">{creator.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Product Feed */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            New Arrivals
          </h2>
          <Link
            to="#"
            className="text-sm font-medium text-primary hover:underline flex items-center"
          >
            View All Products <ArrowRight className="ml-1 size-3" />
          </Link>
        </div>
        <MarketplaceFeed products={displayProducts} isLoading={isLoading} />
      </section>
    </div>
  );
};
