export interface SystemPreset {
  name: string;
  key: string;
  gradient: [string, string];
  iconPath: string;
  artworkPath: string;
}

export interface SystemGradients {
  [key: string]: [string, string];
}

export interface GameCartridgeIconProps {
  systemIcon: string | null;
  gradientColors: [string, string];
  gameImage: string | null;
  size?: number;
  isImageIcon?: boolean;
}