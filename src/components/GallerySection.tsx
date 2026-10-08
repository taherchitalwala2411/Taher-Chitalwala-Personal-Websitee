import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Star,
  ZoomIn,
  SlidersHorizontal,
  Sparkles,
  Plus,
  Trash2,
  RotateCcw,
} from 'lucide-react';
import { galleryPhotos } from '../data/portfolioData';
import { PortfolioImage } from './PortfolioImage';
import { GalleryPhoto } from '../types/portfolio';
import { getFeaturedTopPhotos, toggleFeaturedTopPhoto } from '../utils/featuredPhotos';
import { FeaturePhotosModal } from './FeaturePhotosModal';
import { AddPhotoToGalleryModal } from './AddPhotoToGalleryModal';
import {
  getCustomGalleryPhotos,
  getHiddenGalleryPhotoIds,
  hideGalleryPhoto,
  unhideGalleryPhoto,
} from '../utils/customPhotoAssignments';

interface GallerySectionProps {
  isFullView?: boolean;
  onViewAll?: () => void;
  onOpenPhoto: (fileName: string, title: string, category?: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  isFullView = false,
  onViewAll,
  onOpenPhoto,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [featuredTopPhotos, setFeaturedTopPhotos] = useState<string[]>(getFeaturedTopPhotos());
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [lastRemovedPhotoId, setLastRemovedPhotoId] = useState<string | null>(null);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isAddPhotoModalOpen, setIsAddPhotoModalOpen] = useState(false);

  // Version counter to trigger re-renders on assignment updates
  const [galleryVersion, setGalleryVersion] = useState(0);

  // Sync featured photos & assignment updates
  useEffect(() => {
    const handleUpdate = () => {
      setFeaturedTopPhotos(getFeaturedTopPhotos());
      setGalleryVersion((v) => v + 1);
    };

    window.addEventListener('portfolio-top-photos-updated', handleUpdate);
    window.addEventListener('taher-photo-assignments-updated', handleUpdate);
    return () => {
      window.removeEventListener('portfolio-top-photos-updated', handleUpdate);
      window.removeEventListener('taher-photo-assignments-updated', handleUpdate);
    };
  }, []);

  const handleToggleHero = (photo: GalleryPhoto, e: React.MouseEvent) => {
    e.stopPropagation();
    const result = toggleFeaturedTopPhoto(photo.fileName);
    setFeaturedTopPhotos(getFeaturedTopPhotos());
    if (result.isFeatured) {
      setToastMessage(`Added "${photo.title}" to Top Showcase (${result.totalFeatured} active)`);
    } else {
      setToastMessage(`Removed from Top Showcase (${result.totalFeatured} active)`);
    }
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRemoveFromGallery = (photo: GalleryPhoto, e: React.MouseEvent) => {
    e.stopPropagation();
    hideGalleryPhoto(photo.id);
    setLastRemovedPhotoId(photo.id);
    setToastMessage(`Removed "${photo.title}" from gallery.`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleUndoRemove = () => {
    if (lastRemovedPhotoId) {
      unhideGalleryPhoto(lastRemovedPhotoId);
      setLastRemovedPhotoId(null);
      setToastMessage('Photo restored to gallery.');
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const hiddenIds = getHiddenGalleryPhotoIds();
  const customPhotos = getCustomGalleryPhotos();

  // Combine custom uploaded photos and base gallery photos, filtering hidden ones
  const allAvailablePhotos: GalleryPhoto[] = [...customPhotos, ...galleryPhotos].filter(
    (p) => !hiddenIds.includes(p.id)
  );

  const categories = [
    'All',
    '★ Featured at Top',
    'Speaking & Leadership',
    'IIMUN Events',
    'Awards & Recognition',
    'Dignitaries & Interactions',
    'Sports & Passion',
  ];

  const filteredPhotos = isFullView
    ? selectedCategory === 'All'
      ? allAvailablePhotos
      : selectedCategory === '★ Featured at Top'
      ? allAvailablePhotos.filter((p) => featuredTopPhotos.includes(p.fileName))
      : allAvailablePhotos.filter((p) => p.category === selectedCategory)
    : allAvailablePhotos
        .filter((p) =>
          p.featured ||
          ['Head boy image 2.jpeg', 'NIE TOI 2.jpeg', 'SBFL winning.jpeg', 'with Nadir Godrej.jpeg', 'Trophies.jpeg', 'IIMUN event 2.jpeg'].includes(p.fileName)
        )
        .slice(0, 6);

  return (
    <>
      <section id="gallery" className="py-16 md:py-22 border-t border-stone-200/80 dark:border-stone-800 bg-gradient-to-b from-[#FAF9F5] via-[#F6F3EB] to-[#FAF9F5] dark:from-[#121110] dark:via-[#161513] dark:to-[#121110] relative transition-colors duration-300">
        {/* Toast Notification with Undo */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-top-2 duration-200 border border-stone-700 dark:border-stone-300">
            <Star className="w-4 h-4 text-amber-400 dark:text-amber-500 fill-amber-400 dark:fill-amber-500 shrink-0" />
            <span>{toastMessage}</span>
            {lastRemovedPhotoId && (
              <button
                type="button"
                onClick={handleUndoRemove}
                className="ml-2 underline text-amber-300 dark:text-amber-600 hover:text-white cursor-pointer font-bold"
              >
                Undo
              </button>
            )}
          </div>
        )}

        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Header with Photo Management Actions */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8B1E28] dark:text-[#E11D48]">
                06 · Visual Archive
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-950 dark:text-stone-50 mt-1">
                Photo Gallery
              </h2>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Option to Add New Photo to Gallery */}
              <button
                type="button"
                onClick={() => setIsAddPhotoModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-stone-950 text-xs font-bold transition-all shadow-2xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Photo to Gallery</span>
              </button>

              {/* Select Multiple at Once button */}
              <button
                type="button"
                onClick={() => setIsManageModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 hover:bg-amber-500/20 dark:hover:bg-amber-500/30 text-amber-900 dark:text-amber-300 border border-amber-500/30 dark:border-amber-500/40 text-xs font-bold transition-all shadow-2xs cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                <span>Feature Multiple at Top</span>
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-900 px-3 py-2 rounded-xl border border-stone-200/90 dark:border-stone-800 shadow-2xs">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>{featuredTopPhotos.length} at Top</span>
              </div>
            </div>
          </div>

          {/* Category Filters (when in Full View) */}
          {isFullView && (
            <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-stone-200/70 dark:border-stone-800">
              {categories.map((cat) => {
                const isTopFilter = cat === '★ Featured at Top';
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 shadow-xs'
                        : isTopFilter
                        ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800 hover:bg-amber-200/70 dark:hover:bg-amber-900/60'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 hover:bg-stone-200/70 dark:hover:bg-stone-700'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          )}

          {/* Well-balanced Photo Grid with Add & Remove Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo) => {
              const isFeatured = featuredTopPhotos.includes(photo.fileName);

              const isContainPhoto = [
                'Head boy image 2.jpeg',
                'Trophies.jpeg',
                'WhatsApp Image 2026-10-07 at 8.49.04 AM.jpeg',
                'Headboy image.jpeg',
                'with Nadir Godrej.jpeg',
              ].includes(photo.fileName);

              return (
                <div
                  key={photo.id}
                  className="group rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative bg-stone-100 dark:bg-stone-800 cursor-pointer overflow-hidden p-1">
                    <PortfolioImage
                      fileName={photo.fileName}
                      alt={photo.title}
                      title={photo.title}
                      category={photo.category}
                      aspectRatioClass="aspect-[4/3] rounded-xl overflow-hidden"
                      defaultFit={isContainPhoto ? 'contain' : 'cover'}
                      onClick={() =>
                        onOpenPhoto(photo.fileName, photo.title, photo.category)
                      }
                    />

                    {/* Active Top Marker */}
                    {isFeatured && (
                      <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-900/90 dark:bg-black/90 text-amber-300 text-[10px] font-bold shadow-sm backdrop-blur-xs">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>Featured at Top</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#8B1E28] dark:text-[#E11D48] font-bold">
                          {photo.category}
                        </span>
                        {photo.date && (
                          <span className="text-[11px] font-mono text-stone-400 dark:text-stone-500">
                            {photo.date}
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-stone-950 dark:text-stone-50 leading-snug">
                        {photo.title}
                      </h3>

                      <p className="text-xs text-stone-600 dark:text-stone-300 mt-1.5 leading-relaxed">
                        {photo.description}
                      </p>
                    </div>

                    {/* Card bottom actions: Feature toggle, Expand, and Remove option */}
                    <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-2 text-[11px]">
                      <button
                        type="button"
                        onClick={(e) => handleToggleHero(photo, e)}
                        title={
                          isFeatured
                            ? 'Remove from top homepage showcase'
                            : 'Feature in top homepage showcase'
                        }
                        className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          isFeatured
                            ? 'bg-amber-100 dark:bg-amber-950/50 text-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800 shadow-2xs font-bold'
                            : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-100'
                        }`}
                      >
                        <Star
                          className={`w-3 h-3 ${
                            isFeatured ? 'fill-amber-500 text-amber-500' : 'text-stone-400 dark:text-stone-500'
                          }`}
                        />
                        <span>{isFeatured ? '★ At Top' : '+ At Top'}</span>
                      </button>

                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() =>
                            onOpenPhoto(photo.fileName, photo.title, photo.category)
                          }
                          className="text-stone-700 dark:text-stone-300 hover:text-[#8B1E28] dark:hover:text-[#E11D48] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span>Expand</span>
                          <ZoomIn className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleRemoveFromGallery(photo, e)}
                          title="Remove photo from gallery"
                          className="text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* View All CTA on Home Page preview */}
          {!isFullView && onViewAll && (
            <div className="mt-12 text-center">
              <button
                onClick={onViewAll}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 text-xs font-bold hover:bg-stone-800 dark:hover:bg-white/90 transition-all shadow-sm cursor-pointer hover:-translate-y-0.5"
              >
                <span>Explore Complete Photo Archive ({allAvailablePhotos.length} Photos)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Feature Multiple Photos Modal */}
      <FeaturePhotosModal
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
      />

      {/* Add Photo to Gallery Modal */}
      <AddPhotoToGalleryModal
        isOpen={isAddPhotoModalOpen}
        onClose={() => setIsAddPhotoModalOpen(false)}
        onPhotoAdded={(p) => {
          setToastMessage(`Added "${p.title}" to gallery.`);
          setTimeout(() => setToastMessage(null), 3500);
        }}
      />
    </>
  );
};
