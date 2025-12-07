import { useEffect, useState, useRef } from 'react';

interface UseCartridgeRendererProps {
  systemIcon: string | null;
  gradientColors: [string, string];
  gameImage: string | null;
  isImageIcon: boolean;
  size: number;
  artworkZoom: number; // 1.0 = 100%, 2.0 = 200%, etc.
}

export const useCartridgeRenderer = ({
  systemIcon,
  gradientColors,
  gameImage,
  isImageIcon,
  size,
  artworkZoom
}: UseCartridgeRendererProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const renderToCanvas = async () => {
      const canvas = document.createElement('canvas');
      canvasRef.current = canvas;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const baseReference = 1024;
      canvas.width = baseReference;
      canvas.height = baseReference;

      const outerRadius = 80;
      const borderThickness = 25;
      const innerRadius = 55;
      const systemBadgeSize = 180;
      const systemBadgeRadius = 80;

      // Draw outer border with gradient
      const gradient = ctx.createLinearGradient(0, 0, baseReference, baseReference);
      gradient.addColorStop(0, gradientColors[0]);
      gradient.addColorStop(1, gradientColors[1]);
      
      ctx.fillStyle = gradient;
      roundRect(ctx, 0, 0, baseReference, baseReference, outerRadius);
      ctx.fill();

      // Draw inner dark background
      ctx.fillStyle = '#1f2937';
      roundRect(ctx, borderThickness, borderThickness, 
                baseReference - borderThickness * 2, baseReference - borderThickness * 2, innerRadius);
      ctx.fill();

      // Draw game image or placeholder
      const drawGameArt = () => new Promise<void>((resolve) => {
        if (gameImage) {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            ctx.save();
            roundRect(ctx, borderThickness, borderThickness, 
                      baseReference - borderThickness * 2, baseReference - borderThickness * 2, innerRadius);
            ctx.clip();
            
            // Calculate zoomed dimensions
            const artworkWidth = (baseReference - borderThickness * 2) * artworkZoom;
            const artworkHeight = (baseReference - borderThickness * 2) * artworkZoom;
            
            // Center the zoomed image
            const artworkX = borderThickness + ((baseReference - borderThickness * 2) - artworkWidth) / 2;
            const artworkY = borderThickness + ((baseReference - borderThickness * 2) - artworkHeight) / 2;
            
            ctx.drawImage(img, artworkX, artworkY, artworkWidth, artworkHeight);
            ctx.restore();
            resolve();
          };
          img.onerror = () => {
            drawPlaceholder();
            resolve();
          };
          img.src = gameImage;
        } else {
          drawPlaceholder();
          resolve();
        }
      });

      const drawPlaceholder = () => {
        const placeholderGradient = ctx.createLinearGradient(
          borderThickness, borderThickness, 
          baseReference - borderThickness, baseReference - borderThickness
        );
        placeholderGradient.addColorStop(0, '#374151');
        placeholderGradient.addColorStop(1, '#111827');
        
        ctx.save();
        roundRect(ctx, borderThickness, borderThickness, 
                  baseReference - borderThickness * 2, baseReference - borderThickness * 2, innerRadius);
        ctx.clip();
        ctx.fillStyle = placeholderGradient;
        ctx.fillRect(borderThickness, borderThickness, 
                     baseReference - borderThickness * 2, baseReference - borderThickness * 2);
        ctx.restore();

        ctx.fillStyle = '#6b7280';
        ctx.font = 'bold 40px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('No Artwork', baseReference / 2, baseReference / 2 + 100);
      };

      await drawGameArt();

      // Draw badge with gradient that extends across full canvas
      ctx.save();
      
      // Clip to badge shape
      ctx.beginPath();
      ctx.moveTo(systemBadgeRadius, 0);
      ctx.lineTo(systemBadgeSize, 0);
      ctx.lineTo(systemBadgeSize, systemBadgeSize - systemBadgeRadius);
      ctx.arcTo(systemBadgeSize, systemBadgeSize, 
                systemBadgeSize - systemBadgeRadius, systemBadgeSize, systemBadgeRadius);
      ctx.lineTo(0, systemBadgeSize);
      ctx.lineTo(0, systemBadgeRadius);
      ctx.arcTo(0, 0, systemBadgeRadius, 0, systemBadgeRadius);
      ctx.closePath();
      ctx.clip();
      
      // Fill with the full canvas gradient (not a separate badge gradient)
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, systemBadgeSize, systemBadgeSize);
      
      ctx.restore();

      // Draw icon
      if (systemIcon) {
        await new Promise<void>((resolve) => {
          if (isImageIcon) {
            const iconImg = new Image();
            iconImg.crossOrigin = 'anonymous';
            iconImg.onload = () => {
              // Icon takes 50% of badge area from center
              const maxIconSize = systemBadgeSize * 0.5;
              const centerX = systemBadgeSize / 2;
              const centerY = systemBadgeSize / 2;
              
              // Calculate dimensions to maintain aspect ratio
              const imgAspect = iconImg.width / iconImg.height;
              let drawWidth = maxIconSize;
              let drawHeight = maxIconSize;

              if (imgAspect > 1) {
                // Wider than tall
                drawHeight = maxIconSize / imgAspect;
              } else {
                // Taller than wide
                drawWidth = maxIconSize * imgAspect;
              }

              const iconX = centerX - drawWidth / 2;
              const iconY = centerY - drawHeight / 2;
              
              // Create temporary canvas for white filter
              const tempCanvas = document.createElement('canvas');
              tempCanvas.width = drawWidth;
              tempCanvas.height = drawHeight;
              const tempCtx = tempCanvas.getContext('2d');
              
              if (tempCtx) {
                // Draw the icon at correct size
                tempCtx.drawImage(iconImg, 0, 0, drawWidth, drawHeight);
                
                // Apply white color overlay
                tempCtx.globalCompositeOperation = 'source-in';
                tempCtx.fillStyle = 'white';
                tempCtx.fillRect(0, 0, drawWidth, drawHeight);
                
                // Draw to main canvas at centered position
                ctx.drawImage(tempCanvas, iconX, iconY);
              }
              resolve();
            };
            iconImg.onerror = () => {
              drawTextIcon();
              resolve();
            };
            iconImg.src = systemIcon;
          } else {
            drawTextIcon();
            resolve();
          }
        });
      }

      const drawTextIcon = () => {
        if (!systemIcon) return;
        ctx.fillStyle = 'white';
        ctx.font = `${systemBadgeSize * 0.45}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(systemIcon, systemBadgeSize / 2, systemBadgeSize / 2);
      };

      // Convert to data URL
      const dataUrl = canvas.toDataURL('image/png');
      setImageUrl(dataUrl);
    };

    const roundRect = (
      ctx: CanvasRenderingContext2D, 
      x: number, y: number, width: number, height: number, radius: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.arcTo(x + width, y, x + width, y + radius, radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
      ctx.lineTo(x + radius, y + height);
      ctx.arcTo(x, y + height, x, y + height - radius, radius);
      ctx.lineTo(x, y + radius);
      ctx.arcTo(x, y, x + radius, y, radius);
      ctx.closePath();
    };

    renderToCanvas();
  }, [systemIcon, gradientColors, gameImage, isImageIcon, artworkZoom]);

  const downloadImage = () => {
    if (!imageUrl) return;
    
    const link = document.createElement('a');
    link.download = 'game-cartridge-icon.png';
    link.href = imageUrl;
    link.click();
  };

  return { imageUrl, downloadImage };
};