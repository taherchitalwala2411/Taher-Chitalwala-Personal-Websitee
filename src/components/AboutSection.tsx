import React from 'react';
import {
  ArrowRight,
  MapPin,
  Calendar,
  Building,
  Quote,
  Sparkles,
  TrendingUp,
  Award,
  GraduationCap,
} from 'lucide-react';
import { personalInfo, aboutMeNarrative } from '../data/portfolioData';

interface AboutSectionProps {
  isFullView?: boolean;
  onReadMore?: () => void;
  onOpenPhoto?: (fileName: string, title: string, category?: string, source?: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  isFullView = false,
  onReadMore,
}) => {
  return (
    <section id="about" className="py-16 md:py-22 border-t border-stone-200/80 dark:border-stone-800 bg-gradient-to-b from-[#FAF9F5] via-[#F7F4EB] to-[#FAF9F5] dark:from-[#121110] dark:via-[#161513] dark:to-[#121110] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 pb-6 border-b border-stone-200/80 dark:border-stone-800">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8B1E28] dark:text-[#E11D48]">
              01 · The Personal Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-950 dark:text-stone-50 mt-1">
              About Me
            </h2>
          </div>
          <div className="flex items-center gap-3 text-xs text-stone-600 dark:text-stone-400 font-mono">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#E11D48]" />
              <span>South Mumbai</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-stone-400 dark:text-stone-500" />
              <span>24 November 2007</span>
            </span>
          </div>
        </div>

        {/* Catchy Editorial Layout: Narrative + Pillars & Standards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Main Story Narrative (60% width) */}
          <div className="lg:col-span-7 space-y-5 text-stone-700 dark:text-stone-300 leading-relaxed text-base sm:text-lg">
            {isFullView ? (
              // Full detailed narrative
              aboutMeNarrative.map((item, idx) => (
                <p key={idx} className="leading-relaxed">
                  {item.paragraph}
                </p>
              ))
            ) : (
              // Preview narrative
              <>
                <p className="leading-relaxed text-stone-900 dark:text-stone-100 font-medium">
                  {aboutMeNarrative[0].paragraph}
                </p>
                <p className="leading-relaxed">
                  {aboutMeNarrative[1].paragraph}
                </p>
                <p className="leading-relaxed">
                  {aboutMeNarrative[2].paragraph}
                </p>
                <p className="leading-relaxed">
                  {aboutMeNarrative[3].paragraph}
                </p>
                <p className="leading-relaxed">
                  {aboutMeNarrative[4].paragraph}
                </p>

                {/* Editorial Pull Quote */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white/95 dark:bg-stone-900/90 border border-stone-200/90 dark:border-stone-800 shadow-sm relative my-5 transition-colors">
                  <Quote className="w-7 h-7 text-[#8B1E28]/15 dark:text-[#E11D48]/25 absolute top-3 right-4" />
                  <p className="text-sm sm:text-base font-serif italic text-stone-900 dark:text-stone-100 leading-relaxed pr-6">
                    “{aboutMeNarrative[5].paragraph}”
                  </p>
                </div>

                {onReadMore && (
                  <div className="pt-2">
                    <button
                      onClick={onReadMore}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 text-xs font-bold hover:bg-stone-800 dark:hover:bg-white/90 transition-all shadow-sm cursor-pointer hover:-translate-y-0.5"
                    >
                      <span>Read Complete Story</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </>
            )}

            {isFullView && (
              <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-stone-900 dark:bg-stone-950 text-stone-100 border border-stone-800 space-y-3 shadow-md">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Guiding Philosophy</span>
                </span>
                <p className="text-xl sm:text-2xl font-serif italic text-white">
                  “Be the best, beat the best.”
                </p>
                <p className="text-xs text-stone-300 leading-relaxed pt-1">
                  A personal standard to never settle for complacency, to embrace challenges with humility, and to strive for constant progress each day.
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Editorial Journey Spotlight & Ambition Pillars */}
          <div className="lg:col-span-5 space-y-4">
            {/* Guiding Philosophy Hero Box */}
            <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-stone-900 to-stone-950 text-stone-100 border border-stone-800 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B1E28]/20 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Personal Creed</span>
                </span>
                <h3 className="text-2xl font-serif italic text-white leading-tight">
                  “Be the best, beat the best.”
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed mt-3">
                  Not about arrogance, but an unwavering personal standard to hold myself accountable, outgrow my limits, and give my 100% every single day.
                </p>
              </div>
            </div>

            {/* Background & Values Card */}
            <div className="bg-white/95 dark:bg-stone-900/90 rounded-2xl border border-stone-200/90 dark:border-stone-800 shadow-md p-5 space-y-3.5 backdrop-blur-xs transition-colors">
              <span className="text-xs font-mono uppercase tracking-wider text-stone-400 dark:text-stone-500 font-bold block">
                Foundations & Milestones
              </span>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-stone-50/90 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-stone-200/70 dark:bg-stone-700/70 text-[#8B1E28] dark:text-[#E11D48] shrink-0 mt-0.5">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-900 dark:text-stone-100">
                      Academic Rigor & Leadership
                    </p>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-0.5 leading-snug">
                      Saifi High School Head Boy & SSC Topper (92.4%), K.C. College HSC (89.67%), and currently Second Year BBA in Digital Business.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-50/90 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-stone-200/70 dark:bg-stone-700/70 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-900 dark:text-stone-100">
                      Family Enterprise & New Ventures
                    </p>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-0.5 leading-snug">
                      Committed to scaling his father's sanitary ware enterprise while exploring new ventures in digital business and real estate properties.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-50/90 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-stone-200/70 dark:bg-stone-700/70 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-900 dark:text-stone-100">
                      Continuous Growth Mindset
                    </p>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-0.5 leading-snug">
                      Exploring what I am capable of every single day, balancing curiosity, humility, and relentless ambition.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
