import { useParams } from 'react-router-dom';
import { ProductForm } from '../../features/products/components/ProductForm';
import { useProduct } from '../../features/products/hooks/useProducts';

export default function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProduct(id!);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FF3333] border-t-transparent"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex h-64 flex-col items-center justify-center text-center">
        <p className="text-lg font-medium text-gray-900">Product not found</p>
        <p className="text-gray-500">The product you are trying to edit doesn't exist.</p>
      </div>
    );
  }

  return <ProductForm initialData={product} />;
}
