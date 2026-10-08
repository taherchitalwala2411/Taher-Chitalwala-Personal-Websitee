import React, { useState, useRef } from 'react';
import { X, Upload, Plus, Sparkles } from 'lucide-react';
import { GalleryPhoto } from '../types/portfolio';
import { savePhoto } from '../utils/photoStorage';
import { addCustomGalleryPhoto } from '../utils/customPhotoAssignments';

interface AddPhotoToGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotoAdded: (photo: GalleryPhoto) => void;
}

export const AddPhotoToGalleryModal: React.FC<AddPhotoToGalleryModalProps> = ({
  isOpen,
  onClose,
  onPhotoAdded,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<GalleryPhoto['category']>('Speaking & Leadership');
  const [description, setDescription] = useState('');
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const chosenName = file.name || `photo-${Date.now()}.jpg`;
    setFileName(chosenName);

    const reader = new FileReader();
    reader.onload = () => {
      setFilePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !filePreview || !fileName) return;

    setIsUploading(true);
    await savePhoto(fileName, filePreview);

    const newPhoto: GalleryPhoto = {
      id: `custom-photo-${Date.now()}`,
      fileName,
      title: title.trim(),
      category,
      description: description.trim() || 'Personal photograph uploaded by Taher.',
      featured: true,
      date: 'Recent',
    };

    addCustomGalleryPhoto(newPhoto);
    onPhotoAdded(newPhoto);
    setIsUploading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-7 text-stone-900 dark:text-stone-100 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
          <div>
            <h3 className="text-lg font-bold text-stone-950 dark:text-stone-50 flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#8B1E28] dark:text-[#E11D48]" />
              <span>Add New Photo to Gallery</span>
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Upload an image from your device and add it anywhere across your portfolio.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* File input / preview */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
              Select Image *
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            {filePreview ? (
              <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                <img
                  src={filePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-2 right-2 px-2.5 py-1 rounded-md bg-stone-900/80 text-white text-[11px] font-semibold hover:bg-stone-900 transition-colors backdrop-blur-xs cursor-pointer"
                >
                  Change File
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-8 border-2 border-dashed border-stone-300 dark:border-stone-700 hover:border-stone-500 rounded-xl flex flex-col items-center justify-center gap-2 text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors cursor-pointer"
              >
                <Upload className="w-6 h-6 text-stone-400" />
                <span className="text-xs font-semibold">Click to upload photo from your device</span>
                <span className="text-[10px] text-stone-400">JPG, PNG, WEBP</span>
              </button>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              Photo Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Annual Sports Day Ceremony"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-stone-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as GalleryPhoto['category'])}
              className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-stone-100"
            >
              <option value="Speaking & Leadership">Speaking & Leadership</option>
              <option value="IIMUN Events">IIMUN Events</option>
              <option value="Awards & Recognition">Awards & Recognition</option>
              <option value="Dignitaries & Interactions">Dignitaries & Interactions</option>
              <option value="Sports & Passion">Sports & Passion</option>
              <option value="Personal & Moments">Personal & Moments</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              Description (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Context or story behind this photo..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-stone-100"
            />
          </div>

          <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!filePreview || !title.trim() || isUploading}
              className="px-5 py-2 text-xs font-bold text-white dark:text-stone-950 bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white/90 disabled:opacity-50 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              {isUploading ? 'Saving...' : 'Add to Gallery'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
