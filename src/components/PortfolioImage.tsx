import React, { useState } from 'react';
import { Camera, Square, Scan } from 'lucide-react';
import { getPhotoUrlCandidates } from '../utils/photoStorage';

interface PortfolioImageProps {
  fileName: string;
  alt: string;
  className?: string;
  aspectRatioClass?: string;
  title?: string;
  category?: string;
  onClick?: () => void;
  priority?: boolean;
  defaultFit?: 'cover' | 'contain';
  showFitControls?: boolean;
}

export const PortfolioImage: React.FC<PortfolioImageProps> = ({
  fileName,
  alt,
  className = '',
  aspectRatioClass = 'aspect-[4/3]',
  title,
  category: _category,
  onClick,
  priority = false,
  defaultFit = 'contain',
  showFitControls = true,
}) => {
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fitMode, setFitMode] = useState<'contain' | 'cover'>(defaultFit);
  const candidates = getPhotoUrlCandidates(fileName);
  const currentSrc = candidates[candidateIndex];

  const handleImageError = () => {
    if (candidateIndex < candidates.length - 1) {
      setCandidateIndex((prev) => prev + 1);
    }
  };

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const accessibleAltText =
    alt || title || `Photograph of Taher Chitalwala: ${fileName} for blind users`;

  return (
    <div
      onClick={onClick}
      className={`relative select-none overflow-hidden group ${aspectRatioClass} ${className}`}
      role="region"
      aria-label={title || accessibleAltText}
    >
      <div className="w-full h-full flex items-center justify-center overflow-hidden bg-stone-100/95 dark:bg-stone-900/95">
        <img
          src={currentSrc}
          alt={accessibleAltText}
          aria-label={accessibleAltText}
          role="img"
          loading={priority ? 'eager' : 'lazy'}
          referrerPolicy="no-referrer"
          onError={handleImageError}
          onLoad={handleImageLoad}
          className={`w-full h-full transition-all duration-300 ${
            fitMode === 'contain'
              ? 'object-contain p-2 sm:p-2.5'
              : 'object-cover p-0'
          } ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {!isLoaded && (
        <div
          className="absolute inset-0 bg-stone-200/60 dark:bg-stone-800/60 animate-pulse flex items-center justify-center"
          aria-hidden="true"
        >
          <Camera className="w-6 h-6 text-stone-400 dark:text-stone-600" />
        </div>
      )}

      {/* Frame Controls: Small Frame vs Full Frame */}
      {showFitControls && isLoaded && (
        <div
          className="absolute top-2.5 right-2.5 flex items-center p-0.5 rounded-lg bg-stone-950/80 backdrop-blur-md border border-stone-700/60 shadow-md z-10 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Small Frame button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setFitMode('contain');
            }}
            title="Small Frame: Full image visible, frame slightly empty"
            aria-label="Small Frame (full image visible, frame slightly empty)"
            className={`px-2 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              fitMode === 'contain'
                ? 'bg-white text-stone-950 shadow-xs font-bold'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <Square className="w-2.5 h-2.5" />
            <span className="hidden xs:inline">Small Frame</span>
          </button>

          {/* Full Frame button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setFitMode('cover');
            }}
            title="Full Frame: Image fits whole frame, cropped if too large"
            aria-label="Full Frame (image fits whole frame, cropped if too large)"
            className={`px-2 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              fitMode === 'cover'
                ? 'bg-white text-stone-950 shadow-xs font-bold'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <Scan className="w-2.5 h-2.5" />
            <span className="hidden xs:inline">Full Frame</span>
          </button>
        </div>
      )}

      {/* Mode Indicator Badge when in Small Frame */}
      {fitMode === 'contain' && isLoaded && (
        <div className="absolute bottom-2 left-2 pointer-events-none z-10 opacity-75 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-stone-950/70 text-stone-300 backdrop-blur-xs">
            Small Frame
          </span>
        </div>
      )}
    </div>
  );
};
