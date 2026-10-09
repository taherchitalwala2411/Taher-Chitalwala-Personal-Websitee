import React, { useState } from 'react';
import {
  ArrowRight,
  Eye,
} from 'lucide-react';
import { galleryPhotos } from '../data/portfolioData';
import { PortfolioImage } from './PortfolioImage';

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

  const categories = [
    'All',
    'Speaking & Leadership',
    'IIMUN Events',
    'Awards & Recognition',
    'Dignitaries & Interactions',
    'Sports & Passion',
  ];

  const filteredPhotos = isFullView
    ? selectedCategory === 'All'
      ? galleryPhotos
      : galleryPhotos.filter((p) => p.category === selectedCategory)
    : galleryPhotos
        .filter((p) =>
          [
            'Head boy image 2.jpeg',
            'IIMUN event 6.jpeg',
            'NIE TOI 2.jpeg',
            'Trophies.jpeg',
            'with Nadir Godrej.jpeg',
            'SBFL winning.jpeg',
          ].includes(p.fileName)
        )
        .slice(0, 6);

  return (
    <section id="gallery" className="py-16 md:py-22 border-t border-stone-200/80 dark:border-stone-800 bg-gradient-to-b from-[#FAF9F5] via-[#F6F3EB] to-[#FAF9F5] dark:from-[#121110] dark:via-[#161513] dark:to-[#121110] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B1E28] dark:text-[#E11D48]">
              06 · Visual Archive
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-950 dark:text-stone-50 mt-1">
              Photo Gallery
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-mono">
            {galleryPhotos.length} Documented Photographic Highlights
          </p>
        </div>

        {/* Category Filters (when in Full View) */}
        {isFullView && (
          <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-stone-200/70 dark:border-stone-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 hover:bg-stone-200/70 dark:hover:bg-stone-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Pure, Accessible Photo Grid with Alt Text for Blind Users */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => {
            const isContainPhoto = [
              'Head boy image 2.jpeg',
              'Trophies.jpeg',
              'WhatsApp Image 2026-10-07 at 8.49.04 AM.jpeg',
              'Headboy image.jpeg',
              'with Nadir Godrej.jpeg',
              'IIMUN event 6.jpeg',
            ].includes(photo.fileName);

            const accessibleAlt =
              photo.altText ||
              `${photo.title} (${photo.category}) - Photograph of Taher Chitalwala`;

            return (
              <div
                key={photo.id}
                className="group rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="relative bg-stone-100 dark:bg-stone-800 cursor-pointer overflow-hidden p-1">
                  <PortfolioImage
                    fileName={photo.fileName}
                    alt={accessibleAlt}
                    title={photo.title}
                    category={photo.category}
                    aspectRatioClass="aspect-[4/3] rounded-xl overflow-hidden"
                    defaultFit={isContainPhoto ? 'contain' : 'cover'}
                    onClick={() =>
                      onOpenPhoto(photo.fileName, photo.title, photo.category)
                    }
                  />
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

                  {/* Card Bottom Expand Action */}
                  <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[11px]">
                    <span className="text-stone-400 font-mono text-[10px]">
                      {photo.fileName}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        onOpenPhoto(photo.fileName, photo.title, photo.category)
                      }
                      className="text-stone-700 dark:text-stone-300 hover:text-[#8B1E28] dark:hover:text-[#E11D48] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                      aria-label={`View ${photo.title} details`}
                    >
                      <span>View Photo</span>
                      <Eye className="w-3.5 h-3.5" />
                    </button>
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
              <span>Explore Complete Photo Archive ({galleryPhotos.length} Photos)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
