import React, { useEffect, useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Camera,
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
  const [hasError, setHasError] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isContain, setIsContain] = useState<boolean>(true);

  const candidates = getPhotoUrlCandidates(fileName);

  // Find index in gallery photos if present
  const currentIndex = galleryPhotos.findIndex((p) => p.fileName === fileName);
  const currentPhotoMeta = currentIndex !== -1 ? galleryPhotos[currentIndex] : null;

  // Load from storage or fallback candidate
  useEffect(() => {
    let active = true;
    getPhoto(fileName).then((stored) => {
      if (active && stored) {
        setDataUrl(stored);
        setHasError(false);
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
      setHasError(true);
    }
  };

  const currentSrc = dataUrl || candidates[candidateIndex];

  const accessibleAltText =
    currentPhotoMeta?.altText ||
    title ||
    `Photograph of Taher Chitalwala: ${fileName}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Full photograph modal'}
    >
      <div
        className="relative max-w-5xl w-full max-h-[92vh] flex flex-col bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-stone-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar with Clean Viewing Controls */}
        <div className="p-4 sm:p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between text-xs text-stone-300">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300 font-semibold shrink-0">
              {category || currentPhotoMeta?.category || 'Visual Archive'}
            </span>
            <span className="font-mono text-[11px] text-stone-400 truncate">
              {fileName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle: Contain vs Cover */}
            <button
              onClick={() => setIsContain(!isContain)}
              title={isContain ? 'Fill Screen' : 'Fit Entire Photo'}
              aria-label={isContain ? 'Fill Screen' : 'Fit Entire Photo'}
              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors cursor-pointer"
            >
              {isContain ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-stone-800 rounded-lg p-0.5">
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.2))}
                title="Zoom Out"
                aria-label="Zoom Out"
                className="p-1 text-stone-300 hover:text-white cursor-pointer"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono px-1">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.2))}
                title="Zoom In"
                aria-label="Zoom In"
                className="p-1 text-stone-300 hover:text-white cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              {zoomLevel !== 1 && (
                <button
                  onClick={() => setZoomLevel(1)}
                  title="Reset Zoom"
                  aria-label="Reset Zoom"
                  className="p-1 text-stone-300 hover:text-white cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors cursor-pointer"
              aria-label="Close photograph view"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Media Frame with Descriptive Alt Text for Blind Users */}
        <div className="relative flex-1 min-h-[350px] max-h-[68vh] bg-stone-950 flex items-center justify-center p-4 overflow-auto">
          {!hasError ? (
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
                className={`max-h-full max-w-full rounded-lg shadow-lg ${
                  isContain ? 'object-contain' : 'object-cover'
                }`}
              />
            </div>
          ) : (
            <div className="p-8 max-w-md text-center bg-stone-900 rounded-xl border border-stone-800 space-y-3">
              <Camera className="w-12 h-12 text-stone-500 mx-auto" />
              <h4 className="text-base font-bold text-stone-200">{title}</h4>
              <p className="text-xs text-stone-400 font-mono">{fileName}</p>
              <p className="text-xs text-stone-500">{accessibleAltText}</p>
            </div>
          )}
        </div>

        {/* Caption Bar with Alt Description Display for Universal Accessibility */}
        <div className="p-4 sm:p-5 bg-stone-950 border-t border-stone-800">
          <h3 className="text-base sm:text-lg font-bold text-white">
            {title}
          </h3>
          {currentPhotoMeta?.description && (
            <p className="text-xs sm:text-sm text-stone-400 mt-1 leading-relaxed">
              {currentPhotoMeta.description}
            </p>
          )}
          {currentPhotoMeta?.altText && (
            <p className="text-[11px] text-stone-500 mt-1.5 font-sans italic border-l-2 border-stone-700 pl-2">
              Visual description: {currentPhotoMeta.altText}
            </p>
          )}
        </div>

        {/* Previous / Next Arrows in Gallery sequence */}
        {currentIndex > 0 && (
          <button
            onClick={() => {
              const prev = galleryPhotos[currentIndex - 1];
              onSelectPhoto(prev.fileName, prev.title, prev.category);
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-stone-900/80 hover:bg-stone-900 text-white transition-colors cursor-pointer shadow-lg"
            aria-label="Previous photograph"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {currentIndex !== -1 && currentIndex < galleryPhotos.length - 1 && (
          <button
            onClick={() => {
              const next = galleryPhotos[currentIndex + 1];
              onSelectPhoto(next.fileName, next.title, next.category);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-stone-900/80 hover:bg-stone-900 text-white transition-colors cursor-pointer shadow-lg"
            aria-label="Next photograph"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};
