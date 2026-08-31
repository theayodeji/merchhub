import type { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import type { ProductFormData } from '../schemas/product.schema';

interface ProductGeneralInfoProps {
  form: UseFormReturn<ProductFormData>;
  categories: { id: string; name: string }[] | undefined;
  categoriesLoading: boolean;
}

export const ProductGeneralInfo = ({ form, categories, categoriesLoading }: ProductGeneralInfoProps) => {
  const { register, formState: { errors }, watch, setValue } = form;
  const description = watch('description');

  return (
    <div className="md:col-span-2 space-y-6 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">General Information</h2>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Product Name</label>
        <Input {...register('name')} placeholder="e.g., Heavyweight Logo Hoodie" className="bg-gray-50" />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <RichTextEditor 
          value={description}
          onChange={(val) => setValue('description', val, { shouldValidate: true })}
          placeholder="Describe your product..."
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
              className="pl-8 bg-gray-50" 
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
            className="bg-gray-50" 
          />
          {errors.stock && <p className="text-sm text-red-500">{errors.stock.message}</p>}
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Category</label>
        <select
          {...register('categoryId')}
          className="flex h-10 w-full rounded-md border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:border-[#FF3333] focus-visible:ring-2 focus-visible:ring-red-500/10 focus:bg-white transition-all appearance-none cursor-pointer"
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
