import React from 'react';
import { Palette } from 'lucide-react';

interface GradientControlsProps {
  gradientStart: string;
  gradientEnd: string;
  onGradientStartChange: (color: string) => void;
  onGradientEndChange: (color: string) => void;
}

const GradientControls: React.FC<GradientControlsProps> = ({
  gradientStart,
  gradientEnd,
  onGradientStartChange,
  onGradientEndChange
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Palette size={20} className="text-gray-700" />
        <label className="text-sm font-medium text-gray-700">
          Border Gradient
        </label>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-600 mb-1">Start Color</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={gradientStart}
              onChange={(e) => onGradientStartChange(e.target.value)}
              className="h-10 w-16 rounded cursor-pointer border border-gray-300"
            />
            <input
              type="text"
              value={gradientStart}
              onChange={(e) => onGradientStartChange(e.target.value)}
              className="flex-1 bg-white text-gray-900 border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs text-gray-600 mb-1">End Color</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={gradientEnd}
              onChange={(e) => onGradientEndChange(e.target.value)}
              className="h-10 w-16 rounded cursor-pointer border border-gray-300"
            />
            <input
              type="text"
              value={gradientEnd}
              onChange={(e) => onGradientEndChange(e.target.value)}
              className="flex-1 bg-white text-gray-900 border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      <div 
        className="h-12 rounded-lg shadow-inner"
        style={{
          background: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`
        }}
      />
    </div>
  );
};

export default GradientControls;