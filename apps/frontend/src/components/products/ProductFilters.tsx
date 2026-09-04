import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "../ui/input";
import { Search, X, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../ui/button";
import { useCategories } from "../../features/products/hooks/useCategories";

export const ProductFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: categories = [], isLoading: isLoadingCategories } = useCategories();
  
  // Local state for debounced inputs
  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);

  // Update local state if URL changes externally
  useEffect(() => {
    setSearchValue(searchParams.get("search") || "");
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
  }, [searchParams]);

  // Debounce search update
  useEffect(() => {
    const handler = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams);
      let changed = false;

      const currentSearch = newParams.get("search") || "";
      if (searchValue !== currentSearch) {
        if (searchValue) newParams.set("search", searchValue);
        else newParams.delete("search");
        changed = true;
      }

      const currentMin = newParams.get("minPrice") || "";
      if (minPrice !== currentMin) {
        if (minPrice) newParams.set("minPrice", minPrice);
        else newParams.delete("minPrice");
        changed = true;
      }

      const currentMax = newParams.get("maxPrice") || "";
      if (maxPrice !== currentMax) {
        if (maxPrice) newParams.set("maxPrice", maxPrice);
        else newParams.delete("maxPrice");
        changed = true;
      }

      if (changed) {
        newParams.set("page", "1");
        setSearchParams(newParams, { replace: true });
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [searchValue, minPrice, maxPrice, searchParams, setSearchParams]);

  const handleCategoryChange = (categoryId: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (categoryId) newParams.set("categoryId", categoryId);
    else newParams.delete("categoryId");
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchValue("");
    setMinPrice("");
    setMaxPrice("");
    
    const newParams = new URLSearchParams();
    setSearchParams(newParams);
  };

  const currentCategory = searchParams.get("categoryId") || "";
  const hasActiveFilters = searchValue || currentCategory || minPrice || maxPrice;

  return (
    <div className="flex flex-col gap-10 w-full">
      {/* Search */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-neutral-400 group-focus-within:text-neutral-900 transition-colors duration-300" />
        <Input
          placeholder="Search items..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="pl-12 h-14 bg-neutral-50/50 border-neutral-200 focus-visible:ring-1 focus-visible:ring-neutral-900 focus-visible:border-neutral-900 rounded-2xl transition-all duration-300 hover:border-neutral-300 hover:bg-white text-base shadow-sm"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-col gap-4">
        <button 
          onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="text-xs font-semibold tracking-widest uppercase text-neutral-500 ml-1">Category</h3>
          {isCategoriesOpen ? (
            <ChevronUp className="w-4 h-4 text-neutral-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-neutral-400" />
          )}
        </button>
        
        {isCategoriesOpen && (
          <div className="flex flex-col gap-1.5">
            {isLoadingCategories ? (
              <div className="flex items-center gap-2 px-4 py-3 text-sm text-neutral-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading categories...
              </div>
            ) : (
              <>
                <button
                  onClick={() => handleCategoryChange("")}
                  className={`text-left px-4 py-3 rounded-xl text-sm transition-all duration-300 ${
                    currentCategory === ""
                      ? "bg-neutral-900 text-white font-medium shadow-md shadow-neutral-900/10 translate-x-1"
                      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 hover:translate-x-1"
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => {
                  const isActive = currentCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`text-left px-4 py-3 rounded-xl text-sm transition-all duration-300 ${
                        isActive
                          ? "bg-neutral-900 text-white font-medium shadow-md shadow-neutral-900/10 translate-x-1"
                          : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 hover:translate-x-1"
                      }`}
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </>
            )}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xs font-semibold tracking-widest uppercase text-neutral-500 ml-1">Price Range</h3>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm group-focus-within:text-neutral-900 transition-colors duration-300">$</span>
            <Input
              type="number"
              min="0"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="pl-8 h-12 bg-neutral-50/50 border-neutral-200 focus-visible:ring-1 focus-visible:ring-neutral-900 focus-visible:border-neutral-900 rounded-xl transition-all duration-300 hover:border-neutral-300 hover:bg-white text-sm"
            />
          </div>
          <span className="text-neutral-300">-</span>
          <div className="relative flex-1 group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm group-focus-within:text-neutral-900 transition-colors duration-300">$</span>
            <Input
              type="number"
              min="0"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="pl-8 h-12 bg-neutral-50/50 border-neutral-200 focus-visible:ring-1 focus-visible:ring-neutral-900 focus-visible:border-neutral-900 rounded-xl transition-all duration-300 hover:border-neutral-300 hover:bg-white text-sm"
            />
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="pt-4 border-t border-neutral-100">
          <Button 
            variant="ghost" 
            onClick={clearFilters}
            className="w-full flex items-center justify-center gap-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-all duration-300 h-12 rounded-xl font-medium"
          >
            <X className="w-4 h-4" />
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
};
