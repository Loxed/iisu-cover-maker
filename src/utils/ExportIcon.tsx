import html2canvas from 'html2canvas';

export const exportIconToCanvas = async (
  customIcon: string | null,
  gradientStart: string,
  gradientEnd: string,
  gameImage: string | null,
  isImageIcon: boolean
): Promise<void> => {
  console.log('Starting export...');

  // Find the cartridge builder element that's currently rendered
  const builderElement = document.getElementById('cartridge-builder');
  
  if (!builderElement) {
    console.error('❌ Could not find cartridge builder element');
    alert('Export failed: Could not find preview element');
    return;
  }

  try {
    console.log('✅ Found builder element, capturing...');

    // Capture the current preview at its current size
    const canvas = await html2canvas(builderElement, {
      backgroundColor: null,
      logging: false,
      useCORS: true,
      allowTaint: false,
      scale: 3, // Higher scale for better quality
      imageTimeout: 0,
      onclone: (clonedDoc) => {
        // Ensure images maintain aspect ratio in the clone
        const imgs = clonedDoc.querySelectorAll('img');
        imgs.forEach(img => {
          img.style.objectFit = 'contain';
        });
      }
    });

    console.log('✅ Canvas captured, resizing to 1024x1024...');

    // Create a new canvas at 1024x1024
    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = 1024;
    finalCanvas.height = 1024;
    const finalCtx = finalCanvas.getContext('2d');

    if (!finalCtx) {
      console.error('❌ Could not get canvas context');
      return;
    }

    // Draw the captured image scaled to 1024x1024
    finalCtx.imageSmoothingEnabled = true;
    finalCtx.imageSmoothingQuality = 'high';
    finalCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 1024, 1024);

    console.log('✅ Resized to 1024x1024, creating download...');

    // Convert to blob and download
    finalCanvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'game-cartridge-icon.png';
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        console.log('✅ Download complete!');
      } else {
        console.error('❌ Failed to create blob');
      }
    }, 'image/png');

  } catch (error) {
    console.error('❌ Export failed:', error);
    alert('Export failed. Please try again.');
  }
};