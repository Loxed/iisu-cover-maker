import React from 'react';
import { SystemPreset } from '../types';
import PresetSelector from './PresetSelector';
import IconInput from './IconInput';
import GradientControls from './GradientControls';
import ImageUpload from './ImageUpload';

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
  onGradientStartChange,
  onGradientEndChange,
  onImageUpload,
  onImageRemove
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Customize</h2>

      <PresetSelector 
        presets={presets}
        selectedPresetKey={selectedPresetKey}
        onPresetChange={onPresetChange}
        loading={presetsLoading}
      />

      <IconInput 
        value={customIcon}
        onChange={onIconChange}
        isImageIcon={isImageIcon}
        onImageIconUpload={onImageIconUpload}
      />

      <GradientControls
        gradientStart={gradientStart}
        gradientEnd={gradientEnd}
        onGradientStartChange={onGradientStartChange}
        onGradientEndChange={onGradientEndChange}
      />

      <ImageUpload
        gameImage={gameImage}
        onImageUpload={onImageUpload}
        onImageRemove={onImageRemove}
      />
    </div>
  );
};

export default ControlsPanel;