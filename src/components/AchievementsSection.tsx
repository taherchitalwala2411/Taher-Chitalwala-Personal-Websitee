import React, { useState } from 'react';
import {
  Trophy,
  Award,
  Star,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Eye,
} from 'lucide-react';
import { achievementsList, personalInfo } from '../data/portfolioData';
import { PortfolioImage } from './PortfolioImage';

interface AchievementsSectionProps {
  isFullView?: boolean;
  onViewAll?: () => void;
  onOpenPhoto: (fileName: string, title: string, category?: string, source?: string) => void;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  isFullView = false,
  onViewAll,
  onOpenPhoto,
}) => {
  const [filter, setFilter] = useState<'all' | 'academic' | 'leadership' | 'sports' | 'extracurricular'>('all');

  const displayedAchievements = isFullView
    ? filter === 'all'
      ? achievementsList
      : achievementsList.filter((a) => a.category === filter)
    : achievementsList.slice(0, 5);

  return (
    <section id="achievements" className="py-20 md:py-28 border-t border-white/5 bg-[#060606] text-[#EBE7E1] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C17F24] flex items-center gap-2">
              <span className="w-6 h-px bg-[#C17F24]/60" />
              03 · Milestones & Honors
            </span>
            <h2 className="text-4xl sm:text-5xl font-display uppercase tracking-wider text-white mt-2">
              Achievements & Awards
            </h2>
          </div>
          <p className="text-sm text-[#8E8880] max-w-md font-sans">
            Earned through sustained academic focus, student governance, sports competition, and MUN diplomacy.
          </p>
        </div>

        {/* Featured Trophy Shelf Showcase */}
        <div className="mb-14 rounded-2xl bg-[#121110] border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden transition-colors">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#C17F24]/15 border border-[#C17F24]/30 text-[#E09830] text-xs font-semibold">
                <Trophy className="w-3.5 h-3.5" />
                <span>Featured Achievement Showcase</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-wide text-white">
                The "I Can & I Will" Shelf of Milestones
              </h3>
              <p className="text-sm text-[#8E8880] leading-relaxed">
                A physical testament to years of dedicated effort across disciplines: Saifi High School Head Boy memento, SSC Topper 1st Rank trophy, Shining Star, Bandra Carrom Doubles, Kho-Kho Best Player, and over 15 Olympiad and athletic medals.
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs font-medium text-[#8E8880]">
                <span className="text-[#C17F24]">· 15+ Medals & Cups</span>
                <span>· School & Junior College</span>
                <span>· Multi-Discipline</span>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg bg-[#161616] p-2">
                <PortfolioImage
                  fileName={personalInfo.trophiesPhoto}
                  alt="Trophy shelf inscribed with the motto I Can and I Will, displaying dozens of athletic medals, academic cups, Saifi High School Head Boy memento, and 1st Rank SSC Topper trophy for blind users."
                  title="The 'I Can & I Will' shelf with medals, trophies and academic mementos"
                  category="Achievements Showcase"
                  aspectRatioClass="aspect-[4/3] sm:aspect-[16/11] max-h-[440px] w-full"
                  defaultFit="contain"
                  onClick={() =>
                    onOpenPhoto(
                      personalInfo.trophiesPhoto,
                      'The "I Can & I Will" shelf with medals, trophies, and academic mementos'
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Filter controls if in full view */}
        {isFullView && (
          <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-white/10">
            {(
              [
                { id: 'all', label: 'All Milestones' },
                { id: 'academic', label: 'Academic' },
                { id: 'leadership', label: 'Leadership' },
                { id: 'sports', label: 'Sports & Athletics' },
                { id: 'extracurricular', label: 'Diplomacy & Others' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all cursor-pointer ${
                  filter === tab.id
                    ? 'bg-[#C17F24] text-[#060606] font-bold shadow-md shadow-[#C17F24]/20'
                    : 'bg-[#141414] text-[#8E8880] border border-white/5 hover:text-white hover:border-[#C17F24]/40 hover:bg-[#1a1a1a]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Achievements Grid with Head Boy Flag Ceremony and Permanent Photo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedAchievements.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-[#121110] border border-white/10 overflow-hidden shadow-lg hover:border-[#C17F24]/40 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Photo inside designated achievement card (e.g. Head Boy flag ceremony, NIE TOI, SBFL) */}
              {item.photoName && (
                <div className="border-b border-white/10 bg-[#161616] p-2">
                  <PortfolioImage
                    fileName={item.photoName}
                    alt={
                      item.photoAlt ||
                      `${item.title} - ${item.subtitle || ''} photograph of Taher Chitalwala for blind users`
                    }
                    title={item.title}
                    category={item.badge || 'Achievement Photo'}
                    aspectRatioClass="aspect-[16/11] bg-[#0c0c0c] rounded-lg overflow-hidden"
                    defaultFit="contain"
                    onClick={() =>
                      onOpenPhoto(
                        item.photoName!,
                        `${item.title} — ${item.subtitle || ''}`,
                        'Achievements',
                        'achievements'
                      )
                    }
                  />
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#C17F24] font-bold">
                      {item.badge}
                    </span>
                    {item.year && (
                      <span className="text-[11px] font-mono text-[#8E8880]">
                        {item.year}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#E09830] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {item.subtitle && (
                    <p className="text-xs font-serif italic text-[#8E8880] mt-1">
                      {item.subtitle}
                    </p>
                  )}

                  <p className="text-xs sm:text-sm text-[#A09A92] mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {item.photoName && (
                  <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#6A6560] truncate max-w-[150px]">
                      {item.photoName}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onOpenPhoto(
                          item.photoName!,
                          `${item.title} — ${item.subtitle || ''}`,
                          'Achievements',
                          'achievements'
                        )
                      }
                      className="text-[#C17F24] hover:text-[#E09830] text-xs font-semibold tracking-wide transition-colors flex items-center gap-1.5 cursor-pointer ml-auto"
                      aria-label={`View photo for ${item.title}`}
                    >
                      <span>View Photo</span>
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA on Home Page preview */}
        {!isFullView && onViewAll && (
          <div className="mt-14 text-center">
            <a
              href="/achievements"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  onViewAll();
                }
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#C17F24] hover:bg-[#E09830] text-[#060606] font-display text-sm tracking-widest uppercase transition-all shadow-lg shadow-[#C17F24]/20 cursor-pointer hover:-translate-y-0.5 font-bold"
            >
              <span>View All Achievements & Awards ({achievementsList.length})</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
