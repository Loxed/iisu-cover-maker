import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

interface IconInputProps {
  value: string;
  onChange: (value: string) => void;
  isImageIcon: boolean;
  onImageIconUpload: (imagePath: string) => void;
}

const IconInput: React.FC<IconInputProps> = ({ 
  value, 
  onChange, 
  isImageIcon,
  onImageIconUpload 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageIconUpload(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        System Icon
      </label>
      
      <div className="space-y-3">
        {/* Emoji/Text input */}
        <div>
          <label className="block text-xs text-gray-600 mb-1">Emoji or Text</label>
          <input
            type="text"
            value={isImageIcon ? '' : value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="🎮"
            maxLength={2}
            disabled={isImageIcon}
            className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-2xl text-center shadow-sm disabled:bg-gray-100 disabled:text-gray-400"
          />
        </div>

        {/* Image upload */}
        <div>
          <label className="block text-xs text-gray-600 mb-1">Or Upload Icon</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-white text-gray-700 border border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-50 hover:border-purple-400 transition-all flex items-center justify-center gap-2 text-sm"
          >
            <Upload size={16} />
            {isImageIcon ? 'Change Icon Image' : 'Upload Icon Image'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IconInput;