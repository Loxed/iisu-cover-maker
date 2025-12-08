import { useEffect, useState, useRef } from 'react';

interface UseCartridgeRendererProps {
  systemIcon: string | null;
  gradientColors: string[];
  gameImage: string | null;
  isImageIcon: boolean;
  size: number;
  artworkZoom: number;
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
  const [isRendering, setIsRendering] = useState(false);
  const renderTimeoutRef = useRef<number | null>(null);

  const renderToCanvas = async () => {
    setIsRendering(true);
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsRendering(false);
      return;
    }

    const borderThickness = 25;
    const innerSize = size - borderThickness * 2;
    const outerRadius = 80;
    const innerRadius = 55;
    const systemBadgeSize = 180;
    const systemBadgeRadius = 80;
    const fullGradientSize = 1024; // fixed gradient space

    const roundRect = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number,
      r: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.arcTo(x + w, y, x + w, y + r, r);
      ctx.lineTo(x + w, y + h - r);
      ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
      ctx.lineTo(x + r, y + h);
      ctx.arcTo(x, y + h, x, y + h - r, r);
      ctx.lineTo(x, y + r);
      ctx.arcTo(x, y, x + r, y, r);
      ctx.closePath();
    };

    // --- Create gradient (supports 1+ colors safely) ---
    const createGradient = (colors: string[], x0: number, y0: number, x1: number, y1: number) => {
      const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
      if (colors.length === 1) {
        gradient.addColorStop(0, colors[0]);
        gradient.addColorStop(1, colors[0]);
      } else {
        colors.forEach((color, i) => {
          gradient.addColorStop(i / (colors.length - 1), color);
        });
      }
      return gradient;
    };

    // --- Border gradient ---
    const borderGradient = createGradient(gradientColors, 0, 0, fullGradientSize, fullGradientSize);
    ctx.fillStyle = borderGradient;
    roundRect(ctx, 0, 0, size, size, outerRadius);
    ctx.fill();

    // --- Inner white rectangle ---
    ctx.fillStyle = '#ffffff';
    roundRect(ctx, borderThickness, borderThickness, innerSize, innerSize, innerRadius);
    ctx.fill();

    // --- Draw game artwork ---
    if (gameImage) {
      await new Promise<void>((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = gameImage;
        img.onload = () => {
          const containerWidth = innerSize;
          const containerHeight = innerSize;
          const imgAspect = img.width / img.height;
          const containerAspect = containerWidth / containerHeight;
          let drawWidth, drawHeight;

          if (imgAspect > containerAspect) {
            drawHeight = containerHeight;
            drawWidth = containerHeight * imgAspect;
          } else {
            drawWidth = containerWidth;
            drawHeight = containerWidth / imgAspect;
          }

          drawWidth *= artworkZoom;
          drawHeight *= artworkZoom;

          const artworkX = borderThickness + (containerWidth - drawWidth) / 2;
          const artworkY = borderThickness + (containerHeight - drawHeight) / 2;

          ctx.save();
          roundRect(ctx, borderThickness, borderThickness, innerSize, innerSize, innerRadius);
          ctx.clip();
          ctx.drawImage(img, artworkX, artworkY, drawWidth, drawHeight);
          ctx.restore();
          resolve();
        };
        img.onerror = () => resolve();
      });
    }

    // --- Draw system badge ---
    if (systemIcon) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(systemBadgeRadius, 0);
      ctx.lineTo(systemBadgeSize, 0);
      ctx.lineTo(systemBadgeSize, systemBadgeSize - systemBadgeRadius);
      ctx.arcTo(systemBadgeSize, systemBadgeSize, systemBadgeSize - systemBadgeRadius, systemBadgeSize, systemBadgeRadius);
      ctx.lineTo(0, systemBadgeSize);
      ctx.lineTo(0, systemBadgeRadius);
      ctx.arcTo(0, 0, systemBadgeRadius, 0, systemBadgeRadius);
      ctx.closePath();
      ctx.clip();

      const badgeGradient = createGradient(gradientColors, 0, 0, fullGradientSize, fullGradientSize);
      ctx.fillStyle = badgeGradient;
      ctx.fillRect(0, 0, systemBadgeSize, systemBadgeSize);
      ctx.restore();

      // Draw system icon (image or emoji)
      await new Promise<void>((resolve) => {
        if (isImageIcon) {
          const iconImg = new Image();
          iconImg.crossOrigin = 'anonymous';
          iconImg.src = systemIcon;
          iconImg.onload = () => {
            const maxIconSize = systemBadgeSize * 0.5;
            const centerX = systemBadgeSize / 2;
            const centerY = systemBadgeSize / 2;
            const imgAspect = iconImg.width / iconImg.height;
            let drawWidth = maxIconSize;
            let drawHeight = maxIconSize;

            if (imgAspect > 1) drawHeight = maxIconSize / imgAspect;
            else drawWidth = maxIconSize * imgAspect;

            ctx.drawImage(iconImg, centerX - drawWidth / 2, centerY - drawHeight / 2, drawWidth, drawHeight);
            resolve();
          };
          iconImg.onerror = () => resolve();
        } else {
          ctx.fillStyle = 'white';
          ctx.font = `${systemBadgeSize * 0.45}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(systemIcon, systemBadgeSize / 2, systemBadgeSize / 2);
          resolve();
        }
      });
    }

    setImageUrl(canvas.toDataURL('image/png'));
    setIsRendering(false);
  };

  useEffect(() => {
    if (renderTimeoutRef.current) clearTimeout(renderTimeoutRef.current);
    setIsRendering(true);
    renderTimeoutRef.current = window.setTimeout(() => renderToCanvas(), 100);

    return () => {
      if (renderTimeoutRef.current) clearTimeout(renderTimeoutRef.current);
    };
  }, [systemIcon, gradientColors, gameImage, isImageIcon, artworkZoom]);

  const downloadImage = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'game-cartridge-icon.png';
    link.click();
  };

  return { imageUrl, downloadImage, isRendering };
};
