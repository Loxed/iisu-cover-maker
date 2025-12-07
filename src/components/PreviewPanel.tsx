import React from 'react';
import { Download, Loader2 } from 'lucide-react';
import { useCartridgeRenderer } from '../hooks/use-cartridge-renderer';

interface PreviewPanelProps {
  systemIcon: string | null;
  gradientColors: [string, string];
  gameImage: string | null;
  iconSize: number;
  isImageIcon: boolean;
  artworkZoom: number;
  onIconSizeChange: (size: number) => void;
  onArtworkZoomChange: (zoom: number) => void;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({
  systemIcon,
  gradientColors,
  gameImage,
  iconSize,
  isImageIcon,
  artworkZoom,
  onIconSizeChange,
  onArtworkZoomChange
}) => {
  const { imageUrl, downloadImage } = useCartridgeRenderer({
    systemIcon,
    gradientColors,
    gameImage,
    isImageIcon,
    size: 1024, // Always render at full size
    artworkZoom
  });

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Preview</h2>
      
      {/* Preview Display Area */}
      <div className="flex items-center justify-center mb-6 p-4 bg-gray-50 rounded-xl">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt="Game Cartridge Icon Preview"
            style={{ 
              width: iconSize, 
              height: iconSize,
              imageRendering: 'high-quality'
            }}
            className="rounded-lg"
          />
        ) : (
          <div 
            style={{ width: iconSize, height: iconSize }}
            className="flex items-center justify-center bg-gray-200 rounded-lg"
          >
            <Loader2 className="animate-spin text-gray-400" size={48} />
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preview Size: {iconSize}px
          </label>
          <input
            type="range"
            min="200"
            max="500"
            value={iconSize}
            onChange={(e) => onIconSizeChange(Number(e.target.value))}
            className="w-full accent-purple-600"
          />
        </div>

        {gameImage && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Artwork Zoom: {Math.round(artworkZoom * 100)}%
            </label>
            <input
              type="range"
              min="50"
              max="200"
              step="5"
              value={artworkZoom * 100}
              onChange={(e) => onArtworkZoomChange(Number(e.target.value) / 100)}
              className="w-full accent-purple-600"
            />
          </div>
        )}
        
        <button
          onClick={downloadImage}
          disabled={!imageUrl}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download size={20} />
          Download Icon (1024x1024)
        </button>
      </div>
    </div>
  );
};

export default PreviewPanel;