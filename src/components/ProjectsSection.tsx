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
    <section id="projects" className="py-16 md:py-22 border-t border-stone-200/80 dark:border-stone-800 bg-[#FAF9F5] dark:bg-[#121110] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8B1E28] dark:text-[#E11D48]">
              05 · Applied Studies & Research
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-950 dark:text-stone-50 mt-1">
              Projects & Case Studies
            </h2>
          </div>
          <p className="text-sm text-stone-500 dark:text-stone-400 max-w-md">
            Academic field research, business strategic analyses, and practical presentations from degree college studies.
          </p>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayedProjects.map((project, idx) => (
            <div
              key={project.id}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-semibold text-[#8B1E28] dark:text-[#E11D48]">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-stone-400 dark:text-stone-500">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-stone-950 dark:text-stone-50 leading-snug">
                  {project.title}
                </h3>

                <p className="text-xs font-medium text-stone-500 dark:text-stone-400 mt-1">
                  {project.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-4 leading-relaxed line-clamp-4">
                  {project.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 dark:text-stone-100 hover:text-[#8B1E28] dark:hover:text-[#E11D48] transition-colors cursor-pointer"
                >
                  <span>View Project Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono text-stone-400 dark:text-stone-500">
                  {project.tags[0]}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA on Home Page */}
        {!isFullView && onViewAll && (
          <div className="mt-12 text-center">
            <button
              onClick={onViewAll}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 text-xs font-bold hover:bg-stone-800 dark:hover:bg-white/90 transition-all shadow-sm cursor-pointer hover:-translate-y-0.5"
            >
              <span>Explore All Projects & Research</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-10 relative text-stone-900 dark:text-stone-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-mono uppercase tracking-wider text-[#8B1E28] dark:text-[#E11D48] font-bold">
              {selectedProject.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-950 dark:text-stone-50 mt-1">
              {selectedProject.title}
            </h3>
            <p className="text-sm font-semibold text-stone-500 dark:text-stone-400 mt-1">
              {selectedProject.subtitle}
            </p>

            <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed mt-6">
              {selectedProject.description}
            </p>

            {/* Role callout */}
            <div className="mt-6 p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-800 flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">My Contribution</span>
              <span className="text-xs font-bold text-stone-900 dark:text-stone-100">{selectedProject.role}</span>
            </div>

            {/* Key Findings */}
            {selectedProject.keyFindings && selectedProject.keyFindings.length > 0 && (
              <div className="mt-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-3">
                  Key Findings & Core Insights
                </h4>
                <div className="space-y-2.5">
                  {selectedProject.keyFindings.map((finding, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                      <CheckCircle2 className="w-4 h-4 text-[#8B1E28] dark:text-[#E11D48] shrink-0 mt-0.5" />
                      <span>{finding}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Practical Learnings */}
            {selectedProject.keyLearnings && selectedProject.keyLearnings.length > 0 && (
              <div className="mt-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-3">
                  Practical Methodology & Execution
                </h4>
                <div className="space-y-2.5">
                  {selectedProject.keyLearnings.map((learning, lIdx) => (
                    <div key={lIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                      <span className="text-[#8B1E28] dark:text-[#E11D48] font-bold">·</span>
                      <span>{learning}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags & Close */}
            <div className="mt-10 pt-6 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 text-[11px] font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 hover:bg-stone-800 dark:hover:bg-white/90 transition-colors cursor-pointer"
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
