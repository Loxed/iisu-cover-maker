import React, { useState, useEffect } from 'react';
import DotGridBackground from '../components/DotGridBackground';
import PreviewPanel from '../components/PreviewPanel';
import ControlsPanel from '../components/ControlsPanel';
import { SystemPreset } from '../types';
import { loadSystemPresets } from '../services/presetService';
import { exportIconToCanvas } from '../utils/ExportIcon';

const IconMaker: React.FC = () => {
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
  const [iconZoom, setIconZoom] = useState<number>(1.0);

  useEffect(() => {
    loadSystemPresets().then(loadedPresets => {
      setPresets(loadedPresets);
      setPresetsLoading(false);
      
      // Find and select the Custom preset by default
      const customPreset = loadedPresets.find(p => p.key === 'custom');
      if (customPreset) {
        setSelectedPresetKey('custom');
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
    console.log('Icon changed to text:', icon);
    setCustomIcon(icon);
    setIsImageIcon(false);
    // Switch to custom preset when manually changing icon
    setSelectedPresetKey('custom');
  };

  const handleImageIconUpload = (imagePath: string) => {
    console.log('Icon changed to image:', imagePath);
    setCustomIcon(imagePath);
    setIsImageIcon(true);
    // Switch to custom preset when uploading icon
    setSelectedPresetKey('custom');
  };

  const handleClearImageIcon = () => {
    console.log('Clearing image icon, switching to emoji');
    setCustomIcon('🎮');
    setIsImageIcon(false);
    setSelectedPresetKey('custom');
  };

  const handleDownload = () => {
    exportIconToCanvas(customIcon, gradientStart, gradientEnd, gameImage, isImageIcon);
  };

  return (
    <>
      <DotGridBackground />
      <div className="min-h-screen p-4 sm:p-6 lg:p-8 relative">
        <div className="max-w-7xl mx-auto h-full">
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 h-full items-start lg:h-[calc(100vh-4rem)]">
            {/* Left Column - Title + Preview Panel */}
            <div className="flex flex-col gap-4 sm:gap-6 lg:h-full">
              {/* Title Header */}
              <div className="relative bg-gradient-to-r from-white/50 to-purple-50/40 backdrop-blur-16 rounded-[20px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.05)] border-2 border-white/30 overflow-hidden flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/10 pointer-events-none z-0"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-blue-100/25 via-transparent to-purple-100/25 pointer-events-none z-0"></div>
                <div className="relative z-10">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-1 tracking-tight">
                    iiSU Game Icon Maker
                  </h1>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Create custom game icons with your own images
                  </p>
                </div>
              </div>

              {/* Preview Panel */}
              <div className="lg:flex-1 lg:overflow-y-auto rounded-[20px]">
                <PreviewPanel
                  systemIcon={customIcon}
                  gradientColors={[gradientStart, gradientEnd]}
                  gameImage={gameImage}
                  iconSize={iconSize}
                  isImageIcon={isImageIcon}
                  artworkZoom={artworkZoom}
                  iconZoom={iconZoom}
                  onIconSizeChange={setIconSize}
                  onArtworkZoomChange={setArtworkZoom}
                  onIconZoomChange={setIconZoom}
                />
              </div>
            </div>

            {/* Controls Panel */}
            <div className="lg:h-full lg:overflow-y-auto rounded-[20px]">
              <ControlsPanel
                presets={presets}
                selectedPresetKey={selectedPresetKey}
                customIcon={customIcon}
                gradientStart={gradientStart}
                gradientEnd={gradientEnd}
                gameImage={gameImage}
                isImageIcon={isImageIcon}
                presetsLoading={presetsLoading}
                onPresetChange={handlePresetChange}
                onIconChange={handleIconChange}
                onImageIconUpload={handleImageIconUpload}
                onClearImageIcon={handleClearImageIcon}
                onGradientStartChange={setGradientStart}
                onGradientEndChange={setGradientEnd}
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