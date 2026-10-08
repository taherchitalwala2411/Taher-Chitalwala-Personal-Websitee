import React, { useState, useEffect } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Star,
  Play,
  Pause,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';
import { personalInfo, galleryPhotos } from '../data/portfolioData';
import { PortfolioImage } from './PortfolioImage';
import { getFeaturedTopPhotos } from '../utils/featuredPhotos';
import { FeaturePhotosModal } from './FeaturePhotosModal';

interface HeroProps {
  onExplore: () => void;
  onConnect: () => void;
  onOpenPhoto: (fileName: string, title: string, category?: string) => void;
  onNavigateToGallery?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExplore,
  onConnect,
  onOpenPhoto,
}) => {
  const [featuredPhotos, setFeaturedPhotos] = useState<string[]>(getFeaturedTopPhotos());
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isManageModalOpen, setIsManageModalOpen] = useState<boolean>(false);

  // Sync featured photos
  useEffect(() => {
    const handleUpdate = () => {
      const updated = getFeaturedTopPhotos();
      setFeaturedPhotos(updated);
      if (currentIndex >= updated.length) {
        setCurrentIndex(0);
      }
    };

    window.addEventListener('portfolio-top-photos-updated', handleUpdate);
    return () => {
      window.removeEventListener('portfolio-top-photos-updated', handleUpdate);
    };
  }, [currentIndex]);

  // Slideshow timer
  useEffect(() => {
    if (!isPlaying || featuredPhotos.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredPhotos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, featuredPhotos.length]);

  const currentFileName = featuredPhotos[currentIndex] || personalInfo.heroPhoto;
  const currentMeta = galleryPhotos.find((p) => p.fileName === currentFileName) || {
    title: 'Featured Milestone & Leadership',
    category: 'Featured Highlight',
    description: '',
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + featuredPhotos.length) % featuredPhotos.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % featuredPhotos.length);
  };

  const journeyPillars = [
    { id: 'about', label: 'About Me', code: '01' },
    { id: 'education', label: 'Education', code: '02' },
    { id: 'achievements', label: 'Milestones & Honors', code: '03' },
    { id: 'experience', label: 'Work Experience', code: '04' },
    { id: 'projects', label: 'Projects & Studies', code: '05' },
    { id: 'gallery', label: 'Visual Gallery', code: '06' },
  ];

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="relative pt-24 pb-14 md:pt-32 md:pb-18 overflow-hidden bg-gradient-to-b from-[#F6F3EB] via-[#FAF9F5] to-[#FAF9F5] dark:from-[#161513] dark:via-[#121110] dark:to-[#121110] border-b border-stone-200/70 dark:border-stone-800 transition-colors duration-300">
        {/* Modern ambient visual background — adapts to dark & light modes */}
        <div className="absolute top-0 right-1/4 w-[32rem] h-[32rem] bg-[#8B1E28]/[0.035] dark:bg-[#8B1E28]/[0.07] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 left-10 w-80 h-80 bg-amber-500/[0.03] dark:bg-amber-500/[0.05] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#d6d3d1_1px,transparent_1px)] dark:bg-[radial-gradient(#292524_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Expressive Personal Narrative */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              {/* Location Badge (BBA Digital Business removed per user request) */}
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-950 text-xs font-semibold tracking-wide shadow-xs">
                  <MapPin className="w-3.5 h-3.5 text-[#E11D48]" />
                  <span>{personalInfo.location}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/20 dark:border-amber-500/30 text-amber-900 dark:text-amber-300 text-xs font-semibold">
                  <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                  <span>Personal Portfolio</span>
                </span>
              </div>

              {/* Main Name */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-stone-950 dark:text-stone-50 uppercase leading-[1.05] text-balance">
                {personalInfo.fullName}
              </h1>

              {/* Tagline Banner */}
              <div className="mt-3.5 mb-5 inline-flex items-center gap-2.5">
                <span className="h-7 w-1 bg-[#8B1E28] dark:bg-[#E11D48] rounded-full shrink-0" />
                <p className="text-xl sm:text-2xl font-serif italic text-[#8B1E28] dark:text-[#E11D48] tracking-tight">
                  “{personalInfo.tagline}”
                </p>
              </div>

              {/* Authentic Intro: "Always trying to figure things out..." */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border border-stone-200/90 dark:border-stone-800 shadow-sm mb-6 relative overflow-hidden transition-colors">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#8B1E28]/40 dark:bg-[#E11D48]/50" />
                <p className="text-base sm:text-lg text-stone-800 dark:text-stone-200 leading-relaxed font-normal">
                  {personalInfo.introduction}
                </p>
              </div>

              {/* Quick Journey Navigation Strip — purposeful, interactive */}
              <div className="mb-7">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 font-bold">
                    Journey Chapters
                  </span>
                  <span className="text-[11px] font-mono text-stone-400 dark:text-stone-500">
                    Click to jump
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {journeyPillars.map((pillar) => (
                    <button
                      key={pillar.id}
                      onClick={() => handleScrollTo(pillar.id)}
                      className="px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-900 dark:hover:bg-stone-100 hover:text-white dark:hover:text-stone-950 text-stone-700 dark:text-stone-300 text-xs font-semibold border border-stone-200/80 dark:border-stone-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs hover:shadow-xs hover:-translate-y-0.5"
                    >
                      <span className="text-[10px] font-mono text-stone-400 dark:text-stone-500">
                        {pillar.code}
                      </span>
                      <span>{pillar.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={onExplore}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 text-xs font-bold hover:bg-stone-800 dark:hover:bg-white/90 transition-all shadow-md group cursor-pointer hover:-translate-y-0.5"
                >
                  <span>Explore My Journey</span>
                  <ArrowDown className="w-3.5 h-3.5 text-stone-400 dark:text-stone-600 group-hover:translate-y-0.5 transition-transform" />
                </button>

                <button
                  onClick={onConnect}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-bold border border-stone-300 dark:border-stone-700 transition-all shadow-xs cursor-pointer hover:-translate-y-0.5"
                >
                  <span>Let's Connect</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
                </button>
              </div>
            </div>

            {/* Right Column: MULTI-PHOTO FEATURED SHOWCASE WITH BATCH EDITING */}
            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-lg lg:max-w-none bg-white/95 dark:bg-stone-900/95 rounded-2xl border border-stone-200/90 dark:border-stone-800 shadow-xl overflow-hidden p-3.5 sm:p-4.5 backdrop-blur-xs transition-colors">
                {/* Header Bar of the Multi-Photo Showcase */}
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800 text-xs gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 font-bold text-stone-900 dark:text-stone-100">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>Top Showcase</span>
                    </span>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60 font-semibold">
                      {currentIndex + 1} / {featuredPhotos.length}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Feature Multiple Photos at Once Modal Button */}
                    <button
                      type="button"
                      onClick={() => setIsManageModalOpen(true)}
                      title="Select multiple photos to feature at top"
                      className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-amber-100 dark:hover:bg-amber-950/50 hover:text-amber-900 dark:hover:text-amber-300 text-stone-700 dark:text-stone-300 font-semibold text-[11px] flex items-center gap-1 transition-colors cursor-pointer border border-stone-200/70 dark:border-stone-700"
                    >
                      <SlidersHorizontal className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                      <span>Feature Photos</span>
                    </button>

                    {/* Play / Pause Slideshow */}
                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                      className="p-1.5 rounded-md text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>

                    {/* Previous / Next buttons */}
                    <button
                      type="button"
                      onClick={handlePrev}
                      title="Previous photo"
                      className="p-1.5 rounded-md text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={handleNext}
                      title="Next photo"
                      className="p-1.5 rounded-md text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Main Focal Photo Frame with Built-in Resizing & Framing Controls */}
                <div className="relative mt-3 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700 cursor-pointer shadow-inner">
                  <PortfolioImage
                    fileName={currentFileName}
                    alt={currentMeta.title}
                    title={currentMeta.title}
                    category={currentMeta.category}
                    aspectRatioClass="aspect-[4/3] sm:aspect-[16/11]"
                    priority={true}
                    defaultFit={
                      ['Trophies.jpeg', 'Headboy image.jpeg', 'WhatsApp Image 2026-10-07 at 8.49.04 AM.jpeg', 'with Nadir Godrej.jpeg'].includes(currentFileName)
                        ? 'contain'
                        : 'cover'
                    }
                    onClick={() => onOpenPhoto(currentFileName, currentMeta.title, currentMeta.category)}
                  />

                  {/* Arrow Overlays on Hover */}
                  {featuredPhotos.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-md"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-md"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>

                {/* Caption & Metadata Bar */}
                <div className="pt-3 pb-1 flex items-start justify-between gap-3">
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-stone-950 dark:text-stone-100 truncate">
                      {currentMeta.title}
                    </p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 truncate font-mono">
                      {currentMeta.category || 'Featured'} · {currentFileName}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => onOpenPhoto(currentFileName, currentMeta.title, currentMeta.category)}
                      className="text-[11px] font-semibold text-[#8B1E28] dark:text-[#E11D48] hover:underline whitespace-nowrap cursor-pointer"
                    >
                      Expand
                    </button>
                  </div>
                </div>

                {/* Multi-Photo Filmstrip / Thumbnails Selector */}
                {featuredPhotos.length > 1 && (
                  <div className="mt-3 pt-3 border-t border-stone-100 dark:border-stone-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 dark:text-stone-500 font-bold">
                        Featured Strip ({featuredPhotos.length} Active)
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsManageModalOpen(true)}
                        className="text-[10px] text-amber-700 dark:text-amber-400 hover:underline font-semibold cursor-pointer"
                      >
                        + Manage Selection
                      </button>
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                      {featuredPhotos.map((file, fIdx) => {
                        const isActive = fIdx === currentIndex;
                        return (
                          <button
                            key={file}
                            type="button"
                            onClick={() => {
                              setCurrentIndex(fIdx);
                              setIsPlaying(false);
                            }}
                            className={`relative w-14 h-11 sm:w-16 sm:h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                              isActive
                                ? 'border-[#8B1E28] dark:border-[#E11D48] ring-2 ring-[#8B1E28]/20 dark:ring-[#E11D48]/30 scale-105 shadow-sm'
                                : 'border-stone-200 dark:border-stone-700 opacity-60 hover:opacity-100 hover:border-stone-400 dark:hover:border-stone-500'
                            }`}
                            title={`Switch to ${file}`}
                          >
                            <PortfolioImage
                              fileName={file}
                              alt={file}
                              aspectRatioClass="w-full h-full"
                              showZoomIcon={false}
                              showFitToggle={false}
                              allowScaleControl={false}
                              defaultFit="cover"
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Multiple Photos Modal */}
      <FeaturePhotosModal
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
      />
    </>
  );
};
