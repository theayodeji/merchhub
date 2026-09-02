import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productFormSchema, type ProductFormData } from '@merchhub/shared';
import { useCreateProduct, useUpdateProduct, useProductCategories } from './useProducts';
import type { Product } from './useProducts';

export interface UseProductFormProps {
  initialData?: Product;
}

export const useProductForm = ({ initialData }: UseProductFormProps = {}) => {
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const { data: categories, isLoading: categoriesLoading } = useProductCategories();
  
  const isEditing = !!initialData;
  const isPending = createProduct.isPending || updateProduct.isPending;

  // Handle existing images and new file uploads
  const [existingImages, setExistingImages] = useState<string[]>(initialData?.images || []);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      price: initialData ? initialData.price / 100 : 0, // convert cents to dollars
      stock: initialData?.stock || 0,
      categoryId: initialData?.categoryId || '',
      status: initialData?.status || 'DRAFT',
    },
  });

  // Generate previews for new files
  useEffect(() => {
    const urls = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
    return () => urls.forEach(url => URL.revokeObjectURL(url));
  }, [selectedFiles]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Limit to 5 total images
      const currentTotal = existingImages.length + selectedFiles.length;
      const newFiles = Array.from(e.target.files);
      
      if (currentTotal + newFiles.length > 5) {
        alert('You can only upload up to 5 images per product.');
        return;
      }
      
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeNewFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (data: ProductFormData) => {
    if (existingImages.length === 0 && selectedFiles.length === 0) {
      alert('At least one product image is required.');
      return;
    }

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description || '');
    formData.append('price', Math.round((data.price as number) * 100).toString()); // convert dollars to cents
    formData.append('stock', data.stock.toString());
    formData.append('categoryId', data.categoryId);
    formData.append('status', data.status);
    
    // Append new files
    selectedFiles.forEach(file => {
      formData.append('images', file);
    });

    // If editing, we must also send which existing images are kept
    if (isEditing && initialData) {
      formData.append('existingImages', JSON.stringify(existingImages));
      updateProduct.mutate({ id: initialData.id, formData });
    } else {
      createProduct.mutate(formData);
    }
  };

  return {
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
    onSubmit: form.handleSubmit(onSubmit),
  };
};
