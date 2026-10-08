import React, { useState, useEffect } from 'react';
import { Camera, ZoomIn } from 'lucide-react';
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
  showFitToggle?: boolean;
  allowScaleControl?: boolean;
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
  defaultFit,
}) => {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Default fit based on photo nature (flag ceremony, trophy shelf, award on stage)
  const isNaturallyContain = [
    'Head boy image 2.jpeg',
    'Trophies.jpeg',
    'WhatsApp Image 2026-10-07 at 8.49.04 AM.jpeg',
    'Headboy image.jpeg',
    'NIE TOI 2.jpeg',
    'IIMUN event 2.jpeg',
    'with Nadir Godrej.jpeg',
    'IIMUN event 6.jpeg',
  ].includes(fileName);

  const fitMode = defaultFit || (isNaturallyContain ? 'contain' : 'cover');

  const candidates = getPhotoUrlCandidates(fileName);

  // Check IndexedDB first
  useEffect(() => {
    let mounted = true;
    getPhoto(fileName).then((stored) => {
      if (mounted && stored) {
        setDataUrl(stored);
        setHasError(false);
      }
    });

    const handleUpdate = (e: Event) => {
      const custom = e as CustomEvent<{ fileName: string }>;
      if (custom.detail?.fileName === fileName) {
        getPhoto(fileName).then((stored) => {
          if (mounted && stored) {
            setDataUrl(stored);
            setHasError(false);
            setIsLoaded(true);
          }
        });
      }
    };

    window.addEventListener('portfolio-photo-updated', handleUpdate);
    return () => {
      mounted = false;
      window.removeEventListener('portfolio-photo-updated', handleUpdate);
    };
  }, [fileName]);

  const currentSrc = dataUrl || candidates[candidateIndex];

  const handleImageError = () => {
    if (!dataUrl && candidateIndex < candidates.length - 1) {
      setCandidateIndex((prev) => prev + 1);
    } else {
      setHasError(true);
    }
  };

  const handleImageLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const accessibleAltText =
    alt || title || `Photograph of Taher Chitalwala - ${fileName}`;

  return (
    <div
      onClick={onClick}
      className={`relative select-none overflow-hidden group ${aspectRatioClass} ${className}`}
      role="region"
      aria-label={title || accessibleAltText}
    >
      {!hasError ? (
        <>
          <div className="w-full h-full flex items-center justify-center overflow-hidden bg-stone-100/80 dark:bg-stone-900/80">
            <img
              src={currentSrc}
              alt={accessibleAltText}
              aria-label={accessibleAltText}
              role="img"
              loading={priority ? 'eager' : 'lazy'}
              referrerPolicy="no-referrer"
              onError={handleImageError}
              onLoad={handleImageLoad}
              className={`w-full h-full transition-opacity duration-300 ${
                fitMode === 'contain' ? 'object-contain p-1' : 'object-cover'
              } ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
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

          {/* Hover zoom overlay indicator for interactive expansion */}
          {showZoomIcon && isLoaded && (
            <div
              className="absolute inset-0 bg-stone-950/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none"
              aria-hidden="true"
            >
              <span className="p-2.5 rounded-full bg-white/95 dark:bg-stone-900/95 text-stone-900 dark:text-stone-100 shadow-md backdrop-blur-xs">
                <ZoomIn className="w-4 h-4" />
              </span>
            </div>
          )}
        </>
      ) : (
        /* Graceful Accessible Fallback Container */
        <div
          className="absolute inset-0 p-5 bg-gradient-to-br from-[#F5F2EA] to-[#EBE6DC] dark:from-[#1E1C1A] dark:to-[#171514] border border-stone-200/70 dark:border-stone-800 flex flex-col justify-between select-none"
          role="img"
          aria-label={accessibleAltText}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium tracking-wider text-stone-500 dark:text-stone-400 uppercase">
              {category || 'Personal Photograph'}
            </span>
            <span className="p-1.5 rounded-md bg-stone-200/60 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
              <Camera className="w-4 h-4" />
            </span>
          </div>

          <div className="my-auto py-2">
            <p className="text-sm font-semibold text-stone-800 dark:text-stone-200 line-clamp-2">
              {title || accessibleAltText}
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-1 font-mono">
              {fileName}
            </p>
          </div>

          <div className="pt-2 border-t border-stone-200/60 dark:border-stone-800 flex items-center justify-between">
            <span className="text-[10px] text-stone-500 dark:text-stone-400">
              Taher Chitalwala · Visual Archive
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
