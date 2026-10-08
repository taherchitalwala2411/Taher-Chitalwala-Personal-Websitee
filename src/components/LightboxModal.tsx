import React, { useEffect, useState, useRef } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Upload,
  Camera,
  Star,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react';
import { galleryPhotos, personalInfo } from '../data/portfolioData';
import { getPhoto, savePhoto, getPhotoUrlCandidates } from '../utils/photoStorage';

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
  const [isHero, setIsHero] = useState<boolean>(false);
  const [heroToast, setHeroToast] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const candidates = getPhotoUrlCandidates(fileName);

  // Find index in gallery photos if present
  const currentIndex = galleryPhotos.findIndex((p) => p.fileName === fileName);
  const currentPhotoMeta = currentIndex !== -1 ? galleryPhotos[currentIndex] : null;

  // Check if currently set as hero
  useEffect(() => {
    try {
      const saved = localStorage.getItem('taher_hero_photo_custom');
      if (saved) {
        const parsed = JSON.parse(saved);
        setIsHero(parsed?.fileName === fileName);
      } else {
        setIsHero(fileName === personalInfo.heroPhoto);
      }
    } catch {
      setIsHero(fileName === personalInfo.heroPhoto);
    }
    setZoomLevel(1);
  }, [fileName]);

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const result = reader.result as string;
      setDataUrl(result);
      await savePhoto(fileName, result);
      setHasError(false);
    };
    reader.readAsDataURL(file);
  };

  const handleFeatureAsHero = () => {
    const heroData = {
      fileName,
      title: title || currentPhotoMeta?.title || 'Featured Photograph',
      category: category || currentPhotoMeta?.category || 'Featured',
    };
    try {
      localStorage.setItem('taher_hero_photo_custom', JSON.stringify(heroData));
    } catch {}
    setIsHero(true);
    window.dispatchEvent(
      new CustomEvent('portfolio-hero-photo-updated', { detail: heroData })
    );
    setHeroToast('Featured at top of homepage!');
    setTimeout(() => setHeroToast(null), 3000);
  };

  const currentSrc = dataUrl || candidates[candidateIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Navigation Previous */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            const prev = galleryPhotos[currentIndex - 1];
            onSelectPhoto(prev.fileName, prev.title, prev.category);
          }}
          className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/80 text-white hover:bg-stone-800 transition-colors z-10 cursor-pointer"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Navigation Next */}
      {currentIndex !== -1 && currentIndex < galleryPhotos.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            const next = galleryPhotos[currentIndex + 1];
            onSelectPhoto(next.fileName, next.title, next.category);
          }}
          className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/80 text-white hover:bg-stone-800 transition-colors z-10 cursor-pointer"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Modal Container */}
      <div
        className="relative max-w-5xl max-h-[92vh] w-full bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-stone-800 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between p-3.5 sm:p-4 border-b border-stone-800 bg-stone-950 text-stone-200 gap-3">
          <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
            <span className="text-xs font-mono text-[#E11D48] font-bold">
              {category || currentPhotoMeta?.category || 'Photograph'}
            </span>
            <span className="text-xs text-stone-400 font-mono hidden md:inline truncate max-w-[200px]">
              · {fileName}
            </span>
          </div>

          {/* Interactive Actions */}
          <div className="flex items-center gap-2">
            {/* Feature at Top Button */}
            <button
              onClick={handleFeatureAsHero}
              title="Feature this photo at the top of the main homepage"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                isHero
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                  : 'bg-stone-800 hover:bg-stone-700 text-stone-200'
              }`}
            >
              <Star
                className={`w-3.5 h-3.5 ${
                  isHero ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                }`}
              />
              <span>{isHero ? 'Featured at Top' : 'Feature at Top'}</span>
            </button>

            {/* Fit mode toggle */}
            <button
              onClick={() => setIsContain(!isContain)}
              title={isContain ? 'Switch to Fill Frame' : 'Switch to Fit Entire Photo'}
              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs transition-colors cursor-pointer"
            >
              {isContain ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>

            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center gap-1 bg-stone-800/80 rounded-lg p-0.5">
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.2))}
                title="Zoom Out"
                className="p-1 text-stone-300 hover:text-white"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono px-1 text-stone-400">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.2))}
                title="Zoom In"
                className="p-1 text-stone-300 hover:text-white"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              {zoomLevel !== 1 && (
                <button
                  onClick={() => setZoomLevel(1)}
                  title="Reset Zoom"
                  className="p-1 text-stone-300 hover:text-white"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              title="Replace or upload original photograph"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Attach</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {heroToast && (
          <div className="bg-amber-400 text-stone-950 px-4 py-1.5 text-xs font-bold text-center flex items-center justify-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-stone-950" />
            <span>{heroToast}</span>
          </div>
        )}

        {/* Media Frame with Interactive Zoom and Fit */}
        <div className="relative flex-1 min-h-[350px] max-h-[68vh] bg-stone-950 flex items-center justify-center p-4 overflow-auto">
          {!hasError ? (
            <div
              className="transition-transform duration-200 flex items-center justify-center max-h-full max-w-full"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <img
                src={currentSrc}
                alt={title}
                onError={handleImageError}
                className={`max-h-full max-w-full rounded-lg shadow-lg ${
                  isContain ? 'object-contain' : 'object-cover'
                }`}
              />
            </div>
          ) : (
            <div className="p-8 max-w-md text-center bg-stone-900 rounded-xl border border-stone-800 space-y-4">
              <Camera className="w-12 h-12 text-stone-500 mx-auto" />
              <div>
                <h4 className="text-base font-bold text-stone-200">{title}</h4>
                <p className="text-xs text-stone-400 font-mono mt-1">{fileName}</p>
                <p className="text-xs text-stone-500 mt-2">
                  Original photograph uploaded by Taher. Click below to load or attach the file directly.
                </p>
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-stone-900 text-xs font-bold hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Select & Display Photo</span>
              </button>
            </div>
          )}
        </div>

        {/* Caption Bar */}
        <div className="p-4 sm:p-5 bg-stone-950 border-t border-stone-800">
          <h3 className="text-base sm:text-lg font-bold text-white">
            {title}
          </h3>
          {currentPhotoMeta?.description && (
            <p className="text-xs sm:text-sm text-stone-400 mt-1 leading-relaxed">
              {currentPhotoMeta.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
