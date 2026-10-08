import React from 'react';
import { Calendar, GraduationCap, Award, CheckCircle2 } from 'lucide-react';
import { educationList } from '../data/portfolioData';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-16 md:py-22 border-t border-stone-200/80 dark:border-stone-800 bg-[#FAF9F5] dark:bg-[#121110] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8B1E28] dark:text-[#E11D48]">
              02 · Academic Foundation
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-950 dark:text-stone-50 mt-1">
              Education Timeline
            </h2>
          </div>
          <p className="text-sm text-stone-500 dark:text-stone-400 max-w-md">
            Disciplined academic milestones from school leadership to digital business degree studies in Mumbai.
          </p>
        </div>

        {/* Timeline Cards */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-stone-200/90 dark:border-stone-800 space-y-10 max-w-4xl">
          {educationList.map((edu) => (
            <div key={edu.id} className="relative group">
              {/* Timeline marker */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-stone-900 border-2 border-stone-900 dark:border-stone-100 group-hover:border-[#8B1E28] dark:group-hover:border-[#E11D48] transition-colors" />

              <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#8B1E28] dark:text-[#E11D48]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{edu.period}</span>
                  </div>
                  {edu.score && (
                    <span className="text-xs font-mono font-bold text-stone-900 dark:text-stone-100 bg-stone-100 dark:bg-stone-800 px-2.5 py-1 rounded border border-stone-200/70 dark:border-stone-700">
                      Score: {edu.score}
                    </span>
                  )}
                  {edu.grade && !edu.score && (
                    <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-200/60 dark:border-emerald-800/60">
                      {edu.grade}
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-stone-950 dark:text-stone-50">
                  {edu.institution}
                </h3>
                <p className="text-sm font-medium text-stone-600 dark:text-stone-400 mt-1">
                  {edu.degree}
                </p>

                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800 space-y-2">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                        <CheckCircle2 className="w-4 h-4 text-[#8B1E28] dark:text-[#E11D48] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {edu.note && (
                  <p className="mt-3 text-xs text-stone-400 dark:text-stone-500 italic">
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
