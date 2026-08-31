import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProductForm, type UseProductFormProps } from '../hooks/useProductForm';
import { ProductGeneralInfo } from './ProductGeneralInfo';
import { ProductMediaCard } from './ProductMediaCard';
import { ProductPublishingCard } from './ProductPublishingCard';

export const ProductForm = ({ initialData }: UseProductFormProps) => {
  const navigate = useNavigate();
  const {
    form,
    categories,
    categoriesLoading,
    isEditing,
    isPending,
    existingImages,
    selectedFiles,
    previewUrls,
    handleFileSelect,
    removeNewFile,
    removeExistingImage,
    onSubmit,
  } = useProductForm({ initialData });

  return (
    <div className="animate-slide-in max-w-4xl mx-auto">
      <div className="mb-8 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard/products')}>
          <ArrowLeft className="size-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {isEditing ? 'Edit Product' : 'New Product'}
          </h1>
          <p className="mt-1 text-gray-500">
            {isEditing ? 'Update your product details and inventory.' : 'Add a new product to your storefront catalog.'}
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <ProductGeneralInfo 
            form={form} 
            categories={categories} 
            categoriesLoading={categoriesLoading} 
          />

          <div className="space-y-6">
            <ProductPublishingCard form={form} />

            <ProductMediaCard 
              existingImages={existingImages}
              selectedFiles={selectedFiles}
              previewUrls={previewUrls}
              onFileSelect={handleFileSelect}
              onRemoveNewFile={removeNewFile}
              onRemoveExistingImage={removeExistingImage}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 border-t border-neutral-300 pt-6 pb-20">
          <Button type="button" variant="ghost" onClick={() => navigate('/dashboard/products')}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending} className="gap-2 min-w-32">
            {isPending ? (
              <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Save className="size-4" />
            )}
            {isEditing ? 'Save Changes' : 'Create Product'}
          </Button>
        </div>
      </form>
    </div>
  );
};
