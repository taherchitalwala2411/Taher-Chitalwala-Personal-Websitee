import React from 'react';
import { ArrowUp, MapPin, Play } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onReplayIntro?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onReplayIntro }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#040404] text-[#8E8880] py-16 border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/5">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#141414] border border-[#C17F24]/50 flex items-center justify-center font-display text-white text-base font-bold">
                TC
              </span>
              <span className="text-xl font-display uppercase tracking-widest text-white block">
                {personalInfo.fullName}
              </span>
            </div>
            <p className="text-sm text-[#A09A92] mt-2 font-serif italic">
              “{personalInfo.tagline}”
            </p>
            <p className="text-xs text-[#6A6560] mt-2 flex items-center gap-1.5 font-mono">
              <MapPin className="w-3.5 h-3.5 text-[#C17F24]" />
              {personalInfo.location}
            </p>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-wrap items-center gap-6 text-xs font-semibold uppercase tracking-wider text-[#8E8880]">
            <a
              href="/"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  onNavigate('home');
                }
              }}
              className="hover:text-[#E09830] transition-colors cursor-pointer"
            >
              HOME
            </a>
            <a
              href="/about"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  onNavigate('about');
                }
              }}
              className="hover:text-[#E09830] transition-colors cursor-pointer"
            >
              ABOUT ME
            </a>
            <a
              href="/achievements"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  onNavigate('achievements');
                }
              }}
              className="hover:text-[#E09830] transition-colors cursor-pointer"
            >
              ACHIEVEMENTS
            </a>
            <a
              href="/experience"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  onNavigate('experience');
                }
              }}
              className="hover:text-[#E09830] transition-colors cursor-pointer"
            >
              WORK EXPERIENCE
            </a>
            <a
              href="/projects"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  onNavigate('projects');
                }
              }}
              className="hover:text-[#E09830] transition-colors cursor-pointer"
            >
              PROJECTS
            </a>
            <a
              href="/gallery"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  onNavigate('gallery');
                }
              }}
              className="hover:text-[#E09830] transition-colors cursor-pointer"
            >
              GALLERY
            </a>
            <a
              href="/contact"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  onNavigate('contact');
                }
              }}
              className="hover:text-[#E09830] transition-colors cursor-pointer"
            >
              CONTACT
            </a>

            {onReplayIntro && (
              <button
                type="button"
                onClick={onReplayIntro}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#141414] border border-[#C17F24]/30 text-[#C17F24] hover:text-[#E09830] hover:border-[#C17F24] text-[11px] font-mono transition-colors cursor-pointer"
                title="Watch introductory cinematic animation"
              >
                <Play className="w-2.5 h-2.5 fill-current" />
                <span>Replay Intro</span>
              </button>
            )}
          </nav>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-[#141414] hover:bg-[#1f1f1f] border border-white/10 text-[#C17F24] hover:text-[#E09830] transition-colors cursor-pointer self-start md:self-center"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6A6560]">
          <p>
            © {new Date().getFullYear()} Taher Chitalwala. All personal rights reserved.
          </p>
          <p className="text-[#8E8880] font-mono">
            Personal Portfolio · South Mumbai, India
          </p>
        </div>
      </div>
    </footer>
  );
};

