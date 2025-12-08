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
  colors: string[];
  gameImage: string | null;
  isImageIcon: boolean;
  presetsLoading: boolean;

  onPresetChange: (preset: SystemPreset) => void;
  onIconChange: (icon: string) => void;
  onImageIconUpload: (imagePath: string) => void;
  onClearImageIcon: () => void;

  onColorChange: (index: number, color: string) => void;
  onAddColor: () => void;
  onRemoveColor: (index: number) => void;
  onReorderColors: (fromIndex: number, toIndex: number) => void;

  onImageUpload: (image: string) => void;
  onImageRemove: () => void;
}

const ControlsPanel: React.FC<ControlsPanelProps> = ({
  presets,
  selectedPresetKey,
  customIcon,
  colors,
  gameImage,
  isImageIcon,
  presetsLoading,

  onPresetChange,
  onIconChange,
  onImageIconUpload,
  onClearImageIcon,

  onColorChange,
  onAddColor,
  onRemoveColor,
  onReorderColors,

  onImageUpload,
  onImageRemove
}) => {
  const themeStyles = { '--gradient-start': colors[0], '--gradient-end': colors[colors.length - 1] } as React.CSSProperties;

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
            colors={colors}
            onColorChange={onColorChange}
            onAddColor={onAddColor}
            onRemoveColor={onRemoveColor}
            onReorderColors={onReorderColors}
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
