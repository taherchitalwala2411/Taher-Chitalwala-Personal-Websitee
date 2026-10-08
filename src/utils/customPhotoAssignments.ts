import { GalleryPhoto } from '../types/portfolio';

const ACHIEVEMENT_PHOTOS_STORAGE_KEY = 'taher_achievement_photo_overrides';
const HIDDEN_GALLERY_PHOTOS_KEY = 'taher_hidden_gallery_photos';
const CUSTOM_GALLERY_PHOTOS_KEY = 'taher_custom_gallery_photos';
const ASSIGNMENTS_UPDATED_EVENT = 'taher-photo-assignments-updated';

/**
 * Returns the effective photo for an achievement card, accounting for user overrides
 * (added, changed, or removed).
 */
export function getAchievementPhoto(
  achievementId: string,
  defaultPhotoName?: string
): string | null {
  if (typeof window === 'undefined') return defaultPhotoName || null;
  try {
    const raw = localStorage.getItem(ACHIEVEMENT_PHOTOS_STORAGE_KEY);
    if (raw) {
      const overrides: Record<string, string | null> = JSON.parse(raw);
      if (overrides[achievementId] !== undefined) {
        return overrides[achievementId]; // null means explicitly removed by user
      }
    }
  } catch {}
  return defaultPhotoName || null;
}

export function setAchievementPhoto(achievementId: string, fileName: string): void {
  try {
    const raw = localStorage.getItem(ACHIEVEMENT_PHOTOS_STORAGE_KEY);
    const overrides: Record<string, string | null> = raw ? JSON.parse(raw) : {};
    overrides[achievementId] = fileName;
    localStorage.setItem(ACHIEVEMENT_PHOTOS_STORAGE_KEY, JSON.stringify(overrides));
  } catch {}

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(ASSIGNMENTS_UPDATED_EVENT, {
        detail: { type: 'achievement', achievementId, fileName },
      })
    );
  }
}

export function removeAchievementPhoto(achievementId: string): void {
  try {
    const raw = localStorage.getItem(ACHIEVEMENT_PHOTOS_STORAGE_KEY);
    const overrides: Record<string, string | null> = raw ? JSON.parse(raw) : {};
    overrides[achievementId] = null; // explicitly removed
    localStorage.setItem(ACHIEVEMENT_PHOTOS_STORAGE_KEY, JSON.stringify(overrides));
  } catch {}

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(ASSIGNMENTS_UPDATED_EVENT, {
        detail: { type: 'achievement', achievementId, fileName: null },
      })
    );
  }
}

/**
 * Gallery custom photos and deletions
 */
export function getHiddenGalleryPhotoIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HIDDEN_GALLERY_PHOTOS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function hideGalleryPhoto(photoId: string): void {
  try {
    const current = getHiddenGalleryPhotoIds();
    if (!current.includes(photoId)) {
      const updated = [...current, photoId];
      localStorage.setItem(HIDDEN_GALLERY_PHOTOS_KEY, JSON.stringify(updated));
    }
  } catch {}

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(ASSIGNMENTS_UPDATED_EVENT, {
        detail: { type: 'gallery-hidden', photoId },
      })
    );
  }
}

export function unhideGalleryPhoto(photoId: string): void {
  try {
    const current = getHiddenGalleryPhotoIds();
    const updated = current.filter((id) => id !== photoId);
    localStorage.setItem(HIDDEN_GALLERY_PHOTOS_KEY, JSON.stringify(updated));
  } catch {}

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(ASSIGNMENTS_UPDATED_EVENT, {
        detail: { type: 'gallery-unhidden', photoId },
      })
    );
  }
}

export function getCustomGalleryPhotos(): GalleryPhoto[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CUSTOM_GALLERY_PHOTOS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addCustomGalleryPhoto(photo: GalleryPhoto): void {
  try {
    const current = getCustomGalleryPhotos();
    const updated = [photo, ...current];
    localStorage.setItem(CUSTOM_GALLERY_PHOTOS_KEY, JSON.stringify(updated));
  } catch {}

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(ASSIGNMENTS_UPDATED_EVENT, {
        detail: { type: 'gallery-added', photo },
      })
    );
  }
}

export function deleteCustomGalleryPhoto(photoId: string): void {
  try {
    const current = getCustomGalleryPhotos();
    const updated = current.filter((p) => p.id !== photoId);
    localStorage.setItem(CUSTOM_GALLERY_PHOTOS_KEY, JSON.stringify(updated));
  } catch {}

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(ASSIGNMENTS_UPDATED_EVENT, {
        detail: { type: 'gallery-deleted', photoId },
      })
    );
  }
}
