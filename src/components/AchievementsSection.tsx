import React, { useState } from 'react';
import {
  Trophy,
  Award,
  Star,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { achievementsList, personalInfo } from '../data/portfolioData';
import { PortfolioImage } from './PortfolioImage';

interface AchievementsSectionProps {
  isFullView?: boolean;
  onViewAll?: () => void;
  onOpenPhoto: (fileName: string, title: string) => void;
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
    <section id="achievements" className="py-16 md:py-22 border-t border-stone-200/80 dark:border-stone-800 bg-[#FAF9F5] dark:bg-[#121110] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8B1E28] dark:text-[#E11D48]">
              03 · Milestones & Honors
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-950 dark:text-stone-50 mt-1">
              Achievements
            </h2>
          </div>
          <p className="text-sm text-stone-500 dark:text-stone-400 max-w-md">
            Earned through sustained academic focus, student governance, sports competition, and MUN diplomacy.
          </p>
        </div>

        {/* Featured Trophy Shelf Showcase */}
        <div className="mb-12 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 p-6 sm:p-8 shadow-xs overflow-hidden transition-colors">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#8B1E28]/10 dark:bg-[#E11D48]/15 text-[#8B1E28] dark:text-[#E11D48] text-xs font-semibold">
                <Trophy className="w-3.5 h-3.5" />
                <span>Featured Achievement Showcase</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-950 dark:text-stone-50 tracking-tight">
                The "I Can & I Will" Shelf of Milestones
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                A physical testament to years of dedicated effort across disciplines: Saifi High School Head Boy memento, SSC Topper 1st Rank trophy, Shining Star, Bandra Carrom Doubles, Kho-Kho Best Player, and over 15 Olympiad and athletic medals.
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs font-medium text-stone-500 dark:text-stone-400">
                <span>· 15+ Medals & Cups</span>
                <span>· School & Junior College</span>
                <span>· Multi-Discipline</span>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="rounded-xl overflow-hidden border border-stone-200/90 dark:border-stone-700 shadow-sm bg-stone-50/90 dark:bg-stone-800/80 p-2">
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
          <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-stone-200/70 dark:border-stone-800">
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
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  filter === tab.id
                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 hover:bg-stone-200/70 dark:hover:bg-stone-700'
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
              className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Photo inside designated achievement card (e.g. Head Boy flag ceremony, NIE TOI, SBFL) */}
              {item.photoName && (
                <div className="border-b border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50 p-2">
                  <PortfolioImage
                    fileName={item.photoName}
                    alt={
                      item.photoAlt ||
                      `${item.title} - ${item.subtitle || ''} photograph of Taher Chitalwala for blind users`
                    }
                    title={item.title}
                    category={item.badge || 'Achievement Photo'}
                    aspectRatioClass="aspect-[16/11] bg-stone-100/50 dark:bg-stone-800/80 rounded-lg overflow-hidden"
                    defaultFit="contain"
                    onClick={() =>
                      onOpenPhoto(item.photoName!, `${item.title} — ${item.subtitle || ''}`)
                    }
                  />
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#8B1E28] dark:text-[#E11D48] font-bold">
                      {item.badge}
                    </span>
                    {item.year && (
                      <span className="text-[11px] font-mono text-stone-400 dark:text-stone-500">
                        {item.year}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-stone-950 dark:text-stone-50 leading-snug">
                    {item.title}
                  </h3>

                  {item.subtitle && (
                    <p className="text-xs font-medium text-stone-500 dark:text-stone-400 mt-1">
                      {item.subtitle}
                    </p>
                  )}

                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA on Home Page preview */}
        {!isFullView && onViewAll && (
          <div className="mt-12 text-center">
            <button
              onClick={onViewAll}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 text-xs font-bold hover:bg-stone-800 dark:hover:bg-white/90 transition-all shadow-sm cursor-pointer hover:-translate-y-0.5"
            >
              <span>View All Achievements & Awards ({achievementsList.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
