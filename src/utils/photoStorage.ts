// Client-side IndexedDB photo cache and helper
const DB_NAME = 'taher_portfolio_photos';
const DB_VERSION = 1;
const STORE_NAME = 'photos';

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
  try {
    const db = await getDb();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const req = store.put({ fileName, dataUrl, updatedAt: Date.now() });
      req.onsuccess = () => {
        window.dispatchEvent(new CustomEvent('portfolio-photo-updated', { detail: { fileName } }));
        resolve();
      };
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Failed to save photo to IndexedDB', err);
  }
}

export async function getPhoto(fileName: string): Promise<string | null> {
  try {
    const db = await getDb();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const req = store.get(fileName);
      req.onsuccess = () => {
        resolve(req.result ? req.result.dataUrl : null);
      };
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function getAllStoredPhotos(): Promise<Record<string, string>> {
  try {
    const db = await getDb();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => {
        const result: Record<string, string> = {};
        for (const item of req.result || []) {
          result[item.fileName] = item.dataUrl;
        }
        resolve(result);
      };
      req.onerror = () => resolve({});
    });
  } catch {
    return {};
  }
}

// Generate possible local paths for an image filename
export function getPhotoUrlCandidates(fileName: string): string[] {
  const encoded = encodeURIComponent(fileName);
  return [
    `/photos/${fileName}`,
    `/photos/${encoded}`,
    `/${fileName}`,
    `/${encoded}`,
    `./photos/${fileName}`,
  ];
}
