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
  onOpenPhoto: (fileName: string, title: string, category?: string, source?: string) => void;
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
    <section id="gallery" className="py-20 md:py-28 border-t border-white/5 bg-[#060606] text-[#EBE7E1] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C17F24] flex items-center gap-2">
              <span className="w-6 h-px bg-[#C17F24]/60" />
              06 · Visual Archive
            </span>
            <h2 className="text-4xl sm:text-5xl font-display uppercase tracking-wider text-white mt-2">
              Photo Gallery
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#8E8880] font-mono">
            {galleryPhotos.length} Documented Photographic Highlights
          </p>
        </div>

        {/* Category Filters (when in Full View) */}
        {isFullView && (
          <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-white/10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#C17F24] text-[#060606] font-bold shadow-md shadow-[#C17F24]/20'
                    : 'bg-[#141414] text-[#8E8880] border border-white/5 hover:text-white hover:border-[#C17F24]/40 hover:bg-[#1a1a1a]'
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
                className="group rounded-2xl bg-[#121110] border border-white/10 overflow-hidden shadow-lg hover:border-[#C17F24]/40 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative bg-[#161616] cursor-pointer overflow-hidden p-1.5">
                  <PortfolioImage
                    fileName={photo.fileName}
                    alt={accessibleAlt}
                    title={photo.title}
                    category={photo.category}
                    aspectRatioClass="aspect-[4/3] rounded-xl overflow-hidden"
                    defaultFit={isContainPhoto ? 'contain' : 'cover'}
                    onClick={() =>
                      onOpenPhoto(photo.fileName, photo.title, photo.category, 'gallery')
                    }
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#C17F24] font-bold">
                        {photo.category}
                      </span>
                      {photo.date && (
                        <span className="text-[11px] font-mono text-[#8E8880]">
                          {photo.date}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#E09830] transition-colors leading-snug">
                      {photo.title}
                    </h3>

                    <p className="text-xs text-[#8E8880] mt-2 leading-relaxed">
                      {photo.description}
                    </p>
                  </div>

                  {/* Card Bottom Expand Action */}
                  <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
                    <span className="text-[#6A6560] font-mono text-[10px] truncate max-w-[150px]">
                      {photo.fileName}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        onOpenPhoto(photo.fileName, photo.title, photo.category, 'gallery')
                      }
                      className="text-[#C17F24] hover:text-[#E09830] font-semibold tracking-wide transition-colors flex items-center gap-1.5 cursor-pointer"
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
          <div className="mt-14 text-center">
            <a
              href="/gallery"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  onViewAll();
                }
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#C17F24] hover:bg-[#E09830] text-[#060606] font-display text-sm tracking-widest uppercase transition-all shadow-lg shadow-[#C17F24]/20 cursor-pointer hover:-translate-y-0.5 font-bold"
            >
              <span>Explore Complete Photo Archive ({galleryPhotos.length} Photos)</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
