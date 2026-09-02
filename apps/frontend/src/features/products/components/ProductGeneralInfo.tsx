import type { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import type { ProductFormData } from '@merchhub/shared';

interface ProductGeneralInfoProps {
  form: UseFormReturn<ProductFormData>;
  categories: { id: string; name: string }[] | undefined;
  categoriesLoading: boolean;
}

export const ProductGeneralInfo = ({ form, categories, categoriesLoading }: ProductGeneralInfoProps) => {
  const { register, formState: { errors }, watch, setValue } = form;
  const description = watch('description');

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold tracking-tight text-gray-900 border-b border-gray-100 pb-2">General Information</h2>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Product Name</label>
        <Input {...register('name')} placeholder="e.g., Heavyweight Logo Hoodie" className={`bg-white text-gray-900 ${errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}`} />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <RichTextEditor 
          value={description || ""}
          onChange={(val) => setValue('description', val, { shouldValidate: true })}
          placeholder="Describe your product..."
          error={!!errors.description}
        />
        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Price (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input 
              {...register('price')} 
              type="number" 
              step="0.01" 
              min="0"
              className={`pl-8 bg-white text-gray-900 ${errors.price ? 'border-red-500 focus-visible:ring-red-500' : ''}`} 
            />
          </div>
          {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Inventory Stock</label>
          <Input 
            {...register('stock')} 
            type="number" 
            min="0"
            className={`bg-white text-gray-900 ${errors.stock ? 'border-red-500 focus-visible:ring-red-500' : ''}`} 
          />
          {errors.stock && <p className="text-sm text-red-500">{errors.stock.message}</p>}
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Category</label>
        <select
          {...register('categoryId')}
          className={`flex h-10 w-full rounded-md border ${errors.categoryId ? 'border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500' : 'border-gray-200 focus-visible:border-[#FF3333] focus-visible:ring-red-500/10'} bg-white text-gray-900 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 transition-all appearance-none cursor-pointer`}
        >
          <option value="" disabled>Select a category...</option>
          {categoriesLoading ? (
            <option disabled>Loading categories...</option>
          ) : (
            categories?.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))
          )}
        </select>
        {errors.categoryId && <p className="text-sm text-red-500">{errors.categoryId.message}</p>}
      </div>
    </div>
  );
};
