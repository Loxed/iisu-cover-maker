import React, { useState, useEffect } from 'react';

interface GameCartridgeBuilderProps {
  systemIcon: string | null;
  gradientColors: string[];
  gameImage: string | null;
  size: number;
  isImageIcon: boolean;
}

const GameCartridgeBuilder: React.FC<GameCartridgeBuilderProps> = ({
  systemIcon,
  gradientColors,
  gameImage,
  size,
  isImageIcon
}) => {
  const [iconError, setIconError] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => setImageError(false), [gameImage]);

  const baseReference = 1024;
  const outerRadius = 80;
  const borderThickness = 25;
  const innerRadius = 55;
  const systemBadgeSize = 180;
  const systemBadgeRadius = 80;
  const scale = size / baseReference;
  const innerSize = size - borderThickness * scale * 2;

  // Gradient stops for SVG
  const gradientStops = gradientColors.map((color, index) => (
    <stop
      key={index}
      offset={`${(index / (gradientColors.length - 1)) * 100}%`}
      stopColor={color}
    />
  ));

  return (
    <div
      id="cartridge-builder"
      data-export="true"
      className="relative"
      style={{ width: size, height: size }}
    >
      {/* Border with gradient */}
      <svg width={size} height={size} className="absolute inset-0">
        <defs>
          <linearGradient
            id={`borderGradient-${size}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            {gradientStops}
          </linearGradient>
        </defs>
        <rect
          x="0"
          y="0"
          width={size}
          height={size}
          rx={outerRadius * scale}
          fill={`url(#borderGradient-${size})`}
        />
      </svg>

      {/* Inner content */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          top: borderThickness * scale,
          left: borderThickness * scale,
          width: innerSize,
          height: innerSize,
          borderRadius: innerRadius * scale,
          backgroundColor: '#ffffff',
          overflow: 'hidden'
        }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-gray-500">
          <svg
            width={size * 0.25}
            height={size * 0.25}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            <circle cx="9" cy="11" r="1" />
            <circle cx="15" cy="11" r="1" />
            <path d="M9 15h6" />
          </svg>
          <span style={{ fontSize: size * 0.04 }} className="font-medium">
            No Artwork
          </span>
        </div>
      </div>

      {/* System badge */}
      {systemIcon && (
        <div
          className="absolute top-0 left-0 flex items-center justify-center text-white"
          style={{
            width: systemBadgeSize * scale,
            height: systemBadgeSize * scale,
            background: `linear-gradient(135deg, ${gradientColors.join(', ')})`,
            borderTopLeftRadius: systemBadgeRadius * scale,
            borderBottomRightRadius: systemBadgeRadius * scale
          }}
        >
          {isImageIcon && !iconError ? (
            <img
              src={systemIcon}
              alt="System icon"
              style={{
                width: systemBadgeSize * scale * 0.6,
                height: systemBadgeSize * scale * 0.6,
                objectFit: 'contain',
                filter: 'brightness(0) invert(1)'
              }}
              onError={() => setIconError(true)}
            />
          ) : (
            <span style={{ fontSize: systemBadgeSize * scale * 0.45 }}>
              {systemIcon}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default GameCartridgeBuilder;
