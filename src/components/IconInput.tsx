import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';
import './IconInput.css';

interface IconInputProps {
  value: string;
  onChange: (value: string) => void;
  isImageIcon: boolean;
  onImageIconUpload: (imagePath: string) => void;
  onClearImageIcon: () => void;
}

const IconInput: React.FC<IconInputProps> = ({ 
  value, 
  onChange, 
  isImageIcon,
  onImageIconUpload,
  onClearImageIcon
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
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClearClick = () => {
    onClearImageIcon();
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="icon-input-container">
      <label className="icon-input-main-label">
        System Icon
      </label>
      
      <div className="icon-input-sections">
        {/* Emoji/Text input */}
        <div className="icon-input-section">
          <label className="icon-input-label">Emoji or Text</label>
          <input
            type="text"
            value={isImageIcon ? '' : value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="..."
            maxLength={2}
            disabled={isImageIcon}
            className="icon-emoji-input"
            key={isImageIcon ? 'disabled' : 'enabled'}
          />
        </div>

        {/* Image upload or clear */}
        <div className="icon-input-section">
          <label className="icon-input-label">
            {isImageIcon ? 'Icon Image' : 'Or Upload Icon'}
          </label>
          
          {isImageIcon ? (
            <div>
              {/* Preview of current image icon */}
              <div className="icon-preview-container">
                <img 
                  src={value} 
                  alt="Icon preview" 
                  className="icon-preview-image"
                />
              </div>
              
              {/* Buttons */}
              <div className="icon-button-grid">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="icon-upload-button icon-change-button"
                  type="button"
                >
                  <Upload size={14} />
                  Change
                </button>
                <button
                  onClick={handleClearClick}
                  className="icon-upload-button icon-clear-button"
                  type="button"
                >
                  <X size={14} />
                  Use Emoji
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="icon-upload-button"
              type="button"
            >
              <Upload size={16} />
              Upload Icon Image
            </button>
          )}
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
      </div>
    </div>
  );
};

export default IconInput;