import React, { useState, useEffect } from 'react';
import { X, Star, Check, Sparkles, RotateCcw } from 'lucide-react';
import { galleryPhotos } from '../data/portfolioData';
import {
  getFeaturedTopPhotos,
  setFeaturedTopPhotos,
  resetFeaturedTopPhotos,
} from '../utils/featuredPhotos';
import { PortfolioImage } from './PortfolioImage';

interface FeaturePhotosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeaturePhotosModal: React.FC<FeaturePhotosModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setSelected(getFeaturedTopPhotos());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const allAvailablePhotos = [...galleryPhotos];

  const handleToggle = (fileName: string) => {
    if (selected.includes(fileName)) {
      if (selected.length <= 1) return; // Keep at least one photo
      setSelected(selected.filter((f) => f !== fileName));
    } else {
      setSelected([...selected, fileName]);
    }
  };

  const handleSelectAll = () => {
    const allFileNames = allAvailablePhotos.map((p) => p.fileName);
    setSelected(allFileNames);
  };

  const handleResetDefault = () => {
    const defaults = resetFeaturedTopPhotos();
    setSelected(defaults);
  };

  const handleSave = () => {
    setFeaturedTopPhotos(selected);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-stone-900 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden text-stone-900 dark:text-stone-100 transition-colors">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200/80 dark:border-stone-800 flex items-start justify-between gap-4 bg-gradient-to-r from-stone-50 to-white dark:from-stone-900 dark:to-stone-900">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400">
                <Star className="w-4 h-4 fill-amber-500 text-amber-600 dark:text-amber-400" />
              </span>
              <h3 className="text-lg font-bold text-stone-950 dark:text-stone-50">
                Feature Photos at the Top of Home Page
              </h3>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Select multiple photos at once to showcase in the interactive hero gallery at the top of your portfolio.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action bar */}
        <div className="px-6 py-3 bg-stone-50 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-mono text-stone-600 dark:text-stone-300">
            <span className="font-bold text-stone-900 dark:text-stone-100">{selected.length}</span> photos selected for Top Showcase
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSelectAll}
              className="px-2.5 py-1 rounded-md bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 text-stone-800 dark:text-stone-100 font-semibold transition-colors cursor-pointer"
            >
              Select All
            </button>
            <button
              type="button"
              onClick={handleResetDefault}
              className="px-2.5 py-1 rounded-md border border-stone-300 dark:border-stone-700 hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Photos grid with checkboxes */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {allAvailablePhotos.map((photo) => {
            const isChecked = selected.includes(photo.fileName);
            return (
              <div
                key={photo.id}
                onClick={() => handleToggle(photo.fileName)}
                className={`group relative rounded-xl border-2 p-2.5 transition-all cursor-pointer flex flex-col justify-between ${
                  isChecked
                    ? 'border-[#8B1E28] dark:border-[#E11D48] bg-rose-50/20 dark:bg-rose-950/20 shadow-md ring-2 ring-[#8B1E28]/15 dark:ring-[#E11D48]/30'
                    : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-800/40 hover:border-stone-300 dark:hover:border-stone-700 opacity-75 hover:opacity-100'
                }`}
              >
                <div className="relative rounded-lg overflow-hidden aspect-[4/3] bg-stone-100 dark:bg-stone-800 mb-2">
                  <PortfolioImage
                    fileName={photo.fileName}
                    alt={photo.title}
                    aspectRatioClass="w-full h-full"
                    showZoomIcon={false}
                    showFitToggle={false}
                    allowScaleControl={false}
                    defaultFit="cover"
                  />

                  {/* Active selection badge */}
                  <div className={`absolute top-2 right-2 w-6 h-6 rounded-md flex items-center justify-center transition-all ${
                    isChecked
                      ? 'bg-[#8B1E28] dark:bg-[#E11D48] text-white shadow-md'
                      : 'bg-stone-900/40 text-transparent border border-white/70'
                  }`}>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                    {photo.title}
                  </p>
                  <p className="text-[10px] text-stone-500 dark:text-stone-400 truncate font-mono mt-0.5">
                    {photo.category}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer controls */}
        <div className="p-4 sm:p-5 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-900">
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Changes will update your top homepage showcase immediately.
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-200/70 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white dark:text-stone-950 bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white/90 shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Apply to Top Showcase ({selected.length})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
