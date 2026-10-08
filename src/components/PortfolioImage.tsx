import React, { useState, useEffect } from 'react';
import { Camera, ZoomIn, Maximize2, Minimize2 } from 'lucide-react';
import { getPhoto, getPhotoUrlCandidates } from '../utils/photoStorage';

interface PortfolioImageProps {
  fileName: string;
  alt: string;
  className?: string;
  aspectRatioClass?: string;
  title?: string;
  category?: string;
  onClick?: () => void;
  showZoomIcon?: boolean;
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
  category,
  onClick,
  showZoomIcon = true,
  priority = false,
  defaultFit = 'contain',
  showFitControls = true,
}) => {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fitMode, setFitMode] = useState<'contain' | 'cover'>(defaultFit);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
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

  // Toggle fitting the image into the frame
  const handleToggleFit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFitMode((prev) => (prev === 'contain' ? 'cover' : 'contain'));
    if (isMinimized) setIsMinimized(false);
  };

  // Toggle minimizing the image
  const handleToggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized((prev) => !prev);
  };

  return (
    <div
      onClick={onClick}
      className={`relative select-none overflow-hidden group ${aspectRatioClass} ${className}`}
      role="region"
      aria-label={title || accessibleAltText}
    >
      <div className="w-full h-full flex items-center justify-center overflow-hidden bg-stone-100/90 dark:bg-stone-900/90">
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
            fitMode === 'contain' ? 'object-contain p-1.5' : 'object-cover'
          } ${isMinimized ? 'scale-[0.82] shadow-inner' : 'scale-100'} ${
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

      {/* Visitor Controls: Fit into Frame or Minimize ("that's it") */}
      {showFitControls && isLoaded && (
        <div
          className="absolute top-2.5 right-2.5 flex items-center gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Fit into Frame Button */}
          <button
            type="button"
            onClick={handleToggleFit}
            title={fitMode === 'contain' ? 'Image fitted into frame (Click to fill)' : 'Fit image into frame'}
            aria-label={fitMode === 'contain' ? 'Image fitted into frame' : 'Fit image into frame'}
            className={`px-2 py-1 rounded-md text-[10px] font-semibold flex items-center gap-1 backdrop-blur-md transition-all shadow-xs cursor-pointer ${
              fitMode === 'contain'
                ? 'bg-stone-900/90 text-white dark:bg-white/90 dark:text-stone-950 border border-stone-700/50'
                : 'bg-white/85 text-stone-800 dark:bg-stone-900/85 dark:text-stone-200 hover:bg-white dark:hover:bg-stone-900 border border-stone-200 dark:border-stone-700'
            }`}
          >
            <Maximize2 className="w-3 h-3" />
            <span className="hidden xs:inline">{fitMode === 'contain' ? 'Fitted' : 'Fit to Frame'}</span>
          </button>

          {/* Minimize Button */}
          <button
            type="button"
            onClick={handleToggleMinimize}
            title={isMinimized ? 'Restore image scale' : 'Minimize image in frame'}
            aria-label={isMinimized ? 'Restore image scale' : 'Minimize image in frame'}
            className={`px-2 py-1 rounded-md text-[10px] font-semibold flex items-center gap-1 backdrop-blur-md transition-all shadow-xs cursor-pointer ${
              isMinimized
                ? 'bg-amber-600 text-white dark:bg-amber-500 dark:text-stone-950 border border-amber-600'
                : 'bg-white/85 text-stone-800 dark:bg-stone-900/85 dark:text-stone-200 hover:bg-white dark:hover:bg-stone-900 border border-stone-200 dark:border-stone-700'
            }`}
          >
            <Minimize2 className="w-3 h-3" />
            <span className="hidden xs:inline">{isMinimized ? 'Minimized' : 'Minimize'}</span>
          </button>
        </div>
      )}

      {/* Minimized Status Badge */}
      {isMinimized && (
        <div className="absolute bottom-2.5 left-2.5 pointer-events-none z-10">
          <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-500/90 text-stone-950 shadow-xs uppercase">
            Minimized View
          </span>
        </div>
      )}

      {/* Hover zoom expansion indicator */}
      {showZoomIcon && isLoaded && !isMinimized && (
        <div
          className="absolute inset-0 bg-stone-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <span className="p-2 rounded-full bg-white/95 dark:bg-stone-900/95 text-stone-900 dark:text-stone-100 shadow-md backdrop-blur-xs">
            <ZoomIn className="w-4 h-4" />
          </span>
        </div>
      )}
    </div>
  );
};
