import React, { useState, useEffect } from 'react';
import DotGridBackground from '../components/DotGridBackground';
import PreviewPanel from '../components/PreviewPanel';
import PresetSelector from '../components/PresetSelector';
import IconInput from '../components/IconInput';
import GradientControls from '../components/GradientControls';
import ImageUpload from '../components/ImageUpload';
import { SystemPreset } from '../types';
import { loadSystemPresets } from '../services/presetService';
import { exportIconToCanvas } from '../utils/ExportIcon';

const IconMaker = () => {
  const [presets, setPresets] = useState<SystemPreset[]>([]);
  const [presetsLoading, setPresetsLoading] = useState(true);
  const [selectedPresetKey, setSelectedPresetKey] = useState<string>('custom');
  const [customIcon, setCustomIcon] = useState<string>('🎮');
  const [isImageIcon, setIsImageIcon] = useState<boolean>(false);
  const [gradientStart, setGradientStart] = useState<string>('#9333ea');
  const [gradientEnd, setGradientEnd] = useState<string>('#06b6d4');
  const [gameImage, setGameImage] = useState<string | null>(null);
  const [iconSize, setIconSize] = useState<number>(300);
  const [artworkZoom, setArtworkZoom] = useState<number>(1.0);

  useEffect(() => {
    loadSystemPresets().then(loadedPresets => {
      setPresets(loadedPresets);
      setPresetsLoading(false);
      if (loadedPresets.length > 0) {
        const firstPreset = loadedPresets[0];
        handlePresetChange(firstPreset);
      }
    });
  }, []);

  const handlePresetChange = (preset: SystemPreset) => {
    console.log('Changing to preset:', preset);
    setSelectedPresetKey(preset.key);
    setGradientStart(preset.gradient[0]);
    setGradientEnd(preset.gradient[1]);

    if (preset.iconPath) {
      setCustomIcon(preset.iconPath);
      setIsImageIcon(true);
    } else {
      setCustomIcon('⭐');
      setIsImageIcon(false);
    }

    // Set artwork immediately - GameCartridgeBuilder will handle the error state
    if (preset.artworkPath) {
      console.log('Setting artwork to:', preset.artworkPath);
      setGameImage(preset.artworkPath);
      setArtworkZoom(1.0); // Reset zoom when changing presets
    } else {
      console.log('No artwork path for this preset');
      setGameImage(null);
    }
  };

  const handleIconChange = (icon: string) => {
    setCustomIcon(icon);
    setIsImageIcon(false);
  };

  const handleImageIconUpload = (imagePath: string) => {
    setCustomIcon(imagePath);
    setIsImageIcon(true);
  };

  const handleDownload = () => {
    exportIconToCanvas(customIcon, gradientStart, gradientEnd, gameImage, isImageIcon);
  };

  return (
    <>
      <DotGridBackground />
      <div className="min-h-screen p-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-3">Game Cartridge Icon Maker</h1>
            <p className="text-gray-600 text-lg">Create custom game cartridge icons with your own images and gradients</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Preview Panel - Now using the component */}
            <PreviewPanel
              systemIcon={customIcon}
              gradientColors={[gradientStart, gradientEnd]}
              gameImage={gameImage}
              iconSize={iconSize}
              isImageIcon={isImageIcon}
              artworkZoom={artworkZoom}
              onIconSizeChange={setIconSize}
              onArtworkZoomChange={setArtworkZoom}
            />

            {/* Controls Panel */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200 space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Customize</h2>
              <PresetSelector 
                presets={presets} 
                selectedPresetKey={selectedPresetKey} 
                onPresetChange={handlePresetChange} 
                loading={presetsLoading} 
              />
              <IconInput 
                value={customIcon} 
                onChange={handleIconChange} 
                isImageIcon={isImageIcon} 
                onImageIconUpload={handleImageIconUpload} 
              />
              <GradientControls 
                gradientStart={gradientStart} 
                gradientEnd={gradientEnd} 
                onGradientStartChange={setGradientStart} 
                onGradientEndChange={setGradientEnd} 
              />
              <ImageUpload 
                gameImage={gameImage} 
                onImageUpload={setGameImage} 
                onImageRemove={() => setGameImage(null)} 
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IconMaker;