import React from 'react';
import { ArrowUp, Heart, MapPin } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 py-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-stone-800">
          <div>
            <span className="text-sm font-bold tracking-tight text-white uppercase block">
              {personalInfo.fullName}
            </span>
            <p className="text-xs text-stone-400 mt-1 font-serif italic">
              “{personalInfo.tagline}”
            </p>
            <p className="text-xs text-stone-500 mt-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#8B1E28]" />
              {personalInfo.location}
            </p>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-wrap items-center gap-6 text-xs font-semibold text-stone-400">
            <a
              href="/"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  onNavigate('home');
                }
              }}
              className="hover:text-white transition-colors cursor-pointer"
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
              className="hover:text-white transition-colors cursor-pointer"
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
              className="hover:text-white transition-colors cursor-pointer"
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
              className="hover:text-white transition-colors cursor-pointer"
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
              className="hover:text-white transition-colors cursor-pointer"
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
              className="hover:text-white transition-colors cursor-pointer"
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
              className="hover:text-white transition-colors cursor-pointer"
            >
              CONTACT
            </a>
          </nav>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer self-start md:self-center"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} Taher Chitalwala. All personal rights reserved.
          </p>
          <p className="text-stone-400">
            Personal Portfolio · South Mumbai, India
          </p>
        </div>
      </div>
    </footer>
  );
};
