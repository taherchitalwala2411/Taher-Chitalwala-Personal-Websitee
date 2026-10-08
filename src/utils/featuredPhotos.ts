import { defaultTopPhotos } from '../data/portfolioData';

// The 4 fixed photos featured at the top per user specifications
export const FIXED_TOP_PHOTOS: string[] = defaultTopPhotos;

export function getFeaturedTopPhotos(): string[] {
  return FIXED_TOP_PHOTOS;
}

export function isFeaturedTopPhoto(fileName: string): boolean {
  return FIXED_TOP_PHOTOS.includes(fileName);
}
