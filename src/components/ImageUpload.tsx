import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  gameImage: string | null;
  onImageUpload: (image: string) => void;
  onImageRemove: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ gameImage, onImageUpload, onImageRemove }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => onImageUpload(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Game Artwork</label>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="w-full bg-white text-gray-700 border-2 border-dashed border-gray-300 rounded-lg px-4 py-8 hover:bg-gray-50 hover:border-purple-400 transition-all flex flex-col items-center justify-center gap-2 shadow-sm"
      >
        <Upload size={32} className="text-gray-400" />
        <span className="font-medium">{gameImage ? 'Change Image' : 'Upload Game Artwork'}</span>
        <span className="text-xs text-gray-500">PNG, JPG, or GIF</span>
      </button>
      {gameImage && (
        <button onClick={onImageRemove} className="w-full mt-2 text-red-500 hover:text-red-600 text-sm font-medium">
          Remove Image
        </button>
      )}
    </div>
  );
};

export default ImageUpload;