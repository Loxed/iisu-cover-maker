import React from 'react';
import { SystemPreset } from '../types';

interface PresetSelectorProps {
  presets: SystemPreset[];
  selectedPresetKey: string;
  onPresetChange: (preset: SystemPreset) => void;
  loading?: boolean;
}

const PresetSelector: React.FC<PresetSelectorProps> = ({ 
  presets,
  selectedPresetKey,
  onPresetChange,
  loading = false
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        System Preset
      </label>
      {loading ? (
        <div className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2.5 text-gray-400 animate-pulse">
          Loading presets...
        </div>
      ) : (
        <select
          value={selectedPresetKey}
          onChange={(e) => {
            const preset = presets.find(p => p.key === e.target.value);
            if (preset) onPresetChange(preset);
          }}
          className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
        >
          {presets.map((preset) => (
            <option key={preset.key} value={preset.key}>
              {preset.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default PresetSelector;