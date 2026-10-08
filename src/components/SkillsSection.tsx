import React from 'react';
import { skillCategories } from '../data/portfolioData';
import {
  MessageSquare,
  Users,
  Compass,
  Lightbulb,
  FileText,
  FileSpreadsheet,
  Presentation,
  Cpu,
  Camera,
  Layers,
  Sparkles,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  'Effective Communication': <MessageSquare className="w-4 h-4 text-[#8B1E28] dark:text-[#E11D48]" />,
  'Leadership': <Compass className="w-4 h-4 text-[#8B1E28] dark:text-[#E11D48]" />,
  'Teamwork': <Users className="w-4 h-4 text-[#8B1E28] dark:text-[#E11D48]" />,
  'Problem Solving': <Lightbulb className="w-4 h-4 text-[#8B1E28] dark:text-[#E11D48]" />,
  'Decision Making': <Layers className="w-4 h-4 text-[#8B1E28] dark:text-[#E11D48]" />,
  'Microsoft Word': <FileText className="w-4 h-4 text-stone-600 dark:text-stone-400" />,
  'Microsoft Excel': <FileSpreadsheet className="w-4 h-4 text-stone-600 dark:text-stone-400" />,
  'Microsoft PowerPoint': <Presentation className="w-4 h-4 text-stone-600 dark:text-stone-400" />,
  'Basic Computer Skills': <Cpu className="w-4 h-4 text-stone-600 dark:text-stone-400" />,
  'AI Skills & AI Tools': <Sparkles className="w-4 h-4 text-[#8B1E28] dark:text-[#E11D48]" />,
  'Photography & Videography': <Camera className="w-4 h-4 text-stone-600 dark:text-stone-400" />,
};

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-16 md:py-22 border-t border-stone-200/80 dark:border-stone-800 bg-gradient-to-b from-[#FAF9F5] via-[#F7F4EB] to-[#FAF9F5] dark:from-[#121110] dark:via-[#161513] dark:to-[#121110] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8B1E28] dark:text-[#E11D48]">
              03 · Practical Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-950 dark:text-stone-50 mt-1">
              Skills & Capabilities
            </h2>
          </div>
          <p className="text-sm text-stone-500 dark:text-stone-400 max-w-md">
            Grounded strengths built through student leadership, practical office productivity, AI exploration, and visual storytelling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, catIdx) => (
            <div
              key={catIdx}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-xs flex flex-col justify-between transition-colors"
            >
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 tracking-tight pb-4 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <span>{category.title}</span>
                  <span className="text-[11px] font-mono text-stone-400 dark:text-stone-500">
                    0{catIdx + 1}
                  </span>
                </h3>

                <ul className="mt-6 space-y-4">
                  {category.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="group">
                      <div className="flex items-center gap-3">
                        <span className="p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 group-hover:bg-stone-200/70 dark:group-hover:bg-stone-700/70 transition-colors shrink-0">
                          {iconMap[skill.name] || <Layers className="w-4 h-4 text-stone-600 dark:text-stone-400" />}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 group-hover:text-[#8B1E28] dark:group-hover:text-[#E11D48] transition-colors">
                            {skill.name}
                          </p>
                          {skill.note && (
                            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                              {skill.note}
                            </p>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-400 dark:text-stone-500">
                Grounded in actual execution, not arbitrary rating numbers.
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
