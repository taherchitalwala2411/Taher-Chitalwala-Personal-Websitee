import React, { useState, useEffect, useRef } from 'react';
import { Camera, Upload, ZoomIn, Maximize2, Minimize2, Plus, Minus, RotateCcw } from 'lucide-react';
import { getPhoto, savePhoto, getPhotoUrlCandidates } from '../utils/photoStorage';

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
  showFitToggle = true,
  allowScaleControl = true,
}) => {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Default fit based on photo nature (e.g. shelf, certificate, train platform)
  const isNaturallyContain = [
    'Trophies.jpeg',
    'WhatsApp Image 2026-10-07 at 8.49.04 AM.jpeg',
    'Headboy image.jpeg',
    'Head boy image 2.jpeg',
    'NIE TOI 2.jpeg',
    'IIMUN event 2.jpeg',
    'with Nadir Godrej.jpeg',
  ].includes(fileName);

  const initialFit =
    defaultFit ||
    (typeof window !== 'undefined'
      ? (localStorage.getItem(`taher_photo_fit_${fileName}`) as 'cover' | 'contain')
      : null) ||
    (isNaturallyContain ? 'contain' : 'cover');

  const [fitMode, setFitMode] = useState<'cover' | 'contain'>(initialFit);

  // Scale zoom adjustment
  const initialScale =
    typeof window !== 'undefined'
      ? parseFloat(localStorage.getItem(`taher_photo_scale_${fileName}`) || '1')
      : 1;
  const [scale, setScale] = useState<number>(isNaN(initialScale) ? 1 : initialScale);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const result = reader.result as string;
      setDataUrl(result);
      await savePhoto(fileName, result);
      setIsUploading(false);
      setIsLoaded(true);
      setHasError(false);
    };
    reader.onerror = () => setIsUploading(false);
    reader.readAsDataURL(file);
  };

  const triggerUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const toggleFit = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextFit = fitMode === 'cover' ? 'contain' : 'cover';
    setFitMode(nextFit);
    try {
      localStorage.setItem(`taher_photo_fit_${fileName}`, nextFit);
    } catch {}
  };

  const zoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextScale = Math.min(1.8, Math.round((scale + 0.1) * 10) / 10);
    setScale(nextScale);
    try {
      localStorage.setItem(`taher_photo_scale_${fileName}`, nextScale.toString());
    } catch {}
  };

  const zoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextScale = Math.max(0.6, Math.round((scale - 0.1) * 10) / 10);
    setScale(nextScale);
    try {
      localStorage.setItem(`taher_photo_scale_${fileName}`, nextScale.toString());
    } catch {}
  };

  const resetScale = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(1);
    try {
      localStorage.removeItem(`taher_photo_scale_${fileName}`);
    } catch {}
  };

  return (
    <div
      className={`relative group overflow-hidden bg-stone-100/90 ${aspectRatioClass} ${className} flex items-center justify-center select-none`}
      onClick={onClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {!hasError ? (
        <>
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <img
              src={currentSrc}
              alt={alt}
              loading={priority ? 'eager' : 'lazy'}
              referrerPolicy="no-referrer"
              onError={handleImageError}
              onLoad={handleImageLoad}
              style={{
                transform: `scale(${scale})`,
                transition: 'transform 0.2s ease-out',
              }}
              className={`w-full h-full ${
                fitMode === 'contain'
                  ? 'object-contain p-1'
                  : 'object-cover'
              } ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>

          {!isLoaded && (
            <div className="absolute inset-0 bg-stone-200/60 animate-pulse flex items-center justify-center">
              <Camera className="w-6 h-6 text-stone-400" />
            </div>
          )}

          {/* Hover zoom overlay indicator */}
          {showZoomIcon && isLoaded && (
            <div className="absolute inset-0 bg-stone-950/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              <span className="p-2.5 rounded-full bg-white/95 text-stone-900 shadow-md backdrop-blur-xs">
                <ZoomIn className="w-4 h-4" />
              </span>
            </div>
          )}

          {/* Persistent/Hover Photo Framing & Resize Controls */}
          {isLoaded && (
            <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 bg-stone-900/85 backdrop-blur-md p-1 rounded-lg text-white shadow-md">
              {showFitToggle && (
                <button
                  type="button"
                  onClick={toggleFit}
                  title={fitMode === 'contain' ? 'Switch to Fill Frame' : 'Switch to Fit Entire Photo'}
                  className="px-1.5 py-1 text-[10px] font-semibold rounded hover:bg-stone-800 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {fitMode === 'contain' ? (
                    <>
                      <Maximize2 className="w-3 h-3 text-stone-300" />
                      <span className="hidden sm:inline">Fill</span>
                    </>
                  ) : (
                    <>
                      <Minimize2 className="w-3 h-3 text-amber-300" />
                      <span className="hidden sm:inline">Fit</span>
                    </>
                  )}
                </button>
              )}

              {allowScaleControl && (
                <>
                  <div className="h-3 w-px bg-stone-700 mx-0.5" />
                  <button
                    type="button"
                    onClick={zoomOut}
                    title="Zoom Out (Resize photo smaller inside frame)"
                    className="p-1 hover:bg-stone-800 rounded transition-colors text-stone-300 hover:text-white cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-[10px] font-mono px-0.5 text-stone-300">
                    {Math.round(scale * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={zoomIn}
                    title="Zoom In (Resize photo larger inside frame)"
                    className="p-1 hover:bg-stone-800 rounded transition-colors text-stone-300 hover:text-white cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                  {scale !== 1 && (
                    <button
                      type="button"
                      onClick={resetScale}
                      title="Reset photo zoom to 100%"
                      className="p-1 hover:bg-stone-800 rounded transition-colors text-amber-300 cursor-pointer"
                    >
                      <RotateCcw className="w-2.5 h-2.5" />
                    </button>
                  )}
                </>
              )}

              <div className="h-3 w-px bg-stone-700 mx-0.5" />
              <button
                type="button"
                onClick={triggerUpload}
                title={`Replace or set "${fileName}"`}
                className="p-1 hover:bg-stone-800 rounded transition-colors text-stone-300 hover:text-white cursor-pointer"
              >
                <Upload className="w-3 h-3" />
              </button>
            </div>
          )}
        </>
      ) : (
        /* Graceful Editorial Fallback Container */
        <div className="absolute inset-0 p-5 bg-gradient-to-br from-[#F5F2EA] to-[#EBE6DC] border border-stone-200/70 flex flex-col justify-between select-none">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium tracking-wider text-stone-500 uppercase">
              {category || 'Personal Photograph'}
            </span>
            <span className="p-1.5 rounded-md bg-stone-200/60 text-stone-600">
              <Camera className="w-4 h-4" />
            </span>
          </div>

          <div className="my-auto py-2">
            <p className="text-sm font-semibold text-stone-800 line-clamp-2">
              {title || alt || fileName}
            </p>
            <p className="text-xs text-stone-500 mt-1 line-clamp-1 font-mono">
              {fileName}
            </p>
          </div>

          <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between">
            <button
              type="button"
              onClick={triggerUpload}
              disabled={isUploading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-stone-900 text-white text-xs font-medium hover:bg-stone-800 transition-colors shadow-xs"
            >
              <Upload className="w-3 h-3" />
              {isUploading ? 'Loading...' : 'Upload Photo'}
            </button>
            <span className="text-[10px] text-stone-400">Click to attach file</span>
          </div>
        </div>
      )}
    </div>
  );
};
