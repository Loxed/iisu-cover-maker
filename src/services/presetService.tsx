import { SystemGradients, SystemPreset } from '../types/index';
import { SYSTEM_NAMES } from '../data/systemNames';

export const loadSystemPresets = async (): Promise<SystemPreset[]> => {
  try {
    const response = await fetch('/systems/colors/system_gradients.json');
    const gradients: SystemGradients = await response.json();

    const presets: SystemPreset[] = Object.keys(gradients).map(key => ({
        name: SYSTEM_NAMES[key] || key.toUpperCase(),
        key,
        gradient: gradients[key],
        iconPath: `/systems/icons/${key}.png`,
        artworkPath: `/systems/artwork/${key}.png`  // Always include the path
    }));

    presets.sort((a, b) => a.name.localeCompare(b.name));

    presets.push({
      name: 'Custom',
      key: 'custom',
      gradient: ['#9333ea', '#06b6d4'],
      iconPath: '',
      artworkPath: ''
    });

    return presets;
  } catch (error) {
    console.error('Failed to load system presets:', error);
    return [{
      name: 'Custom',
      key: 'custom',
      gradient: ['#9333ea', '#06b6d4'],
      iconPath: '',
      artworkPath: ''
    }];
  }
};