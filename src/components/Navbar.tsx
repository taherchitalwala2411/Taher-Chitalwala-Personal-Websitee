import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { ViewMode, getPathFromView } from '../utils/navigation';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isHomeView: boolean;
  onReplayIntro?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onReplayIntro,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: ViewMode; label: string; href: string }[] = [
    { id: 'home', label: 'HOME', href: '/' },
    { id: 'about', label: 'ABOUT ME', href: '/about' },
    { id: 'achievements', label: 'ACHIEVEMENTS', href: '/achievements' },
    { id: 'experience', label: 'EXPERIENCE', href: '/experience' },
    { id: 'projects', label: 'PROJECTS', href: '/projects' },
    { id: 'gallery', label: 'GALLERY', href: '/gallery' },
    { id: 'contact', label: 'CONTACT', href: '/contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent, id: ViewMode) => {
    // If user clicked with modifier key (Ctrl, Cmd, Shift, or middle button), let browser open new tab
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) {
      return;
    }
    e.preventDefault();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#060606]/92 backdrop-blur-md shadow-lg border-b border-white/[0.07] py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Zone 1: Minimalist Monogram Mark */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, 'home')}
          className="group cursor-pointer flex items-center gap-2.5"
          aria-label="Home (/)"
        >
          <span className="w-8 h-8 rounded-lg border border-[#C17F24]/40 bg-[#141414] group-hover:bg-[#C17F24] text-[#EBE7E1] group-hover:text-[#060606] flex items-center justify-center font-display text-sm font-bold tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(193,127,36,0.15)]">
            TC
          </span>
          <span className="hidden sm:inline font-display text-sm tracking-[0.2em] text-[#EBE7E1] uppercase font-normal">
            Taher Chitalwala
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-[11.5px] font-medium tracking-[0.18em] uppercase text-[#8E8880]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.id)}
                className={`transition-colors py-1 relative whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-[#EBE7E1] font-semibold'
                    : 'hover:text-[#EBE7E1] text-[#8E8880]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C17F24] rounded-full shadow-[0_0_8px_rgba(193,127,36,0.8)]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Replay Intro & Theme Toggle & Primary Action & Mobile Hamburger */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Replay Intro Button */}
          {onReplayIntro && (
            <button
              onClick={onReplayIntro}
              title="Watch Intro with quote"
              className="px-2.5 py-1.5 rounded-lg border border-white/10 hover:border-[#C17F24]/40 bg-[#141414]/80 text-[#8E8880] hover:text-[#C17F24] text-[10px] font-mono tracking-[0.16em] uppercase transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C17F24] animate-pulse" />
              <span>Intro</span>
            </button>
          )}

          {/* Theme Switcher */}
          <ThemeToggle variant="segmented" className="hidden sm:inline-flex" />
          <ThemeToggle variant="icon" className="sm:hidden" />

          <a
            href="/contact"
            onClick={(e) => handleLinkClick(e, 'contact')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wider uppercase text-[#060606] bg-[#C17F24] hover:bg-[#E09830] rounded-lg transition-all whitespace-nowrap shadow-[0_0_15px_rgba(193,127,36,0.25)] cursor-pointer hover:-translate-y-0.5"
          >
            <span>Let's Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#060606]" />
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 text-[#EBE7E1] hover:text-[#C17F24] hover:bg-[#141414] rounded-lg transition-colors cursor-pointer border border-white/5"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-[#0B0A09] border-b border-white/10 px-6 py-6 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className={`text-left py-2 text-sm font-semibold tracking-wider uppercase transition-colors flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'text-[#C17F24] font-bold pl-2 border-l-2 border-[#C17F24]'
                      : 'text-[#8E8880] hover:text-[#EBE7E1]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="text-xs text-[#C17F24]">●</span>}
                </a>
              );
            })}

            {/* Replay Intro on Mobile */}
            {onReplayIntro && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onReplayIntro();
                }}
                className="w-full py-2 px-3 text-xs font-mono uppercase tracking-[0.16em] text-left text-[#C17F24] border border-[#C17F24]/30 rounded-lg bg-[#141414] flex items-center justify-between"
              >
                <span>Play Intro Screen</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C17F24]" />
              </button>
            )}

            {/* Mobile Theme Switcher */}
            <div className="pt-4 pb-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#8E8880]">Appearance</span>
              <ThemeToggle variant="segmented" />
            </div>

            <div className="pt-2 border-t border-white/10">
              <a
                href="/contact"
                onClick={(e) => handleLinkClick(e, 'contact')}
                className="block w-full py-2.5 px-4 text-xs font-semibold text-center text-[#060606] bg-[#C17F24] hover:bg-[#E09830] rounded-lg transition-colors shadow-md tracking-wider uppercase font-mono"
              >
                Let's Connect (/contact)
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
