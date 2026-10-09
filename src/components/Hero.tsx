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
} from 'lucide-react';
import { personalInfo, galleryPhotos, defaultTopPhotos } from '../data/portfolioData';
import { PortfolioImage } from './PortfolioImage';

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
  // Exactly the 4 photos specified by the user
  const featuredPhotos = defaultTopPhotos;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

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
    title: 'Featured Milestone Highlight',
    category: 'Featured Highlight',
    description: '',
    altText: 'Featured photograph of Taher Chitalwala for blind users',
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
    <section className="relative pt-24 pb-14 md:pt-32 md:pb-18 overflow-hidden bg-gradient-to-b from-[#F6F3EB] via-[#FAF9F5] to-[#FAF9F5] dark:from-[#161513] dark:via-[#121110] dark:to-[#121110] border-b border-stone-200/70 dark:border-stone-800 transition-colors duration-300">
      {/* Modern ambient visual background */}
      <div className="absolute top-0 right-1/4 w-[32rem] h-[32rem] bg-[#8B1E28]/[0.035] dark:bg-[#8B1E28]/[0.07] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-amber-500/[0.03] dark:bg-amber-500/[0.05] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#d6d3d1_1px,transparent_1px)] dark:bg-[radial-gradient(#292524_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Expansive 5:7 column split to eliminate empty whitespace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Expressive Personal Narrative (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Location Badge */}
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
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-stone-950 dark:text-stone-50 uppercase leading-[1.05] text-balance">
              {personalInfo.fullName}
            </h1>

            {/* Tagline Banner */}
            <div className="mt-3.5 mb-5 inline-flex items-center gap-2.5">
              <span className="h-7 w-1 bg-[#8B1E28] dark:bg-[#E11D48] rounded-full shrink-0" />
              <p className="text-xl sm:text-2xl font-serif italic text-[#8B1E28] dark:text-[#E11D48] tracking-tight">
                “{personalInfo.tagline}”
              </p>
            </div>

            {/* Authentic Intro */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border border-stone-200/90 dark:border-stone-800 shadow-sm mb-6 relative overflow-hidden transition-colors">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#8B1E28]/40 dark:bg-[#E11D48]/50" />
              <p className="text-base sm:text-lg text-stone-800 dark:text-stone-200 leading-relaxed font-normal">
                {personalInfo.introduction}
              </p>
            </div>

            {/* Quick Journey Navigation Strip */}
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

          {/* Right Column: TOP SHOWCASE WITH VISITOR OPTIONS ("that's it") */}
          <div className="lg:col-span-7 w-full">
            <div className="relative w-full bg-white/95 dark:bg-stone-900/95 rounded-2xl border border-stone-200/90 dark:border-stone-800 shadow-xl overflow-hidden p-4 sm:p-5 backdrop-blur-xs transition-colors">
              {/* Header Bar with Visitor Options: Small Frame or Full Frame */}
              <div className="flex flex-wrap items-center justify-between pb-3.5 border-b border-stone-100 dark:border-stone-800 text-xs gap-3">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 font-bold text-stone-900 dark:text-stone-100">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm">Top Showcase</span>
                  </span>
                  <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60 font-semibold">
                    {currentIndex + 1} / {featuredPhotos.length}
                  </span>
                </div>

                {/* Controls: Slideshow Play/Pause and Next/Previous navigation */}
                <div className="flex items-center gap-1.5">
                  {/* Play / Pause Slideshow */}
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                    aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                    className="p-1 rounded-md text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  {/* Previous / Next buttons */}
                  <button
                    type="button"
                    onClick={handlePrev}
                    title="Previous photo"
                    aria-label="Previous photo in showcase"
                    className="p-1 rounded-md text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4.5 h-4.5" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    title="Next photo"
                    aria-label="Next photo in showcase"
                    className="p-1 rounded-md text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>

              {/* Showcase Photo Frame */}
              <div
                className="relative mt-3.5 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700 cursor-pointer shadow-inner transition-all duration-300 scale-100"
              >
                <PortfolioImage
                  fileName={currentFileName}
                  alt={
                    currentMeta.altText ||
                    `${currentMeta.title} - Photograph of Taher Chitalwala for blind users`
                  }
                  title={currentMeta.title}
                  category={currentMeta.category}
                  aspectRatioClass="aspect-[16/10] min-h-[380px] sm:min-h-[460px] md:min-h-[490px] w-full"
                  priority={true}
                  defaultFit="contain"
                  showFitControls={false}
                  onClick={() => onOpenPhoto(currentFileName, currentMeta.title, currentMeta.category)}
                />

                {/* Arrow Overlays on Hover */}
                {featuredPhotos.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-md"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-md"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Caption Bar */}
              <div className="pt-3.5 pb-1 flex items-start justify-between gap-3">
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-stone-950 dark:text-stone-50 truncate">
                    {currentMeta.title}
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 truncate font-mono">
                    {currentMeta.category || 'Featured'} · {currentFileName}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => onOpenPhoto(currentFileName, currentMeta.title, currentMeta.category)}
                    className="text-xs font-semibold text-[#8B1E28] dark:text-[#E11D48] hover:underline whitespace-nowrap cursor-pointer"
                    aria-label={`View photo ${currentMeta.title}`}
                  >
                    View Photo
                  </button>
                </div>
              </div>

              {/* Multi-Photo Filmstrip with 4 Featured Photos */}
              <div className="mt-3.5 pt-3.5 border-t border-stone-100 dark:border-stone-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 dark:text-stone-500 font-bold">
                    Featured Highlights (4 Milestones)
                  </span>
                  <span className="text-[11px] font-mono text-stone-400 dark:text-stone-500">
                    Flag Ceremony · Air Force · NIE TOI · Shelf
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2.5">
                  {featuredPhotos.map((file, fIdx) => {
                    const isActive = fIdx === currentIndex;
                    const meta = galleryPhotos.find((p) => p.fileName === file);
                    const thumbnailAlt =
                      meta?.altText ||
                      meta?.title ||
                      `Thumbnail of ${file} for blind users`;

                    return (
                      <button
                        key={file}
                        type="button"
                        onClick={() => {
                          setCurrentIndex(fIdx);
                          setIsPlaying(false);
                        }}
                        aria-label={`Select photo ${fIdx + 1}: ${meta?.title || file}`}
                        className={`relative aspect-[16/11] rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                          isActive
                            ? 'border-[#8B1E28] dark:border-[#E11D48] ring-2 ring-[#8B1E28]/20 dark:ring-[#E11D48]/30 scale-[1.02] shadow-sm'
                            : 'border-stone-200 dark:border-stone-700 opacity-60 hover:opacity-100 hover:border-stone-400 dark:hover:border-stone-500'
                        }`}
                        title={meta?.title || file}
                      >
                        <PortfolioImage
                          fileName={file}
                          alt={thumbnailAlt}
                          aspectRatioClass="w-full h-full"
                          defaultFit="cover"
                          showFitControls={false}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
