import React, { useState, useEffect } from 'react';
import { X, Upload, CheckCircle2, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { getAllStoredPhotos, savePhoto } from '../utils/photoStorage';

interface PhotoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoManagerModal: React.FC<PhotoManagerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [storedPhotos, setStoredPhotos] = useState<Record<string, string>>({});
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const loadStatus = async () => {
    const all = await getAllStoredPhotos();
    setStoredPhotos(all);
  };

  useEffect(() => {
    if (isOpen) {
      loadStatus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBatchUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    let count = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      await new Promise<void>((resolve) => {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const result = event.target?.result as string;
          if (result) {
            await savePhoto(file.name, result);
          }
          count++;
          resolve();
        };
        reader.onerror = () => resolve();
        reader.readAsDataURL(file);
      });
    }

    await loadStatus();
    setIsProcessing(false);
    setStatusMessage(`Successfully loaded and stored ${count} photograph(s)!`);
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // Expected photos in portfolio (removed Dr Batra, podium, and portrait per user instructions)
  const expectedPhotos = [
    'Head boy image 2.jpeg',
    'NIE TOI 2.jpeg',
    'Headboy image.jpeg',
    'SBFL winning.jpeg',
    'Trophies.jpeg',
    'IIMUN EVENT 1.jpeg',
    'IIMUN event 2.jpeg',
    'IIMUN event 3.jpeg',
    'IIMUN event 4.jpeg',
    'IIMun event 5.jpeg',
    'IIMUN event 6.jpeg',
    'WhatsApp Image 2026-10-07 at 8.49.04 AM.jpeg',
    'with Nadir Godrej.jpeg',
    'With Zayed Khan.jpeg',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white dark:bg-[#161B24] rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
          <div>
            <h3 className="text-lg font-bold text-stone-950 dark:text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#8B1E28] dark:text-rose-400" />
              <span>Personal Photograph Manager</span>
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Manage and batch-load your personal photographs directly in browser storage.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Batch Upload Drop Box */}
        <div className="mt-6 p-6 rounded-xl border-2 border-dashed border-stone-300 dark:border-stone-700 hover:border-stone-500 bg-stone-50 dark:bg-stone-900/60 text-center transition-colors">
          <label className="cursor-pointer block">
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleBatchUpload}
            />
            <Upload className="w-8 h-8 text-stone-400 dark:text-stone-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">
              {isProcessing ? 'Processing photos...' : 'Select or Drop Photos Here'}
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-sm mx-auto">
              Select one or multiple images at once (e.g. "NIE TOI 2.jpeg", "Trophies.jpeg", etc.). They will be stored permanently in your browser.
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold hover:bg-stone-800 dark:hover:bg-white transition-colors">
              Browse Files
            </span>
          </label>
        </div>

        {statusMessage && (
          <div className="mt-4 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 text-xs font-medium flex items-center gap-2 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Catalog of photos */}
        <div className="mt-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-3">
            Portfolio Photos Checklist ({Object.keys(storedPhotos).length} Loaded)
          </h4>
          <div className="divide-y divide-stone-100 dark:divide-stone-800 max-h-60 overflow-y-auto pr-1">
            {expectedPhotos.map((name, i) => {
              const isLoaded = !!storedPhotos[name];
              return (
                <div
                  key={i}
                  className="py-2.5 flex items-center justify-between text-xs"
                >
                  <span className="font-mono text-stone-700 dark:text-stone-300 truncate max-w-[280px] sm:max-w-[360px]">
                    {name}
                  </span>
                  {isLoaded ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200/60 dark:border-emerald-800/60">
                      <CheckCircle2 className="w-3 h-3" />
                      Loaded
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] text-stone-400 dark:text-stone-500">
                      <AlertCircle className="w-3 h-3" />
                      Not Loaded
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
