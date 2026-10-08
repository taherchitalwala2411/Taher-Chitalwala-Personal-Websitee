/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { EducationSection } from './components/EducationSection';
import { SkillsSection } from './components/SkillsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LightboxModal } from './components/LightboxModal';

type ViewMode =
  | 'home'
  | 'about'
  | 'achievements'
  | 'experience'
  | 'projects'
  | 'gallery'
  | 'contact';

function PortfolioApp() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [lightboxPhoto, setLightboxPhoto] = useState<{
    fileName: string;
    title: string;
    category?: string;
  } | null>(null);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'home') {
      setCurrentView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentView === 'home') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    setCurrentView(sectionId as ViewMode);
  };

  const handleOpenPhoto = (fileName: string, title: string, category?: string) => {
    setLightboxPhoto({ fileName, title, category });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] dark:bg-[#121110] text-stone-900 dark:text-stone-100 transition-colors duration-300 selection:bg-[#8B1E28]/15 selection:text-[#8B1E28] dark:selection:bg-[#E11D48]/25 dark:selection:text-[#E11D48]">
      {/* Navigation with Theme Switcher */}
      <Navbar
        activeSection={currentView}
        onNavigate={handleNavigate}
        isHomeView={currentView === 'home'}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'home' ? (
          /* LONG SCROLLING LANDING HOME EXPERIENCE */
          <>
            {/* 1. Hero: Only Flag Ceremony, Air Force, NIE TOI, Shelf */}
            <Hero
              onExplore={() => {
                const aboutEl = document.getElementById('about');
                aboutEl?.scrollIntoView({ behavior: 'smooth' });
              }}
              onConnect={() => handleNavigate('contact')}
              onOpenPhoto={handleOpenPhoto}
            />

            {/* 2. About Me Preview */}
            <AboutSection
              isFullView={false}
              onReadMore={() => setCurrentView('about')}
              onOpenPhoto={handleOpenPhoto}
            />

            {/* 3. Education Timeline */}
            <EducationSection />

            {/* 4. Skills & Capabilities */}
            <SkillsSection />

            {/* 5. Achievements Preview (includes Head Boy Flag Ceremony photo) */}
            <AchievementsSection
              isFullView={false}
              onViewAll={() => setCurrentView('achievements')}
              onOpenPhoto={handleOpenPhoto}
            />

            {/* 6. Work Experience Preview */}
            <ExperienceSection
              isFullView={false}
              onViewAll={() => setCurrentView('experience')}
            />

            {/* 7. Projects Preview */}
            <ProjectsSection
              isFullView={false}
              onViewAll={() => setCurrentView('projects')}
            />

            {/* 8. Gallery Preview */}
            <GallerySection
              isFullView={false}
              onViewAll={() => setCurrentView('gallery')}
              onOpenPhoto={handleOpenPhoto}
            />

            {/* 9. Contact Section */}
            <ContactSection />
          </>
        ) : (
          /* DEDICATED SECTION VIEWS */
          <div className="pt-24 pb-12">
            {/* Back to Home Breadcrumb Banner */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-4">
              <button
                onClick={() => setCurrentView('home')}
                className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 px-3.5 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200/70 dark:hover:bg-stone-700/70 transition-colors cursor-pointer border border-stone-200/70 dark:border-stone-700"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Full Journey (Home)</span>
              </button>
            </div>

            {currentView === 'about' && (
              <AboutSection
                isFullView={true}
                onOpenPhoto={handleOpenPhoto}
              />
            )}

            {currentView === 'achievements' && (
              <AchievementsSection
                isFullView={true}
                onOpenPhoto={handleOpenPhoto}
              />
            )}

            {currentView === 'experience' && (
              <ExperienceSection isFullView={true} />
            )}

            {currentView === 'projects' && (
              <ProjectsSection isFullView={true} />
            )}

            {currentView === 'gallery' && (
              <GallerySection
                isFullView={true}
                onOpenPhoto={handleOpenPhoto}
              />
            )}

            {currentView === 'contact' && <ContactSection />}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <LightboxModal
          fileName={lightboxPhoto.fileName}
          title={lightboxPhoto.title}
          category={lightboxPhoto.category}
          onClose={() => setLightboxPhoto(null)}
          onSelectPhoto={(fileName, title, category) =>
            setLightboxPhoto({ fileName, title, category })
          }
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
