import React from 'react';
import { Palette } from 'lucide-react';
import './GradientControls.css'

interface GradientControlsProps {
  gradientStart: string;
  gradientEnd: string;
  onGradientStartChange: (color: string) => void;
  onGradientEndChange: (color: string) => void;
}

const GradientControls: React.FC<GradientControlsProps> = ({
  gradientStart,
  gradientEnd,
  onGradientStartChange,
  onGradientEndChange
}) => {
  return (
    <div className="gradient-controls">
      {/* Header */}
      <div className="gradient-header">
        <div className="gradient-icon-container">
          <Palette size={18} className="text-gray-800" />
        </div>
        <h3 className="gradient-title">Border Gradient</h3>
      </div>
      
      {/* Start Color */}
      <div className="gradient-color-section">
        <label className="gradient-label">Start Color</label>
        <div className="gradient-input-row">
          <div className="gradient-color-picker-wrapper">
            <input
              type="color"
              value={gradientStart}
              onChange={(e) => onGradientStartChange(e.target.value)}
              className="gradient-color-picker"
            />
          </div>
          <input
            type="text"
            value={gradientStart}
            onChange={(e) => onGradientStartChange(e.target.value)}
            className="gradient-hex-input"
            placeholder="#000000"
          />
        </div>
      </div>

      {/* End Color */}
      <div className="gradient-color-section">
        <label className="gradient-label">End Color</label>
        <div className="gradient-input-row">
          <div className="gradient-color-picker-wrapper">
            <input
              type="color"
              value={gradientEnd}
              onChange={(e) => onGradientEndChange(e.target.value)}
              className="gradient-color-picker"
            />
          </div>
          <input
            type="text"
            value={gradientEnd}
            onChange={(e) => onGradientEndChange(e.target.value)}
            className="gradient-hex-input"
            placeholder="#000000"
          />
        </div>
      </div>

      {/* Preview */}
      <div className="gradient-preview-section">
        <label className="gradient-label">Preview</label>
        <div 
          className="gradient-preview"
          style={{
            background: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`
          }}
        />
      </div>
    </div>
  );
};

export default GradientControls;