import React from 'react';
import { Calendar, GraduationCap, Award, CheckCircle2 } from 'lucide-react';
import { educationList } from '../data/portfolioData';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-16 md:py-24 border-t border-white/[0.07] bg-[#060606] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#C17F24]">
              02 · Academic Foundation
            </span>
            <h2 className="font-display text-4xl sm:text-5xl tracking-[0.04em] uppercase text-[#EBE7E1] mt-2 font-normal">
              Education Timeline
            </h2>
          </div>
          <p className="text-sm text-[#8E8880] max-w-md font-light">
            Disciplined academic milestones from school leadership to digital business degree studies in Mumbai.
          </p>
        </div>

        {/* Timeline Cards */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-[#C17F24]/30 space-y-10 max-w-4xl">
          {educationList.map((edu) => (
            <div key={edu.id} className="relative group">
              {/* Timeline marker */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#060606] border-2 border-[#C17F24] group-hover:bg-[#C17F24] group-hover:shadow-[0_0_12px_rgba(193,127,36,0.8)] transition-all" />

              <div className="p-6 sm:p-8 rounded-2xl bg-[#121110] border border-white/10 hover:border-[#C17F24]/40 shadow-xl transition-all">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#C17F24] font-mono tracking-wider">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{edu.period}</span>
                  </div>
                  {edu.score && (
                    <span className="text-xs font-mono font-bold text-[#C17F24] bg-[#181512] px-2.5 py-1 rounded border border-[#C17F24]/30">
                      Score: {edu.score}
                    </span>
                  )}
                  {edu.grade && !edu.score && (
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-800/60 font-mono">
                      {edu.grade}
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-display tracking-wide uppercase text-[#EBE7E1] font-normal">
                  {edu.institution}
                </h3>
                <p className="text-sm font-medium text-[#8E8880] mt-1">
                  {edu.degree}
                </p>

                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="mt-4 pt-4 border-t border-white/[0.08] space-y-2">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#DCD7CE] font-light">
                        <CheckCircle2 className="w-4 h-4 text-[#C17F24] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {edu.note && (
                  <p className="mt-3 text-xs text-stone-500 italic font-serif">
                    Note: {edu.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
