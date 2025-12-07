import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { SystemPreset } from '../types';
import './PresetSelector.css';

interface PresetSelectorProps {
  presets: SystemPreset[];
  selectedPresetKey: string;
  onPresetChange: (preset: SystemPreset) => void;
  loading?: boolean;
}

const PresetSelector: React.FC<PresetSelectorProps> = ({ 
  presets,
  selectedPresetKey,
  onPresetChange,
  loading = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const selectedPreset = presets.find(p => p.key === selectedPresetKey);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 255, g: 255, b: 255 };
  };

  const getItemBackground = (preset: SystemPreset) => {
    // Safety check - use default colors if gradient is missing
    if (!preset.gradient || preset.gradient.length < 2) {
      return 'linear-gradient(90deg, rgba(200, 200, 200, 0.85), rgba(180, 180, 180, 0.85))';
    }
    
    const [startColor, endColor] = preset.gradient;
    const startRgb = hexToRgb(startColor);
    const endRgb = hexToRgb(endColor);
    
    // 20% white + 80% gradient color
    const startR = Math.round(255 * 0.2 + startRgb.r * 0.8);
    const startG = Math.round(255 * 0.2 + startRgb.g * 0.8);
    const startB = Math.round(255 * 0.2 + startRgb.b * 0.8);
    
    const endR = Math.round(255 * 0.2 + endRgb.r * 0.8);
    const endG = Math.round(255 * 0.2 + endRgb.g * 0.8);
    const endB = Math.round(255 * 0.2 + endRgb.b * 0.8);
    
    return `linear-gradient(90deg, rgba(${startR}, ${startG}, ${startB}, 0.85), rgba(${endR}, ${endG}, ${endB}, 0.85))`;
  };

  const renderIcon = (preset: SystemPreset) => {
    // Show emoji for custom preset
    if (preset.key === 'custom') {
      return (
        <span style={{ fontSize: '20px' }}>🎮</span>
      );
    }
    
    if (!preset.iconPath) {
      return null;
    }
    
    return (
      <img 
        src={preset.iconPath} 
        alt=""
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
          if (placeholder) placeholder.style.display = 'block';
        }}
      />
    );
  };

  return (
    <div className="preset-selector-container">
      <label className="preset-selector-label">
        System Preset
      </label>
      {loading ? (
        <div className="preset-selector-loading">
          Loading presets...
        </div>
      ) : (
        <div className="preset-selector-wrapper" ref={wrapperRef}>
          <div 
            className={`preset-custom-select ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: selectedPreset ? getItemBackground(selectedPreset) : 'linear-gradient(135deg, rgba(241, 245, 249, 0.95), rgba(226, 232, 240, 0.9))'
            }}
          >
            <div className="preset-selected-icon">
              {selectedPreset && renderIcon(selectedPreset)}
              <div className="preset-icon-placeholder" style={{ display: selectedPreset?.iconPath || selectedPreset?.key === 'custom' ? 'none' : 'block' }} />
            </div>
            <span>{selectedPreset?.name || 'Select a preset'}</span>
          </div>
          <ChevronDown size={16} className="preset-selector-arrow" />
          
          {isOpen && (
            <div className="preset-dropdown">
              {presets.map((preset, index) => (
                <div
                  key={preset.key}
                  className={`preset-dropdown-option ${preset.key === selectedPresetKey ? 'selected' : ''}`}
                  style={{ 
                    background: getItemBackground(preset),
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    color: '#ffffff'
                  }}
                  onClick={() => {
                    onPresetChange(preset);
                    setIsOpen(false);
                  }}
                >
                  <div className="preset-option-icon">
                    {renderIcon(preset)}
                    <div className="preset-icon-placeholder" style={{ display: preset.iconPath || preset.key === 'custom' ? 'none' : 'block' }} />
                  </div>
                  <span style={{ position: 'relative', zIndex: 1 }}>{preset.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PresetSelector;