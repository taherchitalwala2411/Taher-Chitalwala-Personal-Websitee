import React, { useEffect, useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { galleryPhotos } from '../data/portfolioData';
import { getPhoto, getPhotoUrlCandidates } from '../utils/photoStorage';

interface LightboxModalProps {
  fileName: string;
  title: string;
  category?: string;
  onClose: () => void;
  onSelectPhoto: (fileName: string, title: string, category?: string) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  fileName,
  title,
  category,
  onClose,
  onSelectPhoto,
}) => {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isContain, setIsContain] = useState<boolean>(true);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  const candidates = getPhotoUrlCandidates(fileName);

  // Find index in gallery photos if present
  const currentIndex = galleryPhotos.findIndex((p) => p.fileName === fileName);
  const currentPhotoMeta = currentIndex !== -1 ? galleryPhotos[currentIndex] : null;

  // Load from storage or fallback visual asset
  useEffect(() => {
    let active = true;
    getPhoto(fileName).then((stored) => {
      if (active && stored) {
        setDataUrl(stored);
      }
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && currentIndex !== -1 && currentIndex < galleryPhotos.length - 1) {
        const next = galleryPhotos[currentIndex + 1];
        onSelectPhoto(next.fileName, next.title, next.category);
      }
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        const prev = galleryPhotos[currentIndex - 1];
        onSelectPhoto(prev.fileName, prev.title, prev.category);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      active = false;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [fileName, currentIndex, onClose, onSelectPhoto]);

  const handleImageError = () => {
    if (!dataUrl && candidateIndex < candidates.length - 1) {
      setCandidateIndex((prev) => prev + 1);
    } else {
      // Pull guaranteed visual archive asset
      getPhoto(fileName).then((stored) => {
        if (stored) setDataUrl(stored);
      });
    }
  };

  const currentSrc = dataUrl || candidates[candidateIndex];

  const accessibleAltText =
    currentPhotoMeta?.altText ||
    title ||
    `Photograph of Taher Chitalwala: ${fileName} for blind users`;

  // Fitting the image into the frame
  const handleFitToFrame = () => {
    setIsContain(true);
    setZoomLevel(1);
    setIsMinimized(false);
  };

  // Minimizing the image
  const handleMinimize = () => {
    if (!isMinimized) {
      setIsMinimized(true);
      setZoomLevel(0.72);
    } else {
      setIsMinimized(false);
      setZoomLevel(1);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Full photograph modal'}
    >
      <div
        className={`relative max-w-5xl w-full flex flex-col bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-stone-800 transition-all duration-300 ${
          isMinimized ? 'max-h-[75vh] scale-95' : 'max-h-[92vh] scale-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar with Exclusive "Fit into Frame" and "Minimize" visitor options ("that's it") */}
        <div className="p-3.5 sm:p-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between gap-3 text-xs text-stone-300">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300 font-semibold shrink-0">
              {category || currentPhotoMeta?.category || 'Visual Archive'}
            </span>
            <span className="font-mono text-[11px] text-stone-400 truncate hidden sm:inline">
              {fileName}
            </span>
          </div>

          {/* Visitor Action Controls */}
          <div className="flex items-center gap-2">
            {/* Option 1: Fitting the image into the frame */}
            <button
              type="button"
              onClick={handleFitToFrame}
              title="Fit entire image into frame without cropping"
              aria-label="Fit entire image into frame without cropping"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isContain && !isMinimized
                  ? 'bg-white text-stone-950 shadow-xs'
                  : 'bg-stone-800 hover:bg-stone-700 text-stone-200'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Fit into Frame</span>
            </button>

            {/* Option 2: Minimizing the image */}
            <button
              type="button"
              onClick={handleMinimize}
              title={isMinimized ? 'Restore full frame size' : 'Minimize image in frame'}
              aria-label={isMinimized ? 'Restore full frame size' : 'Minimize image in frame'}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isMinimized
                  ? 'bg-amber-500 text-stone-950 shadow-xs'
                  : 'bg-stone-800 hover:bg-stone-700 text-stone-200'
              }`}
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span>{isMinimized ? 'Restore' : 'Minimize'}</span>
            </button>

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
        <div className="relative flex-1 min-h-[320px] max-h-[66vh] bg-stone-950 flex items-center justify-center p-4 overflow-auto">
          <div
            className="transition-transform duration-200 flex items-center justify-center max-h-full max-w-full"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src={currentSrc}
              alt={accessibleAltText}
              aria-label={accessibleAltText}
              role="img"
              onError={handleImageError}
              className={`max-h-[60vh] max-w-full rounded-lg shadow-2xl transition-all duration-300 ${
                isContain ? 'object-contain' : 'object-cover'
              }`}
            />
          </div>

          {/* Minimized Watermark Indicator */}
          {isMinimized && (
            <div className="absolute top-4 left-4 bg-amber-500/90 text-stone-950 px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase shadow-sm">
              Minimized Scale (72%)
            </div>
          )}
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

            <div className="shrink-0 flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-1 rounded bg-stone-900 border border-stone-800 text-stone-400">
                {isContain ? 'Fitted in Frame' : 'Cover'}
              </span>
            </div>
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
              onSelectPhoto(prev.fileName, prev.title, prev.category);
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
              onSelectPhoto(next.fileName, next.title, next.category);
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
