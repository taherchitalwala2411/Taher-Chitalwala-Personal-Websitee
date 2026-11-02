/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
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
import { AscendingGraphLoader } from './components/AscendingGraphLoader';
import { TopProgressBar } from './components/TopProgressBar';
import { IntroScreen } from './components/IntroScreen';
import { ToastContainer } from './components/ToastNotification';
import { NotificationProvider } from './context/NotificationContext';
import { getPhotoUrlCandidates } from './utils/photoStorage';
import { galleryPhotos } from './data/portfolioData';
import {
  ViewMode,
  getViewFromPath,
  getPathFromView,
  updateDocumentMetadata,
} from './utils/navigation';

// Map each view to its primary image assets so we can track real-time loading progress
const viewAssetsMap: Record<ViewMode, string[]> = {
  home: [
    'Head boy image 2.jpeg',
    'IIMUN event 6.jpeg',
    'NIE TOI 2.jpeg',
    'Trophies.jpeg',
    'Headboy image.jpeg',
  ],
  about: [
    'Headboy image.jpeg',
    'Head boy image 2.jpeg',
  ],
  achievements: [
    'Head boy image 2.jpeg',
    'NIE TOI 2.jpeg',
    'SBFL winning.jpeg',
    'Trophies.jpeg',
  ],
  experience: [],
  projects: [],
  gallery: [
    'Head boy image 2.jpeg',
    'Headboy image.jpeg',
    'IIMUN event 2.jpeg',
    'IIMUN event 3.jpeg',
    'IIMUN event 4.jpeg',
    'IIMun event 5.jpeg',
    'IIMUN event 6.jpeg',
    'NIE TOI 2.jpeg',
    'SBFL winning.jpeg',
    'Trophies.jpeg',
    'With Zayed Khan.jpeg',
    'with Nadir Godrej.jpeg',
    'WhatsApp Image 2026-10-07 at 8.49.04 AM.jpeg',
  ],
  contact: [],
  education: [],
  skills: [],
};

function PortfolioApp() {
  const initialMatched = getViewFromPath(window.location.pathname);
  const [currentView, setCurrentView] = useState<ViewMode>(initialMatched || 'home');
  const [isNotFound, setIsNotFound] = useState<boolean>(initialMatched === null && window.location.pathname !== '/');
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      const search = new URLSearchParams(window.location.search);
      if (search.get('intro') === '1') return true;
      if (search.get('nointro') === '1') return false;
      return sessionStorage.getItem('taher_intro_seen') !== '1';
    } catch {
      return true;
    }
  });
  const [isIntroBlurActive, setIsIntroBlurActive] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      const search = new URLSearchParams(window.location.search);
      if (search.get('intro') === '1') return true;
      if (search.get('nointro') === '1') return false;
      return sessionStorage.getItem('taher_intro_seen') !== '1';
    } catch {
      return true;
    }
  });

  const handleReplayIntro = () => {
    setIsIntroBlurActive(true);
    setShowIntro(true);
  };

  const [lightboxPhoto, setLightboxPhoto] = useState<{
    fileName: string;
    title: string;
    category?: string;
    source?: string;
  } | null>(null);

  const navigationSessionRef = useRef<number>(0);

  // Synchronize document title and meta description on view or route changes
  useEffect(() => {
    if (isNotFound) {
      document.title = 'Page Not Found · 404 | Taher Chitalwala';
    } else {
      updateDocumentMetadata(currentView);
    }
  }, [currentView, isNotFound]);

  // Handle browser Back / Forward history navigation
  useEffect(() => {
    const handlePopState = () => {
      const matched = getViewFromPath(window.location.pathname);
      if (matched) {
        setIsNotFound(false);
        setCurrentView(matched);
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        setIsNotFound(true);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Check URL parameters on mount (e.g., direct photo deep link)
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const photoParam = searchParams.get('photo');
    if (photoParam) {
      const match = galleryPhotos.find(
        (p) =>
          p.fileName.toLowerCase() === photoParam.toLowerCase() ||
          p.id.toLowerCase() === photoParam.toLowerCase()
      );
      if (match) {
        setLightboxPhoto({
          fileName: match.fileName,
          title: match.title,
          category: match.category,
        });
      }
    }
  }, []);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleNavigate = (sectionId: string, pushToHistory = true) => {
    const targetView = sectionId as ViewMode;
    setIsNotFound(false);

    const cleanPath = getPathFromView(targetView);
    if (pushToHistory && window.location.pathname !== cleanPath) {
      window.history.pushState({ view: targetView }, '', cleanPath);
    }

    if (targetView === currentView && !isNotFound) {
      if (currentView === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    // Increment session ID to cancel or ignore stale navigations
    navigationSessionRef.current += 1;
    const currentSession = navigationSessionRef.current;

    // Trigger real-time navigation loader
    setIsNavigating(true);
    setLoadProgress(15);

    const targetAssets = viewAssetsMap[targetView] || [];
    const startTime = performance.now();

    // Fast load path for views without heavy images
    if (targetAssets.length === 0) {
      setTimeout(() => {
        if (navigationSessionRef.current !== currentSession) return;
        setLoadProgress(65);
      }, 50);

      setTimeout(() => {
        if (navigationSessionRef.current !== currentSession) return;
        setLoadProgress(100);
        setCurrentView(targetView);
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 140);

      setTimeout(() => {
        if (navigationSessionRef.current !== currentSession) return;
        setIsNavigating(false);
        setTimeout(() => {
          if (navigationSessionRef.current === currentSession) {
            setLoadProgress(0);
          }
        }, 300);
      }, 260);

      return;
    }

    // Dynamic real-time asset loading
    let loadedCount = 0;
    const totalCount = targetAssets.length;
    let completed = false;

    const finalize = () => {
      if (completed || navigationSessionRef.current !== currentSession) return;
      completed = true;

      // Small perceptible minimum (~120ms) so transitions remain smooth
      const elapsed = performance.now() - startTime;
      const remainingWait = Math.max(0, 120 - elapsed);

      setTimeout(() => {
        if (navigationSessionRef.current !== currentSession) return;
        setLoadProgress(100);
        setCurrentView(targetView);
        window.scrollTo({ top: 0, behavior: 'instant' });

        setTimeout(() => {
          if (navigationSessionRef.current !== currentSession) return;
          setIsNavigating(false);
          setTimeout(() => {
            if (navigationSessionRef.current === currentSession) {
              setLoadProgress(0);
            }
          }, 300);
        }, 160);
      }, remainingWait);
    };

    // Safety maximum timeout (never hang longer than 1600ms)
    const safetyTimer = setTimeout(() => {
      finalize();
    }, 1600);

    // Track each asset in real time
    targetAssets.forEach((fileName) => {
      const candidates = getPhotoUrlCandidates(fileName);
      const primaryUrl = candidates[0] || `/photos/${encodeURIComponent(fileName)}`;

      const img = new Image();
      img.src = primaryUrl;

      const onItemLoaded = () => {
        if (completed || navigationSessionRef.current !== currentSession) return;
        loadedCount += 1;
        const fraction = loadedCount / totalCount;
        const currentPercent = Math.min(95, Math.round(15 + fraction * 80));
        setLoadProgress((prev) => Math.max(prev, currentPercent));

        if (loadedCount >= totalCount) {
          clearTimeout(safetyTimer);
          finalize();
        }
      };

      if (img.complete) {
        // Already loaded or in browser cache
        onItemLoaded();
      } else {
        img.onload = onItemLoaded;
        img.onerror = onItemLoaded;
      }
    });
  };

  const handleOpenPhoto = (
    fileName: string,
    title: string,
    category?: string,
    source?: string
  ) => {
    setLightboxPhoto({ fileName, title, category, source });
  };

  const handleClosePhoto = () => {
    setLightboxPhoto(null);
    const currentUrl = new URL(window.location.href);
    if (currentUrl.searchParams.has('photo')) {
      currentUrl.searchParams.delete('photo');
      window.history.replaceState({}, '', currentUrl.pathname + (currentUrl.search ? currentUrl.search : ''));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#060606] text-[#EBE7E1] transition-colors duration-300 selection:bg-[#C17F24]/30 selection:text-[#EBE7E1]">
      {/* John Abraham Style Intro Screen Overlay */}
      {showIntro && (
        <IntroScreen
          onStartExit={() => setIsIntroBlurActive(false)}
          onComplete={() => {
            setIsIntroBlurActive(false);
            setShowIntro(false);
          }}
        />
      )}

      {/* Subtle linear progress bar at the very top of the screen */}
      <TopProgressBar
        isVisible={isNavigating}
        progress={loadProgress}
      />

      {/* Background Page Content — Deeply blurred, scaled and dimmed when intro is active for maximum impact */}
      <div
        className={`flex-1 flex flex-col transition-all duration-700 ease-out origin-center ${
          isIntroBlurActive
            ? 'filter blur-xl sm:blur-2xl md:blur-3xl scale-[0.985] brightness-[0.35] pointer-events-none select-none'
            : isNavigating
            ? 'filter blur-sm brightness-90 transition-all duration-300'
            : 'filter blur-0 scale-100 brightness-100'
        }`}
      >
        {/* Navigation with Theme Switcher & Replay Intro */}
        <Navbar
          activeSection={isNotFound ? '' : currentView}
          onNavigate={handleNavigate}
          isHomeView={currentView === 'home' && !isNotFound}
          onReplayIntro={handleReplayIntro}
        />

        {/* Main Content Area */}
      <main className="flex-1">
        {isNotFound ? (
          /* 404 NOT FOUND VIEW */
          <div className="pt-32 pb-24 max-w-3xl mx-auto px-6 text-center animate-in fade-in duration-300">
            <span className="inline-block text-xs font-mono font-bold uppercase tracking-widest text-[#C17F24] px-3.5 py-1.5 rounded-full bg-[#C17F24]/10 border border-[#C17F24]/20">
              404 · Page Not Found
            </span>
            <h1 className="font-display text-4xl sm:text-6xl text-[#EBE7E1] tracking-wider uppercase mt-5 mb-3 font-normal">
              Lost in the Journey?
            </h1>
            <p className="text-sm sm:text-base text-stone-400 max-w-md mx-auto mb-8 font-light">
              The page at <code className="text-xs sm:text-sm font-mono bg-[#141414] border border-white/10 px-2.5 py-1 rounded text-[#EBE7E1]">{window.location.pathname}</code> does not exist or has moved. Explore one of the clean paths below:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              <a
                href="/"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    handleNavigate('home');
                  }
                }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#C17F24] text-[#060606] text-xs font-bold hover:bg-[#E09830] transition-all shadow-md cursor-pointer hover:-translate-y-0.5 tracking-wider uppercase"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Home (/)</span>
              </a>
              <a
                href="/about"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    handleNavigate('about');
                  }
                }}
                className="px-4 py-3 rounded-xl bg-[#141414] text-stone-300 text-xs font-semibold hover:border-[#C17F24]/50 hover:text-white transition-all border border-white/10 tracking-wider uppercase"
              >
                About (/about)
              </a>
              <a
                href="/achievements"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    handleNavigate('achievements');
                  }
                }}
                className="px-4 py-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-semibold hover:bg-stone-200 dark:hover:bg-stone-700 transition-all border border-stone-200/80 dark:border-stone-700"
              >
                Achievements (/achievements)
              </a>
              <a
                href="/gallery"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    handleNavigate('gallery');
                  }
                }}
                className="px-4 py-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-semibold hover:bg-stone-200 dark:hover:bg-stone-700 transition-all border border-stone-200/80 dark:border-stone-700"
              >
                Gallery (/gallery)
              </a>
              <a
                href="/contact"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    handleNavigate('contact');
                  }
                }}
                className="px-4 py-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-semibold hover:bg-stone-200 dark:hover:bg-stone-700 transition-all border border-stone-200/80 dark:border-stone-700"
              >
                Contact (/contact)
              </a>
            </div>
          </div>
        ) : currentView === 'home' ? (
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
              onReadMore={() => handleNavigate('about')}
              onOpenPhoto={handleOpenPhoto}
            />

            {/* 3. Education Timeline */}
            <EducationSection />

            {/* 4. Skills & Capabilities */}
            <SkillsSection />

            {/* 5. Achievements Preview (includes Head Boy Flag Ceremony photo) */}
            <AchievementsSection
              isFullView={false}
              onViewAll={() => handleNavigate('achievements')}
              onOpenPhoto={handleOpenPhoto}
            />

            {/* 6. Work Experience Preview */}
            <ExperienceSection
              isFullView={false}
              onViewAll={() => handleNavigate('experience')}
            />

            {/* 7. Projects Preview */}
            <ProjectsSection
              isFullView={false}
              onViewAll={() => handleNavigate('projects')}
            />

            {/* 8. Gallery Preview */}
            <GallerySection
              isFullView={false}
              onViewAll={() => handleNavigate('gallery')}
              onOpenPhoto={handleOpenPhoto}
            />

            {/* 9. Contact Section */}
            <ContactSection />
          </>
        ) : (
          /* DEDICATED SECTION VIEWS WITH CLEAN SHORT URLS */
          <div className="pt-24 pb-12">
            {/* Back to Home Breadcrumb Banner */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-4">
              <a
                href="/"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    handleNavigate('home');
                  }
                }}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#8E8880] hover:text-[#EBE7E1] px-4 py-2 rounded-xl bg-[#141414] hover:bg-[#1C1C1C] hover:border-[#C17F24]/40 transition-colors cursor-pointer border border-white/10 tracking-wider uppercase font-mono"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#C17F24]" />
                <span>Back to Full Journey (Home · /)</span>
              </a>
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

            {currentView === 'education' && (
              <div className="pt-2">
                <EducationSection />
              </div>
            )}

            {currentView === 'skills' && (
              <div className="pt-2">
                <SkillsSection />
              </div>
            )}
          </div>
        )}
      </main>

        {/* Footer */}
        <Footer onNavigate={handleNavigate} onReplayIntro={handleReplayIntro} />
      </div>

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <LightboxModal
          fileName={lightboxPhoto.fileName}
          title={lightboxPhoto.title}
          category={lightboxPhoto.category}
          source={lightboxPhoto.source}
          onClose={handleClosePhoto}
          onSelectPhoto={(fileName, title, category, source) =>
            setLightboxPhoto({
              fileName,
              title,
              category,
              source: source || lightboxPhoto.source,
            })
          }
        />
      )}

      {/* Notification Toast Messages System */}
      <ToastContainer />

      {/* Ascending Graph Loading Animation when switching pages */}
      <AscendingGraphLoader
        isVisible={isNavigating}
        progress={loadProgress}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <PortfolioApp />
      </NotificationProvider>
    </ThemeProvider>
  );
}
