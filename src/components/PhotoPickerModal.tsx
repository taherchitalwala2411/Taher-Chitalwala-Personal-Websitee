import React, { useState, useRef } from 'react';
import { X, Image as ImageIcon, Upload, Check, Trash2 } from 'lucide-react';
import { galleryPhotos } from '../data/portfolioData';
import { PortfolioImage } from './PortfolioImage';
import { savePhoto } from '../utils/photoStorage';

interface PhotoPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  currentPhotoName?: string | null;
  onSelectPhoto: (fileName: string) => void;
  onRemovePhoto?: () => void;
}

export const PhotoPickerModal: React.FC<PhotoPickerModalProps> = ({
  isOpen,
  onClose,
  title = 'Select a Photograph',
  currentPhotoName,
  onSelectPhoto,
  onRemovePhoto,
}) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(currentPhotoName || null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const result = reader.result as string;
      const customFileName = file.name || `photo-${Date.now()}.jpg`;
      await savePhoto(customFileName, result);
      setIsUploading(false);
      onSelectPhoto(customFileName);
      onClose();
    };
    reader.onerror = () => setIsUploading(false);
    reader.readAsDataURL(file);
  };

  const handleConfirm = () => {
    if (selectedFile) {
      onSelectPhoto(selectedFile);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-7 max-h-[88vh] flex flex-col text-stone-900 dark:text-stone-100 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
          <div>
            <h3 className="text-lg font-bold text-stone-950 dark:text-stone-50 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#8B1E28] dark:text-[#E11D48]" />
              <span>{title}</span>
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Choose an existing portfolio photo or upload a new photo from your device.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action bar: Upload & Remove */}
        <div className="py-3 flex items-center justify-between gap-3 border-b border-stone-100 dark:border-stone-800">
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-semibold transition-colors cursor-pointer border border-stone-200/80 dark:border-stone-700"
            >
              <Upload className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
              <span>{isUploading ? 'Uploading...' : 'Upload New File from Device'}</span>
            </button>
          </div>

          {currentPhotoName && onRemovePhoto && (
            <button
              type="button"
              onClick={() => {
                onRemovePhoto();
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 text-xs font-semibold transition-colors cursor-pointer border border-rose-200/60 dark:border-rose-800/60"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove Photo from this Item</span>
            </button>
          )}
        </div>

        {/* Thumbnail Grid */}
        <div className="flex-1 overflow-y-auto py-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {galleryPhotos.map((photo) => {
            const isSelected = selectedFile === photo.fileName;
            return (
              <div
                key={photo.id}
                onClick={() => setSelectedFile(photo.fileName)}
                className={`relative rounded-xl border-2 p-2 transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#8B1E28] dark:border-[#E11D48] ring-2 ring-[#8B1E28]/20 dark:ring-[#E11D48]/30 bg-rose-50/20 dark:bg-rose-950/20 shadow-xs'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 bg-stone-50/50 dark:bg-stone-800/40'
                }`}
              >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800 mb-1.5">
                  <PortfolioImage
                    fileName={photo.fileName}
                    alt={photo.title}
                    aspectRatioClass="w-full h-full"
                    showZoomIcon={false}
                    showFitToggle={false}
                    allowScaleControl={false}
                    defaultFit="cover"
                  />
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-md bg-[#8B1E28] dark:bg-[#E11D48] text-white flex items-center justify-center shadow-xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-[11px] font-bold text-stone-900 dark:text-stone-100 truncate">
                    {photo.title}
                  </p>
                  <p className="text-[10px] text-stone-500 dark:text-stone-400 truncate font-mono">
                    {photo.fileName}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
          <span className="text-xs text-stone-500 dark:text-stone-400 truncate">
            {selectedFile ? `Selected: ${selectedFile}` : 'Click a photo to select'}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!selectedFile}
              onClick={handleConfirm}
              className="px-4.5 py-2 text-xs font-bold text-white dark:text-stone-950 bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white/90 disabled:opacity-50 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Apply Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
