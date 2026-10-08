import { defaultTopPhotos } from '../data/portfolioData';

const STORAGE_KEY = 'taher_featured_top_photos';
const EVENT_NAME = 'portfolio-top-photos-updated';

export function getFeaturedTopPhotos(): string[] {
  if (typeof window === 'undefined') return defaultTopPhotos;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultTopPhotos;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return defaultTopPhotos;
  } catch {
    return defaultTopPhotos;
  }
}

export function isFeaturedTopPhoto(fileName: string): boolean {
  const current = getFeaturedTopPhotos();
  return current.includes(fileName);
}

export function toggleFeaturedTopPhoto(fileName: string): {
  isFeatured: boolean;
  totalFeatured: number;
} {
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

export function setFeaturedTopPhotos(photos: string[]): string[] {
  const sanitized = Array.from(new Set(photos.filter(Boolean)));
  const finalPhotos = sanitized.length > 0 ? sanitized : defaultTopPhotos;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(finalPhotos));
  } catch {}
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(EVENT_NAME, {
        detail: { photos: finalPhotos, changed: null, isFeatured: true },
      })
    );
  }
  return finalPhotos;
}

export function resetFeaturedTopPhotos(): string[] {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(EVENT_NAME, {
        detail: { photos: defaultTopPhotos, changed: null, isFeatured: true },
      })
    );
  }
  return defaultTopPhotos;
}
