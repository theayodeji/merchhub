import { Upload, X } from 'lucide-react';

interface ProductMediaCardProps {
  existingImages: string[];
  selectedFiles: File[];
  previewUrls: string[];
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveNewFile: (index: number) => void;
  onRemoveExistingImage: (index: number) => void;
}

export const ProductMediaCard = ({
  existingImages,
  selectedFiles,
  previewUrls,
  onFileSelect,
  onRemoveNewFile,
  onRemoveExistingImage,
}: ProductMediaCardProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
        <h2 className="text-xl font-bold tracking-tight text-gray-900">Media</h2>
        <span className="text-xs font-bold text-gray-400">{existingImages.length + selectedFiles.length}/5 IMAGES</span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Existing Images */}
        {existingImages.map((url, i) => (
          <div key={`exist-${i}`} className="relative aspect-square rounded-md overflow-hidden border border-gray-200 group bg-gray-100">
            <img src={url} alt="Product preview" className="h-full w-full object-cover" />
            <button 
              type="button"
              onClick={() => onRemoveExistingImage(i)}
              className="absolute top-1 right-1 bg-black/50 hover:bg-black text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="size-3" />
            </button>
          </div>
        ))}
        
        {/* New Image Previews */}
        {previewUrls.map((url, i) => (
          <div key={`new-${i}`} className="relative aspect-square rounded-md overflow-hidden border border-[#FF3333] group bg-gray-100">
            <img src={url} alt="New preview" className="h-full w-full object-cover" />
            <button 
              type="button"
              onClick={() => onRemoveNewFile(i)}
              className="absolute top-1 right-1 bg-black/50 hover:bg-black text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="size-3" />
            </button>
            <div className="absolute bottom-0 inset-x-0 bg-black/60 text-[10px] text-white text-center py-0.5">
              New
            </div>
          </div>
        ))}

        {/* Upload Button */}
        {existingImages.length + selectedFiles.length < 5 && (
          <label className="aspect-square flex flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 hover:border-[#FF3333] hover:bg-red-50 transition-colors cursor-pointer text-gray-500 hover:text-[#FF3333]">
            <Upload className="size-5 mb-1" />
            <span className="text-xs font-medium">Upload</span>
            <input 
              type="file" 
              accept="image/*" 
              multiple 
              className="sr-only" 
              onChange={onFileSelect}
            />
          </label>
        )}
      </div>
    </div>
  );
};
