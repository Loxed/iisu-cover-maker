import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import './ImageUpload.css';

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
    <div className="image-upload-container">
      <label className="image-upload-label">Game Artwork</label>
      <input 
        ref={fileInputRef} 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        style={{ display: 'none' }}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="image-upload-button"
        type="button"
      >
        <Upload className="image-upload-icon" />
        <span className="image-upload-text">
          {gameImage ? 'Change Image' : 'Upload Game Artwork'}
        </span>
        <span className="image-upload-hint">PNG or JPG</span>
      </button>
      {gameImage && (
        <button 
          onClick={onImageRemove} 
          className="image-remove-button"
          type="button"
        >
          Remove Image
        </button>
      )}
    </div>
  );
};

export default ImageUpload;