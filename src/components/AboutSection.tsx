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
    <section id="about" className="py-16 md:py-24 border-t border-white/[0.07] bg-[#060606] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#C17F24]">
              01 · The Personal Journey
            </span>
            <h2 className="font-display text-4xl sm:text-5xl tracking-[0.04em] uppercase text-[#EBE7E1] mt-2 font-normal">
              About Me
            </h2>
          </div>
          <div className="flex items-center gap-3 text-xs text-[#8E8880] font-mono tracking-wider uppercase">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C17F24]" />
              <span>South Mumbai</span>
            </span>
            <span className="text-[#C17F24]">·</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#8E8880]" />
              <span>24 November 2007</span>
            </span>
          </div>
        </div>

        {/* Catchy Editorial Layout: Narrative + Pillars & Standards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Main Story Narrative (60% width) */}
          <div className="lg:col-span-7 space-y-5 text-[#DCD7CE] leading-relaxed text-base sm:text-lg font-light">
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
                <p className="leading-relaxed text-[#EBE7E1] font-normal">
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
                <div className="p-6 sm:p-7 rounded-2xl bg-[#121110] border border-white/10 shadow-lg relative my-6 transition-colors">
                  <Quote className="w-8 h-8 text-[#C17F24]/30 absolute top-4 right-5" />
                  <p className="text-base sm:text-lg font-serif italic text-[#DCD7CE] leading-relaxed pr-6 font-light">
                    “{aboutMeNarrative[5].paragraph}”
                  </p>
                </div>

                {onReadMore && (
                  <div className="pt-2">
                    <a
                      href="/about"
                      onClick={(e) => {
                        if (!e.metaKey && !e.ctrlKey) {
                          e.preventDefault();
                          onReadMore();
                        }
                      }}
                      className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#C17F24] hover:bg-[#E09830] text-[#060606] text-xs font-bold transition-all shadow-[0_0_20px_rgba(193,127,36,0.25)] cursor-pointer hover:-translate-y-0.5 tracking-wider uppercase font-mono"
                    >
                      <span>Read Complete Story</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </>
            )}

            {isFullView && (
              <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-[#121110] text-[#EBE7E1] border border-[#C17F24]/30 space-y-3 shadow-xl">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C17F24] font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Guiding Philosophy</span>
                </span>
                <p className="text-2xl sm:text-3xl font-serif italic text-[#C17F24] font-light">
                  “Be the best so that you can beat the best.”
                </p>
                <p className="text-xs text-stone-400 leading-relaxed pt-1 font-light">
                  A personal standard to never settle for complacency, to embrace challenges with humility, and to strive for constant progress each day.
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Editorial Journey Spotlight & Ambition Pillars */}
          <div className="lg:col-span-5 space-y-4">
            {/* Guiding Philosophy Hero Box */}
            <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#16130F] to-[#0D0B08] text-[#EBE7E1] border border-[#C17F24]/35 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#C17F24]/15 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C17F24] font-bold flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Personal Creed</span>
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif italic text-[#C17F24] leading-tight font-light">
                  “Be the best so that you can beat the best.”
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed mt-3 font-light">
                  Not about arrogance, but an unwavering personal standard to hold myself accountable, outgrow my limits, and give my 100% every single day.
                </p>
              </div>
            </div>

            {/* Background & Values Card */}
            <div className="bg-[#121110] rounded-2xl border border-white/10 shadow-xl p-5 space-y-3.5 backdrop-blur-xs transition-colors">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#8E8880] font-bold block">
                Foundations & Milestones
              </span>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-[#181818] border border-white/5 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#201D18] text-[#C17F24] shrink-0 mt-0.5 border border-[#C17F24]/20">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#EBE7E1] tracking-wide">
                      Academic Rigor & Leadership
                    </p>
                    <p className="text-[11px] text-stone-400 mt-0.5 leading-snug font-light">
                      Saifi High School Head Boy & SSC Topper (92.4%), K.C. College HSC (89.67%), and currently Second Year BBA in Digital Business.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#181818] border border-white/5 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#201D18] text-[#C17F24] shrink-0 mt-0.5 border border-[#C17F24]/20">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#EBE7E1] tracking-wide">
                      Family Enterprise & New Ventures
                    </p>
                    <p className="text-[11px] text-stone-400 mt-0.5 leading-snug font-light">
                      Committed to scaling his father's sanitary ware enterprise while exploring new ventures in digital business and real estate properties.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#181818] border border-white/5 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#201D18] text-[#C17F24] shrink-0 mt-0.5 border border-[#C17F24]/20">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#EBE7E1] tracking-wide">
                      Continuous Growth Mindset
                    </p>
                    <p className="text-[11px] text-stone-400 mt-0.5 leading-snug font-light">
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
