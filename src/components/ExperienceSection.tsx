import React from 'react';
import {
  Briefcase,
  Users,
  CheckCircle2,
  Building2,
  Sparkles,
  ArrowRight,
  Handshake,
  GraduationCap,
  Camera,
} from 'lucide-react';
import { experienceData, schoolCollegeExperience } from '../data/portfolioData';

interface ExperienceSectionProps {
  isFullView?: boolean;
  onViewAll?: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  isFullView = false,
  onViewAll,
}) => {
  return (
    <section id="experience" className="py-16 md:py-22 border-t border-stone-200/80 dark:border-stone-800 bg-gradient-to-b from-[#FAF9F5] via-[#F7F4EB] to-[#FAF9F5] dark:from-[#121110] dark:via-[#161513] dark:to-[#121110] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header: Work Experience */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8B1E28] dark:text-[#E11D48]">
              04 · Professional & Volunteer Exposure
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-950 dark:text-stone-50 mt-1">
              Work Experience
            </h2>
          </div>
          <p className="text-sm text-stone-500 dark:text-stone-400 max-w-md">
            Hands-on partner management, outreach, and conference coordination through the world's largest youth-run movement.
          </p>
        </div>

        {/* Main Experience Hero Card: IIMUN */}
        <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 p-6 sm:p-10 shadow-xs mb-12 transition-colors">
          <div className="flex flex-wrap items-baseline justify-between gap-3 pb-6 border-b border-stone-100 dark:border-stone-800">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#8B1E28] dark:text-[#E11D48] font-bold">
                {experienceData.badge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-950 dark:text-stone-50 mt-1">
                {experienceData.role} · {experienceData.department}
              </h3>
              <p className="text-sm font-semibold text-stone-600 dark:text-stone-400 mt-0.5">
                {experienceData.organization}
              </p>
            </div>
            <span className="text-xs font-mono font-semibold px-3 py-1 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200/70 dark:border-stone-700">
              {experienceData.period}
            </span>
          </div>

          <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed mt-6">
            {experienceData.description}
          </p>

          {/* Responsibilities Grid */}
          <div className="mt-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-4">
              Core Responsibilities & Workflow
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {experienceData.responsibilities.map((resp, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50/70 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 text-xs sm:text-sm text-stone-700 dark:text-stone-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#8B1E28] dark:text-[#E11D48] shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Accomplishments Metric Callout */}
          <div className="mt-10 p-6 sm:p-7 rounded-2xl bg-stone-900 dark:bg-stone-950 text-stone-100 border border-stone-800 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-md">
            <div>
              <span className="text-xs uppercase tracking-wider text-stone-400 font-mono">
                Conferences & Alliances
              </span>
              <p className="text-3xl sm:text-4xl font-extrabold text-white mt-1 tabular-nums">
                {experienceData.keyAccomplishments.partnersCount}
              </p>
              <p className="text-xs text-stone-300 mt-1">
                Partners onboarded across multiple city conferences
              </p>
            </div>

            <div className="md:col-span-2 space-y-3">
              <div>
                <span className="text-xs uppercase tracking-wider text-stone-400 font-mono">
                  Conference Cities
                </span>
                <p className="text-xs sm:text-sm text-stone-200 mt-1">
                  Surat, Amritsar, Sri Vijaya Puram (Port Blair), Mysore, and others.
                </p>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-stone-400 font-mono">
                  Chief Guests Invited & Coordinated
                </span>
                <p className="text-xs sm:text-sm text-stone-200 mt-1">
                  President of the Opposition Party of Gujarat, Sitting Chairperson of the Municipal Council of Sri Vijaya Puram, along with notable civil and business leaders.
                </p>
              </div>
            </div>
          </div>

          {/* Dignitary Interactions Spotlight */}
          <div className="mt-10 pt-8 border-t border-stone-100 dark:border-stone-800">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                Exposure & Perspective
              </span>
              <h4 className="text-lg font-bold text-stone-950 dark:text-stone-100 mt-1">
                Learnings from Notable Interactions
              </h4>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1 max-w-2xl">
                Through my role at IIMUN, I have had the privilege to meet and listen to accomplished leaders across governance, industry, arts, and philanthropy. The greatest value has been observing how they articulate ideas, conduct themselves with humility, and think about long-term impact.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {experienceData.interactions.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 hover:bg-white dark:hover:bg-stone-800 transition-all"
                >
                  <p className="text-xs font-bold text-stone-900 dark:text-stone-100">
                    {item.name}
                  </p>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 leading-snug">
                    {item.context}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Beyond the Internship Section */}
        <div className="mt-12">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B1E28] dark:text-[#E11D48]">
              Leadership in Campus & School
            </span>
            <h3 className="text-2xl font-bold text-stone-950 dark:text-stone-50 mt-1">
              Beyond the Internship
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schoolCollegeExperience.map((exp, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-xs flex flex-col justify-between transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold text-[#8B1E28] dark:text-[#E11D48]">
                      {exp.category}
                    </span>
                    <span className="text-xs font-mono text-stone-400 dark:text-stone-500">
                      {exp.period}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-stone-950 dark:text-stone-100">
                    {exp.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-3 leading-relaxed">
                    {exp.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex flex-wrap gap-2">
                  {exp.takeaways.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-medium text-stone-500 dark:text-stone-400"
                    >
                      · {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View Experience button for Home preview */}
        {!isFullView && onViewAll && (
          <div className="mt-12 text-center">
            <button
              onClick={onViewAll}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 text-xs font-bold hover:bg-stone-800 dark:hover:bg-white/90 transition-all shadow-sm cursor-pointer hover:-translate-y-0.5"
            >
              <span>View Full Experience & Accomplishments</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
