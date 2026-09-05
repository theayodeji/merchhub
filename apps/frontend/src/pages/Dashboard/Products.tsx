import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  PackageOpen,
  Plus,
  Edit,
  Trash,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useProducts,
  useDeleteProduct,
} from "../../features/products/hooks/useProducts";
import type { DashboardProductFilterDTO } from "@merchhub/shared";

import { useDebounce } from "../../hooks/useDebounce";

export default function Products() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<DashboardProductFilterDTO["status"]>();
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, status]);

  const { data: response, isLoading } = useProducts({
    page,
    limit: 10,
    search: debouncedSearch,
    status,
  });

  const products = response?.data;
  const meta = response?.meta;

  const deleteProduct = useDeleteProduct();

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct.mutate(id);
    }
  };

  const isEmpty = !products || products.length === 0;
  const isFiltersEmpty = !search && !status;

  return (
    <div className="animate-slide-in max-w-6xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Products
          </h1>
          <p className="mt-2 text-gray-500">
            Manage your catalog, inventory, and pricing.
          </p>
        </div>
        {(!isEmpty || !isFiltersEmpty) && (
          <Link to="/dashboard/products/new">
            <Button className="gap-2">
              <Plus className="size-4" />
              New Product
            </Button>
          </Link>
        )}
      </div>

      {(!isEmpty || !isFiltersEmpty) && (
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
            value={status || ""}
            onChange={(e) => setStatus((e.target.value as any) || undefined)}
          >
            <option value="">All Statuses</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
      )}

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FF3333] border-t-transparent"></div>
        </div>
      ) : isEmpty ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white py-24 text-center shadow-sm">
          <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-red-50 text-[#FF3333]">
            <PackageOpen className="size-10" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            No products found
          </h2>
          <p className="mt-2 max-w-sm text-gray-500">
            {isFiltersEmpty
              ? "Get started by adding your first product to your storefront. Customers can't wait to see what you've created!"
              : "Try adjusting your search or filters to find what you're looking for."}
          </p>
          {isFiltersEmpty && (
            <Link to="/dashboard/products/new" className="mt-8">
              <Button size="lg" className="gap-2">
                <Plus className="size-5" />
                Create your first product
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm mb-4">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="border-b border-gray-200 bg-primary/20 text-xs uppercase text-black">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold">
                    Inventory
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold">
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-right font-semibold"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="transition-colors hover:bg-gray-50/50"
                  >
                    <td className="px-6 py-4">
                      <Link
                        to={`/dashboard/products/${product.id}`}
                        className="flex items-center gap-4 group cursor-pointer"
                      >
                        <div className="size-12 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100 group-hover:border-gray-300 transition-colors">
                          {product.images && product.images[0] ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <PackageOpen className="h-full w-full p-3 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                            {product.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {product.category?.name || "Uncategorized"}
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${product.status === "PUBLISHED" ? "bg-green-100 text-green-800" : product.status === "ARCHIVED" ? "bg-gray-100 text-gray-800" : "bg-yellow-100 text-yellow-800"}`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {product.stock > 0 ? (
                        <span>{product.stock} in stock</span>
                      ) : (
                        <span className="text-red-600 font-medium">
                          Out of stock
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      ${(product.price / 100).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/dashboard/products/${product.id}/edit`}>
                            <Edit className="size-4 text-gray-500" />
                            <span className="sr-only">Edit product</span>
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash className="size-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {meta && meta.totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-xl shadow-sm">
              <div className="flex flex-1 justify-between sm:hidden">
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    setPage((p) => Math.min(meta.totalPages, p + 1))
                  }
                  disabled={page === meta.totalPages}
                >
                  Next
                </Button>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">
                      {(page - 1) * meta.limit + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(page * meta.limit, meta.total)}
                    </span>{" "}
                    of <span className="font-medium">{meta.total}</span> results
                  </p>
                </div>
                <div>
                  <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <Button
                      variant="outline"
                      className="rounded-l-md px-2 py-2"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </Button>
                    <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300">
                      Page {page} of {meta.totalPages}
                    </span>
                    <Button
                      variant="outline"
                      className="rounded-r-md px-2 py-2"
                      onClick={() =>
                        setPage((p) => Math.min(meta.totalPages, p + 1))
                      }
                      disabled={page === meta.totalPages}
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </Button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
