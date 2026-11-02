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
  'Effective Communication': <MessageSquare className="w-4 h-4 text-[#C17F24]" />,
  'Leadership': <Compass className="w-4 h-4 text-[#C17F24]" />,
  'Teamwork': <Users className="w-4 h-4 text-[#C17F24]" />,
  'Problem Solving': <Lightbulb className="w-4 h-4 text-[#C17F24]" />,
  'Decision Making': <Layers className="w-4 h-4 text-[#C17F24]" />,
  'Microsoft Word': <FileText className="w-4 h-4 text-stone-400" />,
  'Microsoft Excel': <FileSpreadsheet className="w-4 h-4 text-stone-400" />,
  'Microsoft PowerPoint': <Presentation className="w-4 h-4 text-stone-400" />,
  'Basic Computer Skills': <Cpu className="w-4 h-4 text-stone-400" />,
  'AI Skills & AI Tools': <Sparkles className="w-4 h-4 text-[#C17F24]" />,
  'Photography & Videography': <Camera className="w-4 h-4 text-stone-400" />,
};

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-16 md:py-24 border-t border-white/[0.07] bg-[#060606] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#C17F24]">
              03 · Practical Capabilities
            </span>
            <h2 className="font-display text-4xl sm:text-5xl tracking-[0.04em] uppercase text-[#EBE7E1] mt-2 font-normal">
              Skills & Capabilities
            </h2>
          </div>
          <p className="text-sm text-[#8E8880] max-w-md font-light">
            Grounded strengths built through student leadership, practical office productivity, AI exploration, and visual storytelling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, catIdx) => (
            <div
              key={catIdx}
              className="p-6 sm:p-8 rounded-2xl bg-[#121110] border border-white/10 hover:border-[#C17F24]/40 shadow-xl flex flex-col justify-between transition-all"
            >
              <div>
                <h3 className="text-base font-display tracking-wider uppercase text-[#EBE7E1] pb-4 border-b border-white/[0.08] flex items-center justify-between">
                  <span>{category.title}</span>
                  <span className="text-xs font-mono text-[#C17F24]">
                    0{catIdx + 1}
                  </span>
                </h3>

                <ul className="mt-6 space-y-4">
                  {category.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="group">
                      <div className="flex items-center gap-3">
                        <span className="p-2 rounded-lg bg-[#181818] border border-white/5 group-hover:border-[#C17F24]/30 transition-colors shrink-0">
                          {iconMap[skill.name] || <Layers className="w-4 h-4 text-stone-400" />}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-[#EBE7E1] group-hover:text-[#C17F24] transition-colors">
                            {skill.name}
                          </p>
                          {skill.note && (
                            <p className="text-xs text-[#8E8880] mt-0.5 font-light">
                              {skill.note}
                            </p>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-white/[0.08] text-[11px] text-stone-500 font-mono">
                Grounded in actual execution, not arbitrary rating numbers.
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
