import type { UseFormReturn } from 'react-hook-form';
import type { ProductFormData } from '../schemas/product.schema';

interface ProductPublishingCardProps {
  form: UseFormReturn<ProductFormData>;
}

export const ProductPublishingCard = ({ form }: ProductPublishingCardProps) => {
  const { register, watch } = form;
  const status = watch('status');

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Publishing</h2>
      
      <div className="flex flex-col gap-3">
        <label className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors ${status === 'PUBLISHED' ? 'border-[#FF3333] bg-red-50' : 'border-gray-200'}`}>
          <div className="space-y-0.5">
            <div className="font-medium">Published</div>
            <div className="text-xs text-gray-500">Visible on storefront</div>
          </div>
          <input type="radio" value="PUBLISHED" {...register('status')} className="sr-only" />
          <div className={`size-4 rounded-full border ${status === 'PUBLISHED' ? 'border-[5px] border-[#FF3333]' : 'border-gray-300'}`} />
        </label>
        
        <label className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors ${status === 'DRAFT' ? 'border-gray-900 bg-gray-50' : 'border-gray-200'}`}>
          <div className="space-y-0.5">
            <div className="font-medium">Draft</div>
            <div className="text-xs text-gray-500">Hidden from customers</div>
          </div>
          <input type="radio" value="DRAFT" {...register('status')} className="sr-only" />
          <div className={`size-4 rounded-full border ${status === 'DRAFT' ? 'border-[5px] border-gray-900' : 'border-gray-300'}`} />
        </label>
      </div>
    </div>
  );
};
