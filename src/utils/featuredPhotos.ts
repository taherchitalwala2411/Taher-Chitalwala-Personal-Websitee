import { defaultTopPhotos } from '../data/portfolioData';

const STORAGE_KEY = 'taher_featured_top_photos';
const EVENT_NAME = 'portfolio-top-photos-updated';

// Photos that have been explicitly removed by user request (podium, portrait, Dr Batra)
const EXCLUDED_PHOTOS = [
  'Home page.jpeg',
  'About me photo.jpeg',
  'With Dr Mukesh Batra.jpeg',
  'IIMUN Event.jpeg',
];

export function getFeaturedTopPhotos(): string[] {
  if (typeof window === 'undefined') return defaultTopPhotos;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultTopPhotos;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Filter out any photos that were explicitly removed by the user
      const sanitized = parsed.filter((p) => typeof p === 'string' && !EXCLUDED_PHOTOS.includes(p));
      if (sanitized.length > 0) {
        if (sanitized.length !== parsed.length) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
        }
        return sanitized;
      }
    }
    return defaultTopPhotos;
  } catch {
    return defaultTopPhotos;
  }
}

export function isFeaturedTopPhoto(fileName: string): boolean {
  if (EXCLUDED_PHOTOS.includes(fileName)) return false;
  const current = getFeaturedTopPhotos();
  return current.includes(fileName);
}

export function toggleFeaturedTopPhoto(fileName: string): {
  isFeatured: boolean;
  totalFeatured: number;
} {
  if (EXCLUDED_PHOTOS.includes(fileName)) {
    return { isFeatured: false, totalFeatured: getFeaturedTopPhotos().length };
  }

  const current = getFeaturedTopPhotos();
  let updated: string[];
  let isNowFeatured = false;

  if (current.includes(fileName)) {
    // If removing, prevent empty list (keep at least 1)
    if (current.length <= 1) {
      return { isFeatured: true, totalFeatured: current.length };
    }
    updated = current.filter((f) => f !== fileName);
    isNowFeatured = false;
  } else {
    updated = [...current, fileName];
    isNowFeatured = true;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {}

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(EVENT_NAME, {
        detail: { photos: updated, changed: fileName, isFeatured: isNowFeatured },
      })
    );
  }

  return { isFeatured: isNowFeatured, totalFeatured: updated.length };
}

export function setFeaturedTopPhotos(fileNames: string[]): void {
  const sanitized = fileNames.filter((f) => !EXCLUDED_PHOTOS.includes(f));
  const finalPhotos = sanitized.length > 0 ? sanitized : defaultTopPhotos;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(finalPhotos));
  } catch {}

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(EVENT_NAME, {
        detail: { photos: finalPhotos },
      })
    );
  }
}

export function resetFeaturedTopPhotos(): string[] {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTopPhotos));
  } catch {}

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(EVENT_NAME, {
        detail: { photos: defaultTopPhotos },
      })
    );
  }

  return defaultTopPhotos;
}
