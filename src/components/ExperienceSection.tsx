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
    <section id="experience" className="py-20 md:py-28 border-t border-white/5 bg-[#060606] text-[#EBE7E1] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header: Work Experience */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C17F24] flex items-center gap-2">
              <span className="w-6 h-px bg-[#C17F24]/60" />
              04 · Professional & Volunteer Exposure
            </span>
            <h2 className="text-4xl sm:text-5xl font-display uppercase tracking-wider text-white mt-2">
              Work Experience
            </h2>
          </div>
          <p className="text-sm text-[#8E8880] max-w-md font-sans">
            Hands-on partner management, outreach, and conference coordination through the world's largest youth-run movement.
          </p>
        </div>

        {/* Main Experience Hero Card: IIMUN */}
        <div className="rounded-2xl bg-[#121110] border border-white/10 p-6 sm:p-10 shadow-2xl mb-14 transition-colors">
          <div className="flex flex-wrap items-baseline justify-between gap-3 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#C17F24] font-bold">
                {experienceData.badge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-wide text-white mt-1">
                {experienceData.role} · {experienceData.department}
              </h3>
              <p className="text-sm font-semibold text-[#8E8880] mt-0.5">
                {experienceData.organization}
              </p>
            </div>
            <span className="text-xs font-mono font-semibold px-3 py-1 rounded-md bg-[#181716] text-[#C17F24] border border-[#C17F24]/30">
              {experienceData.period}
            </span>
          </div>

          <p className="text-sm sm:text-base text-[#DCD7CE] leading-relaxed mt-6">
            {experienceData.description}
          </p>

          {/* Responsibilities Grid */}
          <div className="mt-8">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#8E8880] mb-4">
              Core Responsibilities & Workflow
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {experienceData.responsibilities.map((resp, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#161616] border border-white/5 text-xs sm:text-sm text-[#DCD7CE]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#C17F24] shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Accomplishments Metric Callout */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-[#0b0b0b] text-[#EBE7E1] border border-[#C17F24]/30 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-2xl">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#8E8880] font-mono">
                Conferences & Alliances
              </span>
              <p className="text-4xl sm:text-5xl font-display text-[#E09830] mt-1 tabular-nums">
                {experienceData.keyAccomplishments.partnersCount}
              </p>
              <p className="text-xs text-[#8E8880] mt-1">
                Partners onboarded across multiple city conferences
              </p>
            </div>

            <div className="md:col-span-2 space-y-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#C17F24] font-mono">
                  Conference Cities
                </span>
                <p className="text-xs sm:text-sm text-[#DCD7CE] mt-1">
                  Surat, Amritsar, Sri Vijaya Puram (Port Blair), Mysore, and others.
                </p>
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-[#C17F24] font-mono">
                  Chief Guests Invited & Coordinated
                </span>
                <p className="text-xs sm:text-sm text-[#DCD7CE] mt-1">
                  President of the Opposition Party of Gujarat, Sitting Chairperson of the Municipal Council of Sri Vijaya Puram, along with notable civil and business leaders.
                </p>
              </div>
            </div>
          </div>

          {/* Dignitary Interactions Spotlight */}
          <div className="mt-10 pt-8 border-t border-white/10">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C17F24]">
                Exposure & Perspective
              </span>
              <h4 className="text-xl font-display uppercase tracking-wide text-white mt-1">
                Learnings from Notable Interactions
              </h4>
              <p className="text-xs sm:text-sm text-[#8E8880] mt-1 max-w-2xl">
                Through my role at IIMUN, I have had the privilege to meet and listen to accomplished leaders across governance, industry, arts, and philanthropy. The greatest value has been observing how they articulate ideas, conduct themselves with humility, and think about long-term impact.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {experienceData.interactions.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#161616] border border-white/5 hover:border-[#C17F24]/40 hover:bg-[#1a1a1a] transition-all"
                >
                  <p className="text-xs font-bold text-white">
                    {item.name}
                  </p>
                  <p className="text-[11px] text-[#8E8880] mt-0.5 leading-snug">
                    {item.context}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Beyond the Internship Section */}
        <div className="mt-14">
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C17F24] font-bold">
              Leadership in Campus & School
            </span>
            <h3 className="text-3xl sm:text-4xl font-display uppercase tracking-wider text-white mt-1">
              Beyond the Internship
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schoolCollegeExperience.map((exp, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-[#121110] border border-white/10 shadow-lg flex flex-col justify-between transition-colors hover:border-[#C17F24]/30"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#C17F24] font-semibold">
                      {exp.category}
                    </span>
                    <span className="text-xs font-mono text-[#8E8880]">
                      {exp.period}
                    </span>
                  </div>

                  <h4 className="text-xl font-display uppercase tracking-wide text-white">
                    {exp.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#A09A92] mt-3 leading-relaxed">
                    {exp.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-2">
                  {exp.takeaways.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-medium text-[#8E8880]"
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
          <div className="mt-14 text-center">
            <a
              href="/experience"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  onViewAll();
                }
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#C17F24] hover:bg-[#E09830] text-[#060606] font-display text-sm tracking-widest uppercase transition-all shadow-lg shadow-[#C17F24]/20 cursor-pointer hover:-translate-y-0.5 font-bold"
            >
              <span>View Full Experience & Accomplishments</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
