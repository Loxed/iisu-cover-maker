import React from 'react';
import { SystemPreset } from '../types';
import PresetSelector from './PresetSelector';
import IconInput from './IconInput';
import GradientControls from './GradientControls';
import ImageUpload from './ImageUpload';
import './ControlsPanel.css';

interface ControlsPanelProps {
  presets: SystemPreset[];
  selectedPresetKey: string;
  customIcon: string;
  gradientStart: string;
  gradientEnd: string;
  gameImage: string | null;
  isImageIcon: boolean;
  presetsLoading: boolean;
  onPresetChange: (preset: SystemPreset) => void;
  onIconChange: (icon: string) => void;
  onImageIconUpload: (imagePath: string) => void;
  onClearImageIcon: () => void;
  onGradientStartChange: (color: string) => void;
  onGradientEndChange: (color: string) => void;
  onImageUpload: (image: string) => void;
  onImageRemove: () => void;
}

const ControlsPanel: React.FC<ControlsPanelProps> = ({
  presets,
  selectedPresetKey,
  customIcon,
  gradientStart,
  gradientEnd,
  gameImage,
  isImageIcon,
  presetsLoading,
  onPresetChange,
  onIconChange,
  onImageIconUpload,
  onClearImageIcon,
  onGradientStartChange,
  onGradientEndChange,
  onImageUpload,
  onImageRemove
}) => {
  // Create CSS variables for dynamic theming
  const themeStyles = {
    '--gradient-start': gradientStart,
    '--gradient-end': gradientEnd
  } as React.CSSProperties;

  return (
    <div className="controls-panel" style={themeStyles}>
      <div className="controls-panel-content">
        <h2 className="controls-panel-title">Customize</h2>

        <div className="controls-section">
          <PresetSelector 
            presets={presets}
            selectedPresetKey={selectedPresetKey}
            onPresetChange={onPresetChange}
            loading={presetsLoading}
          />
        </div>

        <div className="controls-section">
          <IconInput 
            value={customIcon}
            onChange={onIconChange}
            isImageIcon={isImageIcon}
            onImageIconUpload={onImageIconUpload}
            onClearImageIcon={onClearImageIcon}
          />
        </div>

        <div className="controls-section">
          <GradientControls
            gradientStart={gradientStart}
            gradientEnd={gradientEnd}
            onGradientStartChange={onGradientStartChange}
            onGradientEndChange={onGradientEndChange}
          />
        </div>

        <div className="controls-section">
          <ImageUpload
            gameImage={gameImage}
            onImageUpload={onImageUpload}
            onImageRemove={onImageRemove}
          />
        </div>
      </div>
    </div>
  );
};

export default ControlsPanel;