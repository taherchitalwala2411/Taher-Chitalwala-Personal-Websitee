import React, { useEffect, useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Square,
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
  const [isContain, setIsContain] = useState<boolean>(true); // default to Small Frame (complete image)

  const candidates = getPhotoUrlCandidates(fileName);

  // Find metadata in galleryPhotos if available
  const currentPhotoMeta = galleryPhotos.find((p) => p.fileName === fileName);
  const currentIndex = galleryPhotos.findIndex((p) => p.fileName === fileName);

  useEffect(() => {
    let active = true;
    setDataUrl(null);
    setCandidateIndex(0);

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Full photograph modal'}
    >
      <div
        className="relative max-w-5xl w-full flex flex-col bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-stone-800 transition-all duration-300 max-h-[92vh] scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar with Exclusive Choice: Small Frame (Complete) vs Full Frame (Cropped) */}
        <div className="p-3.5 sm:p-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between gap-3 text-xs text-stone-300">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300 font-semibold shrink-0">
              {category || currentPhotoMeta?.category || 'Visual Archive'}
            </span>
            <span className="font-mono text-[11px] text-stone-400 truncate hidden sm:inline">
              {fileName}
            </span>
          </div>

          {/* Visitor Action Controls: Only Option is Small Frame vs Full Frame */}
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center p-0.5 rounded-xl bg-stone-900 border border-stone-800 shadow-xs">
              {/* Option 1: Small Frame where huge image appears completely */}
              <button
                type="button"
                onClick={() => setIsContain(true)}
                title="Small Frame: Huge image appears completely without any crop"
                aria-label="Small Frame (complete image)"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isContain
                    ? 'bg-white text-stone-950 shadow-xs font-bold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Square className="w-3.5 h-3.5" />
                <span>Small Frame (Complete)</span>
              </button>

              {/* Option 2: Full Frame where huge image could get cropped */}
              <button
                type="button"
                onClick={() => setIsContain(false)}
                title="Full Frame: Huge image fills frame completely (could get cropped)"
                aria-label="Full Frame (could get cropped)"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  !isContain
                    ? 'bg-white text-stone-950 shadow-xs font-bold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Full Frame (Cropped)</span>
              </button>
            </div>

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
        <div className="relative flex-1 min-h-[320px] max-h-[66vh] bg-stone-950 flex items-center justify-center p-3 sm:p-4 overflow-hidden">
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <img
              src={currentSrc}
              alt={accessibleAltText}
              aria-label={accessibleAltText}
              role="img"
              onError={handleImageError}
              className={`rounded-lg shadow-2xl transition-all duration-300 ${
                isContain
                  ? 'max-h-[60vh] max-w-full object-contain mx-auto'
                  : 'w-full h-[60vh] object-cover'
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

            <div className="shrink-0 flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-1 rounded bg-stone-900 border border-stone-800 text-stone-400">
                {isContain ? 'Small Frame Mode (Complete)' : 'Full Frame Mode (Cropped)'}
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
