export type ViewMode =
  | 'home'
  | 'about'
  | 'achievements'
  | 'experience'
  | 'projects'
  | 'gallery'
  | 'contact'
  | 'education'
  | 'skills';

export interface PageMetadata {
  title: string;
  description: string;
  canonicalPath: string;
}

export const PAGE_ROUTES: Record<ViewMode, PageMetadata> = {
  home: {
    canonicalPath: '/',
    title: 'Taher Chitalwala | Portfolio',
    description:
      'Personal portfolio of Taher Chitalwala — BBA Digital Business student at Hinduja College × IIDE, Senior Volunteer at IIMUN, sports enthusiast, and aspiring entrepreneur from South Mumbai.',
  },
  about: {
    canonicalPath: '/about',
    title: 'About Me | Taher Chitalwala',
    description:
      'Learn about Taher Chitalwala’s personal journey, upbringing in South Mumbai, values, leadership experience, and entrepreneurial vision.',
  },
  achievements: {
    canonicalPath: '/achievements',
    title: 'Achievements & Milestones | Taher Chitalwala',
    description:
      'Explore the awards, Head Boy leadership honors, state-level sports achievements, and debate accomplishments of Taher Chitalwala.',
  },
  experience: {
    canonicalPath: '/experience',
    title: 'Work Experience & Leadership | Taher Chitalwala',
    description:
      'Professional experience, IIMUN volunteer leadership, digital marketing initiatives, and event operations led by Taher Chitalwala.',
  },
  projects: {
    canonicalPath: '/projects',
    title: 'Projects & Ventures | Taher Chitalwala',
    description:
      'Digital business projects, strategic ventures, research case studies, and entrepreneurial initiatives developed by Taher Chitalwala.',
  },
  gallery: {
    canonicalPath: '/gallery',
    title: 'Photo Gallery | Taher Chitalwala',
    description:
      'Curated photo gallery highlighting youth diplomacy conferences, dignitary encounters, award ceremonies, and sports milestones.',
  },
  contact: {
    canonicalPath: '/contact',
    title: 'Contact & Connect | Taher Chitalwala',
    description:
      'Reach out directly to Taher Chitalwala for collaborations, professional networking, or business inquiries in Mumbai.',
  },
  education: {
    canonicalPath: '/education',
    title: 'Education Timeline | Taher Chitalwala',
    description:
      'Academic foundation from school leadership to digital business degree studies at Hinduja College × IIDE Mumbai.',
  },
  skills: {
    canonicalPath: '/skills',
    title: 'Skills & Capabilities | Taher Chitalwala',
    description:
      'Core capabilities in digital business, public speaking, leadership, event management, and athletic discipline.',
  },
};

// Aliases for friendly routing
const PATH_ALIASES: Record<string, ViewMode> = {
  '/': 'home',
  '/home': 'home',
  '/index': 'home',
  '/index.html': 'home',
  '/about': 'about',
  '/about-me': 'about',
  '/bio': 'about',
  '/story': 'about',
  '/achievements': 'achievements',
  '/awards': 'achievements',
  '/milestones': 'achievements',
  '/experience': 'experience',
  '/work': 'experience',
  '/leadership': 'experience',
  '/career': 'experience',
  '/projects': 'projects',
  '/ventures': 'projects',
  '/work-projects': 'projects',
  '/gallery': 'gallery',
  '/photos': 'gallery',
  '/portfolio': 'gallery',
  '/contact': 'contact',
  '/connect': 'contact',
  '/reach-out': 'contact',
  '/education': 'education',
  '/academics': 'education',
  '/skills': 'skills',
  '/capabilities': 'skills',
};

/**
 * Resolves a clean URL path to the corresponding ViewMode.
 * Returns null if the path does not match any recognized page.
 */
export function getViewFromPath(pathname: string): ViewMode | null {
  if (!pathname) return 'home';

  // Normalize: lower case and trim trailing slashes
  let normalized = pathname.trim().toLowerCase();
  if (normalized.length > 1 && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1);
  }

  if (normalized in PATH_ALIASES) {
    return PATH_ALIASES[normalized];
  }

  return null;
}

/**
 * Returns the short, clean, canonical URL for a given ViewMode.
 */
export function getPathFromView(view: ViewMode): string {
  return PAGE_ROUTES[view]?.canonicalPath || '/';
}

/**
 * Dynamically synchronizes document title, meta description, and og tags.
 */
export function updateDocumentMetadata(view: ViewMode): void {
  const meta = PAGE_ROUTES[view] || PAGE_ROUTES.home;

  document.title = meta.title;

  const descEl = document.querySelector('meta[name="description"]');
  if (descEl) {
    descEl.setAttribute('content', meta.description);
  }

  const ogTitleEl = document.querySelector('meta[property="og:title"]');
  if (ogTitleEl) {
    ogTitleEl.setAttribute('content', meta.title);
  }

  const ogDescEl = document.querySelector('meta[property="og:description"]');
  if (ogDescEl) {
    ogDescEl.setAttribute('content', meta.description);
  }
}
