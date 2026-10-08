// Client-side photo storage, cross-visitor asset fallback, and cache helper
import { PHOTO_VISUAL_ASSETS } from '../data/photoAssets';

const DB_NAME = 'taher_portfolio_photos';
const DB_VERSION = 1;
const STORE_NAME = 'photos';
const LOCAL_STORAGE_PREFIX = 'taher_uploaded_photo_';

export interface StoredPhoto {
  fileName: string;
  dataUrl: string;
  updatedAt: number;
}

let dbPromise: Promise<IDBDatabase> | null = null;

function getDb(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'fileName' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  return dbPromise;
}

export async function savePhoto(fileName: string, dataUrl: string): Promise<void> {
  // Mirror in localStorage for fast cross-tab availability
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(`${LOCAL_STORAGE_PREFIX}${fileName}`, dataUrl);
    }
  } catch {
    // ignore quota errors
  }

  try {
    const db = await getDb();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const req = store.put({ fileName, dataUrl, updatedAt: Date.now() });
      req.onsuccess = () => {
        window.dispatchEvent(
          new CustomEvent('portfolio-photo-updated', { detail: { fileName, dataUrl } })
        );
        resolve();
      };
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Failed to save photo to IndexedDB', err);
    window.dispatchEvent(
      new CustomEvent('portfolio-photo-updated', { detail: { fileName, dataUrl } })
    );
  }
}

export async function getPhoto(fileName: string): Promise<string | null> {
  // 1. Check localStorage first for instant synchronous cache
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const local = window.localStorage.getItem(`${LOCAL_STORAGE_PREFIX}${fileName}`);
      if (local) return local;
    }
  } catch {
    // ignore
  }

  // 2. Check IndexedDB
  try {
    const db = await getDb();
    const stored = await new Promise<string | null>((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const req = store.get(fileName);
      req.onsuccess = () => {
        resolve(req.result ? req.result.dataUrl : null);
      };
      req.onerror = () => resolve(null);
    });
    if (stored) return stored;
  } catch {
    // ignore
  }

  // 3. Fallback to guaranteed visual archive asset so all visitors see every milestone photograph
  if (PHOTO_VISUAL_ASSETS[fileName]) {
    return PHOTO_VISUAL_ASSETS[fileName];
  }

  return null;
}

export async function getAllStoredPhotos(): Promise<Record<string, string>> {
  const result: Record<string, string> = { ...PHOTO_VISUAL_ASSETS };

  // Pull from localStorage
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (key && key.startsWith(LOCAL_STORAGE_PREFIX)) {
          const fileName = key.replace(LOCAL_STORAGE_PREFIX, '');
          const val = window.localStorage.getItem(key);
          if (val) result[fileName] = val;
        }
      }
    }
  } catch {
    // ignore
  }

  // Pull from IndexedDB
  try {
    const db = await getDb();
    await new Promise<void>((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => {
        for (const item of req.result || []) {
          result[item.fileName] = item.dataUrl;
        }
        resolve();
      };
      req.onerror = () => resolve();
    });
  } catch {
    // ignore
  }

  return result;
}

// Generate candidate paths to check for the image file
export function getPhotoUrlCandidates(fileName: string): string[] {
  const encoded = encodeURIComponent(fileName);
return [
  `/photos/${encoded}`,
  `/photos/${fileName}`,
];
}
