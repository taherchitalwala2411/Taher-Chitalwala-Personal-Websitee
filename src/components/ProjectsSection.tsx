import React, { useState } from 'react';
import {
  FileText,
  Presentation,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  X,
  FileCode,
  Sparkles,
  Download,
  FolderOpen,
} from 'lucide-react';
import { projectsList } from '../data/portfolioData';
import { ProjectItem } from '../types/portfolio';

interface ProjectsSectionProps {
  isFullView?: boolean;
  onViewAll?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  isFullView = false,
  onViewAll,
}) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const displayedProjects = isFullView ? projectsList : projectsList.slice(0, 3);

  return (
    <section id="projects" className="py-20 md:py-28 border-t border-white/5 bg-[#060606] text-[#EBE7E1] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C17F24] flex items-center gap-2">
              <span className="w-6 h-px bg-[#C17F24]/60" />
              05 · Applied Studies & Research
            </span>
            <h2 className="text-4xl sm:text-5xl font-display uppercase tracking-wider text-white mt-2">
              Projects & Case Studies
            </h2>
          </div>
          <p className="text-sm text-[#8E8880] max-w-md font-sans">
            Academic field research, business strategic analyses, and practical presentations from degree college studies.
          </p>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayedProjects.map((project, idx) => (
            <div
              key={project.id}
              className="p-6 sm:p-8 rounded-2xl bg-[#121110] border border-white/10 shadow-lg hover:border-[#C17F24]/40 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#C17F24] font-semibold">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-[#8E8880]">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-xl font-display uppercase tracking-wide text-white group-hover:text-[#E09830] transition-colors leading-snug">
                  {project.title}
                </h3>

                <p className="text-xs font-serif italic text-[#8E8880] mt-1">
                  {project.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-[#A09A92] mt-4 leading-relaxed line-clamp-4">
                  {project.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C17F24] hover:text-[#E09830] transition-colors cursor-pointer"
                >
                  <span>View Project Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono text-[#8E8880]">
                  {project.tags[0]}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA on Home Page */}
        {!isFullView && onViewAll && (
          <div className="mt-14 text-center">
            <a
              href="/projects"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  onViewAll();
                }
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#C17F24] hover:bg-[#E09830] text-[#060606] font-display text-sm tracking-widest uppercase transition-all shadow-lg shadow-[#C17F24]/20 cursor-pointer hover:-translate-y-0.5 font-bold"
            >
              <span>Explore All Projects & Research</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#121110] rounded-2xl shadow-2xl border border-white/10 p-6 sm:p-10 relative text-[#EBE7E1]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-[#8E8880] hover:text-white transition-colors cursor-pointer"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-mono uppercase tracking-widest text-[#C17F24] font-bold">
              {selectedProject.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-wide text-white mt-1">
              {selectedProject.title}
            </h3>
            <p className="text-sm font-serif italic text-[#8E8880] mt-1">
              {selectedProject.subtitle}
            </p>

            <p className="text-sm sm:text-base text-[#DCD7CE] leading-relaxed mt-6">
              {selectedProject.description}
            </p>

            {/* Role callout */}
            <div className="mt-6 p-4 rounded-xl bg-[#161616] border border-white/10 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#8E8880]">My Contribution</span>
              <span className="text-xs font-bold text-[#E09830]">{selectedProject.role}</span>
            </div>

            {/* Key Findings */}
            {selectedProject.keyFindings && selectedProject.keyFindings.length > 0 && (
              <div className="mt-8">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#C17F24] mb-3">
                  Key Findings & Core Insights
                </h4>
                <div className="space-y-2.5">
                  {selectedProject.keyFindings.map((finding, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#DCD7CE]">
                      <CheckCircle2 className="w-4 h-4 text-[#C17F24] shrink-0 mt-0.5" />
                      <span>{finding}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Practical Learnings */}
            {selectedProject.keyLearnings && selectedProject.keyLearnings.length > 0 && (
              <div className="mt-8">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#C17F24] mb-3">
                  Practical Methodology & Execution
                </h4>
                <div className="space-y-2.5">
                  {selectedProject.keyLearnings.map((learning, lIdx) => (
                    <div key={lIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#DCD7CE]">
                      <span className="text-[#C17F24] font-bold">·</span>
                      <span>{learning}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags & Close */}
            <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-md bg-[#161616] border border-white/5 text-[#8E8880] text-[11px] font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-display tracking-widest uppercase bg-[#C17F24] hover:bg-[#E09830] text-[#060606] font-bold transition-colors cursor-pointer"
              >
                Close Project
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
