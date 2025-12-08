import React, { useState, useEffect } from 'react';
import DotGridBackground from '../components/DotGridBackground';
import PreviewPanel from '../components/PreviewPanel';
import ControlsPanel from '../components/ControlsPanel';
import { SystemPreset } from '../types';
import { loadSystemPresets } from '../services/presetService';
import { useCartridgeRenderer } from '../hooks/use-cartridge-renderer';

const IconMaker: React.FC = () => {
  const [presets, setPresets] = useState<SystemPreset[]>([]);
  const [presetsLoading, setPresetsLoading] = useState(true);
  const [selectedPresetKey, setSelectedPresetKey] = useState('custom');
  const [customIcon, setCustomIcon] = useState('🎮');
  const [isImageIcon, setIsImageIcon] = useState(false);
  const [colors, setColors] = useState<string[]>(['#9333ea', '#06b6d4']);
  const [gameImage, setGameImage] = useState<string | null>(null);
  const [iconSize, setIconSize] = useState(300);
  const [artworkZoom, setArtworkZoom] = useState(1.0);

  // Hook handles rendering + download
  const { imageUrl, downloadImage } = useCartridgeRenderer({
    systemIcon: customIcon,
    gradientColors: colors,
    gameImage,
    isImageIcon,
    size: 1024,
    artworkZoom
  });

  useEffect(() => {
    loadSystemPresets().then(loaded => {
      setPresets(loaded);
      setPresetsLoading(false);
      if (loaded.find(p => p.key === 'custom')) setSelectedPresetKey('custom');
    });
  }, []);

  const handlePresetChange = (preset: SystemPreset) => {
    setSelectedPresetKey(preset.key);
    setColors(preset.gradient?.length ? [...preset.gradient] : ['#9333ea', '#06b6d4']);
    if (preset.iconPath) { setCustomIcon(preset.iconPath); setIsImageIcon(true); }
    else { setCustomIcon('⭐'); setIsImageIcon(false); }
    if (preset.artworkPath) { setGameImage(preset.artworkPath); setArtworkZoom(1.0); }
    else setGameImage(null);
  };

  const handleReorderColors = (fromIndex: number, toIndex: number) => {
    const newColors = [...colors];
    const [moved] = newColors.splice(fromIndex, 1);
    newColors.splice(toIndex, 0, moved);
    setColors(newColors);
    setSelectedPresetKey('custom');
  };

  return (
    <>
      <DotGridBackground />
      <div className="min-h-screen p-4 sm:p-6 lg:p-8 relative">
        <div className="max-w-7xl mx-auto h-full">
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 h-full items-start lg:h-[calc(100vh-4rem)]">

            <div className="flex flex-col gap-4 sm:gap-6 lg:h-full">
              <PreviewPanel
                systemIcon={customIcon}
                gradientColors={colors}
                gameImage={gameImage}
                iconSize={iconSize}
                isImageIcon={isImageIcon}
                artworkZoom={artworkZoom}
                onIconSizeChange={setIconSize}
                onArtworkZoomChange={setArtworkZoom}
              />
            </div>

            <div className="lg:h-full lg:overflow-y-auto rounded-[20px]">
              <ControlsPanel
                presets={presets}
                selectedPresetKey={selectedPresetKey}
                customIcon={customIcon}
                colors={colors}
                gameImage={gameImage}
                isImageIcon={isImageIcon}
                presetsLoading={presetsLoading}
                onPresetChange={handlePresetChange}
                onIconChange={setCustomIcon}
                onImageIconUpload={(img) => { setCustomIcon(img); setIsImageIcon(true); }}
                onClearImageIcon={() => { setCustomIcon('🎮'); setIsImageIcon(false); }}
                onColorChange={(i, val) => { const newColors = [...colors]; newColors[i] = val; setColors(newColors); setSelectedPresetKey('custom'); }}
                onAddColor={() => { setColors([...colors, '#ffffff']); setSelectedPresetKey('custom'); }}
                onRemoveColor={(i) => { setColors(colors.filter((_, idx) => idx !== i)); setSelectedPresetKey('custom'); }}
                onReorderColors={handleReorderColors}
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
