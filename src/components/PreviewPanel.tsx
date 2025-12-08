import React from 'react';
import { Download, Loader2 } from 'lucide-react';
import { useCartridgeRenderer } from '../hooks/use-cartridge-renderer';
import './PreviewPanel.css';

interface PreviewPanelProps {
  systemIcon: string | null;
  gradientColors: string[]; 
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
  const { imageUrl, downloadImage, isRendering } = useCartridgeRenderer({
    systemIcon,
    gradientColors,
    gameImage,
    isImageIcon,
    size: 1024,
    artworkZoom
  });

  const gradientStyle = `linear-gradient(135deg, ${gradientColors.join(', ')})`;

  const themeStyles = {
    '--gradient-start': gradientColors[0],
    '--gradient-end': gradientColors[gradientColors.length - 1],
    '--gradient': gradientStyle
  } as React.CSSProperties;

  return (
    <div className="preview-panel" style={themeStyles}>
      <div className="preview-panel-content">
        <h2 className="preview-panel-title">Preview</h2>

        <div className="preview-display-area">
          {imageUrl ? (
            <>
              <img 
                src={imageUrl} 
                alt="Game Cartridge Icon Preview"
                style={{ 
                  width: iconSize, 
                  height: iconSize
                }}
                className={`preview-image ${isRendering ? 'rendering' : ''}`}
              />
              {isRendering && (
                <div className="preview-spinner-overlay">
                  <Loader2 
                    className="preview-spinner" 
                    style={{ color: gradientColors[0] }} 
                    size={32} 
                  />
                </div>
              )}
            </>
          ) : (
            <div 
              style={{ width: iconSize, height: iconSize }}
              className="preview-placeholder"
            >
              <Loader2 
                className="preview-spinner" 
                style={{ color: gradientColors[0] }} 
                size={48} 
              />
            </div>
          )}
        </div>

        <div className="preview-controls">
          <div className="preview-control-group">
            <label className="preview-control-label">
              Preview Size: {iconSize}px
            </label>
            <input
              type="range"
              min="200"
              max="500"
              value={iconSize}
              onChange={(e) => onIconSizeChange(Number(e.target.value))}
              className="preview-slider"
              style={{
                background: `linear-gradient(to right, ${gradientColors.join(', ')})`,
                '--thumb-color-start': gradientColors[0],
                '--thumb-color-end': gradientColors[gradientColors.length - 1]
              } as React.CSSProperties}
            />
          </div>

          {gameImage && (
            <div className="preview-control-group">
              <label className="preview-control-label">
                Artwork Zoom: {Math.round(artworkZoom * 100)}%
              </label>
              <input
                type="range"
                min="50"
                max="200"
                step="5"
                value={artworkZoom * 100}
                onChange={(e) => onArtworkZoomChange(Number(e.target.value) / 100)}
                className="preview-slider"
                style={{
                  background: `linear-gradient(to right, ${gradientColors.join(', ')})`,
                  '--thumb-color-start': gradientColors[0],
                  '--thumb-color-end': gradientColors[gradientColors.length - 1]
                } as React.CSSProperties}
              />
            </div>
          )}
          
          <button
            onClick={downloadImage}
            disabled={!imageUrl}
            className="preview-download-button"
            style={{
              background: !imageUrl ? '#9ca3af' : gradientStyle,
              opacity: !imageUrl ? 0.5 : 1
            }}
          >
            <Download size={20} />
            Download Icon (1024x1024)
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
