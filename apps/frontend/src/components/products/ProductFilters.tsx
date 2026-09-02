import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { Button } from "../ui/button";

const categories = [
  { id: "", name: "All Categories" },
  { id: "apparel", name: "Apparel" },
  { id: "accessories", name: "Accessories" },
  { id: "digital", name: "Digital" },
  { id: "collectibles", name: "Collectibles" },
];

export const ProductFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Local state
  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");
  const [categoryId, setCategoryId] = useState(searchParams.get("categoryId") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  // Update local search state if URL changes externally
  useEffect(() => {
    setSearchValue(searchParams.get("search") || "");
  }, [searchParams]);

  // Debounce search update
  useEffect(() => {
    const handler = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams);
      const currentSearch = newParams.get("search") || "";
      if (searchValue !== currentSearch) {
        if (searchValue) {
          newParams.set("search", searchValue);
        } else {
          newParams.delete("search");
        }
        newParams.set("page", "1");
        setSearchParams(newParams, { replace: true });
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [searchValue, searchParams, setSearchParams]);

  const applyFilters = () => {
    const newParams = new URLSearchParams(searchParams);
    
    if (categoryId) newParams.set("categoryId", categoryId);
    else newParams.delete("categoryId");

    if (minPrice) newParams.set("minPrice", minPrice);
    else newParams.delete("minPrice");

    if (maxPrice) newParams.set("maxPrice", maxPrice);
    else newParams.delete("maxPrice");

    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchValue("");
    setCategoryId("");
    setMinPrice("");
    setMaxPrice("");
    
    const newParams = new URLSearchParams();
    setSearchParams(newParams);
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-white rounded-2xl border border-gray-200">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search products..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="flex h-12 w-full rounded-md border border-gray-200 bg-gray-50/50 px-4 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:border-[#FF3333] focus-visible:ring-4 focus-visible:ring-red-500/10 focus:bg-white"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Min Price ($)</label>
          <Input
            type="number"
            min="0"
            placeholder="0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Max Price ($)</label>
          <Input
            type="number"
            min="0"
            placeholder="Any"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-2">
        <Button variant="outline" onClick={clearFilters}>
          Clear
        </Button>
        <Button onClick={applyFilters}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
};
