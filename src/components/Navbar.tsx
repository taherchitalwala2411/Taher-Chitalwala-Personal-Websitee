import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isHomeView: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
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

  const navLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT ME' },
    { id: 'achievements', label: 'ACHIEVEMENTS' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'gallery', label: 'GALLERY' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF9F5]/90 dark:bg-[#121110]/90 backdrop-blur-md shadow-xs border-b border-stone-200/70 dark:border-stone-800 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Zone 1: Minimalist Monogram Mark */}
        <button
          onClick={() => handleLinkClick('home')}
          className="group cursor-pointer flex items-center gap-2"
          aria-label="Home"
        >
          <span className="w-8 h-8 rounded-lg bg-stone-900 dark:bg-stone-100 group-hover:bg-[#8B1E28] dark:group-hover:bg-[#E11D48] text-white dark:text-stone-950 flex items-center justify-center text-xs font-extrabold tracking-wider transition-colors shadow-xs">
            TC
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wider text-stone-600 dark:text-stone-400">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`transition-colors py-1 relative whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-stone-950 dark:text-white font-bold'
                    : 'hover:text-stone-950 dark:hover:text-white text-stone-600 dark:text-stone-400'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B1E28] dark:bg-[#E11D48] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Theme Toggle & Primary Action & Mobile Hamburger */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Phone-style Light / Dark Mode Toggle */}
          <ThemeToggle variant="segmented" className="hidden sm:inline-flex" />
          <ThemeToggle variant="icon" className="sm:hidden" />

          <button
            onClick={() => handleLinkClick('contact')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white dark:text-stone-950 bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white/90 rounded-lg transition-colors whitespace-nowrap shadow-xs cursor-pointer"
          >
            <span>Let's Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-stone-300 dark:text-stone-600" />
          </button>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 text-stone-800 dark:text-stone-200 hover:text-stone-950 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-[#FAF9F5] dark:bg-[#161513] border-b border-stone-200 dark:border-stone-800 px-6 py-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left py-2 text-sm font-semibold tracking-wide transition-colors flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'text-[#8B1E28] dark:text-[#E11D48] font-bold pl-2 border-l-2 border-[#8B1E28] dark:border-[#E11D48]'
                      : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="text-xs text-[#8B1E28] dark:text-[#E11D48]">●</span>}
                </button>
              );
            })}

            {/* Mobile Theme Switcher */}
            <div className="pt-4 pb-2 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">Appearance</span>
              <ThemeToggle variant="segmented" />
            </div>

            <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
              <button
                onClick={() => handleLinkClick('contact')}
                className="w-full py-2.5 px-4 text-xs font-semibold text-center text-white dark:text-stone-950 bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white/90 rounded-lg transition-colors shadow-xs"
              >
                Let's Connect
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
