import { Link } from 'react-router-dom';
import { PackageOpen, Plus, Edit, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProducts, useDeleteProduct } from '../../features/products/hooks/useProducts';

export default function Products() {
  const { data: products, isLoading } = useProducts();
  const deleteProduct = useDeleteProduct();

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FF3333] border-t-transparent"></div>
      </div>
    );
  }

  const isEmpty = !products || products.length === 0;

  return (
    <div className="animate-slide-in max-w-6xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Products</h1>
          <p className="mt-2 text-gray-500">Manage your catalog, inventory, and pricing.</p>
        </div>
        {!isEmpty && (
          <Link to="/dashboard/products/new">
            <Button className="gap-2">
              <Plus className="size-4" />
              New Product
            </Button>
          </Link>
        )}
      </div>

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white py-24 text-center shadow-sm">
          <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-red-50 text-[#FF3333]">
            <PackageOpen className="size-10" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">No products yet</h2>
          <p className="mt-2 max-w-sm text-gray-500">
            Get started by adding your first product to your storefront. Customers can't wait to see what you've created!
          </p>
          <Link to="/dashboard/products/new" className="mt-8">
            <Button size="lg" className="gap-2">
              <Plus className="size-5" />
              Create your first product
            </Button>
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50/50 text-xs uppercase text-gray-500">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">Product</th>
                <th scope="col" className="px-6 py-4 font-semibold">Status</th>
                <th scope="col" className="px-6 py-4 font-semibold">Inventory</th>
                <th scope="col" className="px-6 py-4 font-semibold">Price</th>
                <th scope="col" className="px-6 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="transition-colors hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="size-12 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
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
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-xs text-gray-500">{product.category?.name || 'Uncategorized'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      product.status === 'PUBLISHED' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {product.stock > 0 ? (
                      <span>{product.stock} in stock</span>
                    ) : (
                      <span className="text-red-600 font-medium">Out of stock</span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    ${(product.price / 100).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/dashboard/products/${product.id}/edit`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-[#FF3333]">
                          <Edit className="size-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-gray-500 hover:text-red-600"
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
      )}
    </div>
  );
}
