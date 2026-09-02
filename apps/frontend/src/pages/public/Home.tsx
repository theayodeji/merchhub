import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePublicProducts } from "../../features/products/hooks/usePublicProducts";
import { ProductGrid } from "../../components/products/ProductGrid";
import { ProductSlider } from "../../components/products/ProductSlider";
import { Button } from "../../components/ui/button";
import { Search, ArrowUpRight } from "lucide-react";
import { categories } from "../../../../../constants/index";

export const Home = () => {
  const navigate = useNavigate();
  const [heroSearch, setHeroSearch] = useState("");

  const { data: featuredData, isLoading: featuredLoading } = usePublicProducts({
    limit: "6",
  });

  const { data: latestData, isLoading: latestLoading } = usePublicProducts({
    limit: "8",
  });

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/search?search=${encodeURIComponent(heroSearch.trim())}`);
    }
  };

  return (
    <div className="w-full pb-16">
      {/* Hero Section */}
      <section className="relative w-full bg-neutral-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-50"
        />
        <div className="container mx-auto px-4 py-32 md:py-48 relative z-20">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Elevate Your Everyday. Discover Exceptional Goods from Independent{" "}
              <span className="text-primary italic">Creatives.</span>
            </h1>

            <form
              onSubmit={handleHeroSearch}
              className="w-full max-w-2xl mt-8 relative"
            >
              <div className="relative flex items-center">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
                <input
                  type="text"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  placeholder="Search for artists, brands, or exclusive releases..."
                  className="w-full h-16 pl-14 pr-32 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                />
                <Button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 "
                  variant="secondary"
                >
                  Search
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Category Quick-Links */}
      <section className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-center gap-8 py-6 text-sm font-bold text-gray-700 tracking-widest uppercase overflow-x-auto whitespace-nowrap hide-scrollbar">
            {categories.map((category: any, idx: number) => (
              <li key={idx}>
                <Link
                  to={`/search?categoryId=${category.name.toLowerCase()}`}
                  className="hover:text-primary transition-colors"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured Showcase Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Featured Showcase
          </h2>
          <p className="text-gray-500">Handpicked exclusives just for you.</p>
        </div>

        <ProductSlider
          products={featuredData?.data || []}
          isLoading={featuredLoading}
        />
      </section>

      {/* Main Product Discovery Section */}
      <section id="products-section" className="container mx-auto px-4 py-16">
        <div className="mb-12 flex flex-row items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Latest Discoveries
          </h2>
          <Button variant="outline" asChild>
            <Link to="/search">View All</Link>
          </Button>
        </div>

        <ProductGrid
          products={latestData?.data || []}
          isLoading={latestLoading}
        />
      </section>

      {/* Creator CTA */}
      <section className="container mx-auto px-4 my-16">
        <div className="bg-neutral-900 rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-black/80 z-10" />
          <img
            src="https://images.unsplash.com/photo-1556740714-a8395b3bf30f?q=80&w=2070&auto=format&fit=crop"
            alt="Creator CTA background"
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="relative z-20 p-12 md:p-24 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Join the Vanguard.
              </h2>
              <p className="text-xl text-neutral-300 mb-8">
                Turn your vision into an empire and launch your premium
                storefront today.
              </p>
              <Button size="lg" variant="secondary">
                Start Selling <ArrowUpRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
