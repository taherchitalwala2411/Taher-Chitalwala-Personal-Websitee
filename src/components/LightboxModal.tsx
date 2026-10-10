import React, { useEffect, useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Scan,
  Square,
  Camera,
  RotateCcw,
} from 'lucide-react';
import { galleryPhotos } from '../data/portfolioData';
import { getPhoto, getPhotoUrlCandidates } from '../utils/photoStorage';

interface LightboxModalProps {
  fileName: string;
  title: string;
  category?: string;
  source?: string;
  onClose: () => void;
  onSelectPhoto: (fileName: string, title: string, category?: string, source?: string) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  fileName,
  title,
  category,
  source,
  onClose,
  onSelectPhoto,
}) => {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isContain, setIsContain] = useState<boolean>(true); // default to Small Screen (complete image)

  // Identify if opened from Top Showcase
  const isTopShowcase = source === 'showcase' || category === 'Top Showcase';

  const candidates = getPhotoUrlCandidates(fileName);

  // Find metadata in galleryPhotos if available
  const currentPhotoMeta = galleryPhotos.find((p) => p.fileName === fileName);
  const currentIndex = galleryPhotos.findIndex((p) => p.fileName === fileName);

  useEffect(() => {
    let active = true;
    setDataUrl(null);
    setCandidateIndex(0);
    setIsLoaded(false);
    setHasError(false);

    // Retrieve any locally cached or archive data URL if available
    getPhoto(fileName).then((stored) => {
      if (active && stored) {
        setDataUrl(stored);
      }
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && currentIndex !== -1 && currentIndex < galleryPhotos.length - 1) {
        const next = galleryPhotos[currentIndex + 1];
        onSelectPhoto(next.fileName, next.title, next.category, source);
      }
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        const prev = galleryPhotos[currentIndex - 1];
        onSelectPhoto(prev.fileName, prev.title, prev.category, source);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      active = false;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [fileName, currentIndex, onClose, onSelectPhoto, source]);

  const handleImageError = () => {
    if (!dataUrl && candidateIndex < candidates.length - 1) {
      setCandidateIndex((prev) => prev + 1);
    } else if (!dataUrl) {
      // Pull guaranteed visual archive asset
      getPhoto(fileName).then((stored) => {
        if (stored) {
          setDataUrl(stored);
        } else {
          setHasError(true);
        }
      });
    } else {
      setHasError(true);
    }
  };

  const handleImageLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const currentSrc = dataUrl || candidates[candidateIndex];

  const accessibleAltText =
    currentPhotoMeta?.altText ||
    title ||
    `Photograph of Taher Chitalwala: ${fileName} for blind users`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Full photograph modal'}
    >
      <div
        className={`relative w-full flex flex-col bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-stone-800 transition-all duration-300 scale-100 ${
          !isTopShowcase && !isContain
            ? 'max-w-[96vw] max-h-[96vh]'
            : 'max-w-5xl max-h-[92vh]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="p-3.5 sm:p-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between gap-3 text-xs text-stone-300">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300 font-semibold shrink-0">
              {category || currentPhotoMeta?.category || (isTopShowcase ? 'Top Showcase' : 'Visual Archive')}
            </span>
            <span className="font-mono text-[11px] text-stone-400 truncate hidden sm:inline">
              {fileName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Show Small Screen / Full Screen options ONLY for Achievements, Gallery, etc., NOT Top Showcase */}
            {!isTopShowcase && (
              <div className="inline-flex items-center p-0.5 rounded-xl bg-stone-900 border border-stone-800 shadow-xs">
                {/* Option 1: Small Screen where huge image appears completely */}
                <button
                  type="button"
                  onClick={() => setIsContain(true)}
                  title="Small Screen: Image is fully visible, frame is a bit empty"
                  aria-label="Small Screen (image fully visible, frame a bit empty)"
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isContain
                      ? 'bg-white text-stone-950 shadow-xs font-bold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Square className="w-3.5 h-3.5" />
                  <span>Small Screen</span>
                </button>

                {/* Option 2: Full Screen where huge image fits whole frame */}
                <button
                  type="button"
                  onClick={() => setIsContain(false)}
                  title="Full Screen: Image fits whole frame, cropped if too large"
                  aria-label="Full Screen (fits whole frame, cropped if too large)"
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    !isContain
                      ? 'bg-white text-stone-950 shadow-xs font-bold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Scan className="w-3.5 h-3.5" />
                  <span>Full Screen</span>
                </button>
              </div>
            )}

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer ml-1"
              aria-label="Close and return to page"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Media Frame showing the Photo */}
        <div
          className={`relative flex-1 bg-stone-950 flex items-center justify-center overflow-hidden transition-all duration-300 ${
            !isTopShowcase && !isContain
              ? 'h-[74vh] sm:h-[78vh] p-0'
              : 'min-h-[320px] max-h-[66vh] p-3 sm:p-4'
          }`}
        >
          {/* Loading Indicator while the photo is loading */}
          {!isLoaded && !hasError && (
            <div
              className="absolute inset-0 bg-stone-900/80 backdrop-blur-xs flex flex-col items-center justify-center gap-3 z-10 animate-pulse pointer-events-none"
              aria-label="Loading photograph"
            >
              <div className="w-12 h-12 rounded-2xl bg-stone-800/90 border border-stone-700/60 flex items-center justify-center shadow-lg">
                <Camera className="w-6 h-6 text-stone-300 animate-bounce" />
              </div>
              <span className="text-xs font-mono text-stone-400">Loading photograph...</span>
            </div>
          )}

          {/* Error Fallback with Retry */}
          {hasError && (
            <div
              className="absolute inset-0 bg-stone-900 flex flex-col items-center justify-center gap-3 p-6 text-center z-10"
              role="alert"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-950/60 border border-rose-800/60 flex items-center justify-center text-rose-400 shadow-lg">
                <Camera className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-stone-200">
                Unable to load high-resolution photograph
              </p>
              <p className="text-xs text-stone-400 font-mono">
                {fileName}
              </p>
              <button
                type="button"
                onClick={() => {
                  setHasError(false);
                  setIsLoaded(false);
                  setCandidateIndex(0);
                  getPhoto(fileName).then((stored) => {
                    if (stored) setDataUrl(stored);
                  });
                }}
                className="mt-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white text-xs font-medium border border-stone-700 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry Load</span>
              </button>
            </div>
          )}

          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <img
              key={`${fileName}-${currentSrc}`}
              src={currentSrc}
              alt={accessibleAltText}
              aria-label={accessibleAltText}
              role="img"
              loading="eager"
              referrerPolicy="no-referrer"
              onError={handleImageError}
              onLoad={handleImageLoad}
              className={`transition-all duration-300 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              } ${
                isTopShowcase || isContain
                  ? 'max-h-[60vh] max-w-full object-contain mx-auto rounded-lg shadow-2xl'
                  : 'w-full h-full object-cover'
              }`}
            />
          </div>
        </div>

        {/* Caption Bar with Alt Description Display for Blind / Accessibility Users */}
        <div className="p-4 sm:p-5 bg-stone-950 border-t border-stone-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {title}
              </h3>
              {currentPhotoMeta?.description && (
                <p className="text-xs sm:text-sm text-stone-400 mt-1 leading-relaxed">
                  {currentPhotoMeta.description}
                </p>
              )}
            </div>

            {/* Screen Mode Indicator for Gallery and Achievements */}
            {!isTopShowcase && (
              <div className="shrink-0 flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-1 rounded bg-stone-900 border border-stone-800 text-stone-400">
                  {isContain ? 'Small Screen (Complete Image)' : 'Full Screen (Full Frame)'}
                </span>
              </div>
            )}
          </div>

          {currentPhotoMeta?.altText && (
            <p className="text-[11px] text-stone-400 mt-2 font-sans italic border-l-2 border-stone-700 pl-2">
              Alt text description for blind users: {currentPhotoMeta.altText}
            </p>
          )}
        </div>

        {/* Previous / Next Arrows in Gallery sequence */}
        {currentIndex > 0 && (
          <button
            type="button"
            onClick={() => {
              const prev = galleryPhotos[currentIndex - 1];
              onSelectPhoto(prev.fileName, prev.title, prev.category, source);
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-stone-900/85 hover:bg-stone-900 text-white transition-colors cursor-pointer shadow-lg border border-stone-700/60"
            aria-label="Previous photograph"
            title="Previous photograph"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {currentIndex !== -1 && currentIndex < galleryPhotos.length - 1 && (
          <button
            type="button"
            onClick={() => {
              const next = galleryPhotos[currentIndex + 1];
              onSelectPhoto(next.fileName, next.title, next.category, source);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-stone-900/85 hover:bg-stone-900 text-white transition-colors cursor-pointer shadow-lg border border-stone-700/60"
            aria-label="Next photograph"
            title="Next photograph"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};
