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
  onOpenPhoto: (fileName: string, title: string, category?: string, source?: string) => void;
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
    <section className="relative pt-24 pb-14 md:pt-32 md:pb-20 overflow-hidden bg-[#060606] border-b border-white/[0.07] transition-colors duration-300">
      {/* Modern ambient visual background */}
      <div className="absolute top-0 right-1/4 w-[36rem] h-[36rem] bg-[#C17F24]/[0.05] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#C17F24]/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#1c1c1c_1px,transparent_1px)] [background-size:28px_28px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Expansive 5:7 column split to eliminate empty whitespace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Expressive Personal Narrative (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Location & Status Line */}
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141414] border border-white/10 text-stone-300 text-xs font-mono tracking-wide shadow-xs">
                <MapPin className="w-3.5 h-3.5 text-[#C17F24]" />
                <span>{personalInfo.location}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16120D] border border-[#C17F24]/30 text-[#C17F24] text-xs font-mono tracking-wide">
                <Sparkles className="w-3 h-3 text-[#C17F24]" />
                <span>Official Portfolio</span>
              </span>
            </div>

            {/* Main Name in Classy Bebas Neue Display */}
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl tracking-[0.03em] text-[#EBE7E1] uppercase leading-[0.88] font-normal text-balance">
              {personalInfo.fullName}
            </h1>

            {/* Tagline Banner - John Abraham Style Classy Serif Motto */}
            <div className="mt-4 mb-6 inline-flex items-start gap-3">
              <span className="h-8 w-1 bg-[#C17F24] rounded-full shrink-0 mt-1 shadow-[0_0_10px_rgba(193,127,36,0.8)]" />
              <p className="font-serif italic text-2xl sm:text-3xl text-[#C17F24] tracking-[0.01em] font-light leading-snug">
                “{personalInfo.tagline}”
              </p>
            </div>

            {/* Authentic Intro Narrative */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#121110] border border-white/10 shadow-xl mb-6 relative overflow-hidden transition-colors">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#C17F24]" />
              <p className="text-base sm:text-lg text-[#DCD7CE] leading-relaxed font-light">
                {personalInfo.introduction}
              </p>
            </div>

            {/* Quick Journey Navigation Strip */}
            <div className="mb-7">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8E8880] font-bold">
                  Journey Chapters
                </span>
                <span className="text-[11px] font-mono text-stone-500">
                  Click to jump
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {journeyPillars.map((pillar) => (
                  <button
                    key={pillar.id}
                    onClick={() => handleScrollTo(pillar.id)}
                    className="px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-[#C17F24] hover:text-[#060606] text-[#8E8880] hover:border-[#C17F24] text-xs font-semibold border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs hover:-translate-y-0.5 tracking-wider uppercase"
                  >
                    <span className="text-[10px] font-mono text-[#C17F24] group-hover:text-[#060606]">
                      {pillar.code}
                    </span>
                    <span>{pillar.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  onExplore();
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#C17F24] hover:bg-[#E09830] text-[#060606] text-xs font-bold transition-all shadow-[0_0_20px_rgba(193,127,36,0.25)] group cursor-pointer hover:-translate-y-0.5 tracking-wider uppercase font-mono"
              >
                <span>Explore My Journey</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#060606] group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="/contact"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    onConnect();
                  }
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#141414] hover:bg-[#1C1C1C] text-[#EBE7E1] text-xs font-bold border border-white/10 hover:border-[#C17F24]/50 transition-all shadow-xs cursor-pointer hover:-translate-y-0.5 tracking-wider uppercase font-mono"
              >
                <span>Let's Connect</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#C17F24]" />
              </a>
            </div>
          </div>

          {/* Right Column: TOP SHOWCASE WITH VISITOR OPTIONS ("that's it") */}
          <div className="lg:col-span-7 w-full">
            <div className="relative w-full bg-[#121110] rounded-2xl border border-white/10 shadow-2xl overflow-hidden p-4 sm:p-5 backdrop-blur-xs transition-colors">
              {/* Header Bar with Visitor Options */}
              <div className="flex flex-wrap items-center justify-between pb-3.5 border-b border-white/[0.08] text-xs gap-3">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 font-bold text-[#EBE7E1]">
                    <Star className="w-4 h-4 text-[#C17F24] fill-[#C17F24]" />
                    <span className="text-sm font-display tracking-wider uppercase">Top Showcase</span>
                  </span>
                  <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-[#181512] text-[#C17F24] border border-[#C17F24]/30 font-semibold">
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
                    className="p-1.5 rounded-md text-stone-400 hover:text-[#C17F24] hover:bg-[#1A1A1A] transition-colors cursor-pointer border border-transparent hover:border-white/10"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  {/* Previous / Next buttons */}
                  <button
                    type="button"
                    onClick={handlePrev}
                    title="Previous photo"
                    aria-label="Previous photo in showcase"
                    className="p-1.5 rounded-md text-stone-400 hover:text-[#C17F24] hover:bg-[#1A1A1A] transition-colors cursor-pointer border border-transparent hover:border-white/10"
                  >
                    <ChevronLeft className="w-4.5 h-4.5" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    title="Next photo"
                    aria-label="Next photo in showcase"
                    className="p-1.5 rounded-md text-stone-400 hover:text-[#C17F24] hover:bg-[#1A1A1A] transition-colors cursor-pointer border border-transparent hover:border-white/10"
                  >
                    <ChevronRight className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>

              {/* Showcase Photo Frame */}
              <div
                className="relative mt-3.5 rounded-xl overflow-hidden bg-[#0A0908] border border-white/10 cursor-pointer shadow-inner transition-all duration-300 scale-100"
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
                  onClick={() => onOpenPhoto(currentFileName, currentMeta.title, 'Top Showcase', 'showcase')}
                />

                {/* Arrow Overlays on Hover */}
                {featuredPhotos.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#060606]/80 hover:bg-[#C17F24] text-white hover:text-[#060606] opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-lg border border-white/10"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#060606]/80 hover:bg-[#C17F24] text-white hover:text-[#060606] opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-lg border border-white/10"
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
                  <p className="text-sm font-bold text-[#EBE7E1] truncate font-display tracking-wide">
                    {currentMeta.title}
                  </p>
                  <p className="text-xs text-[#8E8880] mt-0.5 truncate font-mono">
                    {currentMeta.category || 'Featured'} · {currentFileName}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => onOpenPhoto(currentFileName, currentMeta.title, 'Top Showcase', 'showcase')}
                    className="text-xs font-semibold text-[#C17F24] hover:text-[#E09830] hover:underline whitespace-nowrap cursor-pointer tracking-wider uppercase font-mono"
                    aria-label={`View photo ${currentMeta.title}`}
                  >
                    View Photo
                  </button>
                </div>
              </div>

              {/* Multi-Photo Filmstrip with 4 Featured Photos */}
              <div className="mt-3.5 pt-3.5 border-t border-white/[0.08]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 font-bold">
                    Featured Highlights (4 Milestones)
                  </span>
                  <span className="text-[11px] font-mono text-stone-500">
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
                            ? 'border-[#C17F24] ring-2 ring-[#C17F24]/30 scale-[1.02] shadow-[0_0_12px_rgba(193,127,36,0.3)]'
                            : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
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
