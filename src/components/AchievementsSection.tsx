import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Award,
  Star,
  ArrowRight,
  Plus,
  CheckCircle2,
  Image as ImageIcon,
  Trash2,
  Sparkles,
} from 'lucide-react';
import { achievementsList, personalInfo } from '../data/portfolioData';
import { PortfolioImage } from './PortfolioImage';
import { AchievementItem } from '../types/portfolio';
import { PhotoPickerModal } from './PhotoPickerModal';
import {
  getAchievementPhoto,
  setAchievementPhoto,
  removeAchievementPhoto,
} from '../utils/customPhotoAssignments';

interface AchievementsSectionProps {
  isFullView?: boolean;
  onViewAll?: () => void;
  onOpenPhoto: (fileName: string, title: string) => void;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  isFullView = false,
  onViewAll,
  onOpenPhoto,
}) => {
  const [filter, setFilter] = useState<'all' | 'academic' | 'leadership' | 'sports' | 'extracurricular'>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [customAchievements, setCustomAchievements] = useState<AchievementItem[]>(() => {
    try {
      const saved = localStorage.getItem('taher_custom_achievements');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // State for active photo picker modal on an achievement card
  const [pickerTarget, setPickerTarget] = useState<{
    id: string;
    title: string;
    currentPhoto?: string | null;
  } | null>(null);

  // Counter to force re-render when photo overrides change
  const [assignmentVersion, setAssignmentVersion] = useState(0);

  useEffect(() => {
    const handleUpdate = () => {
      setAssignmentVersion((v) => v + 1);
    };
    window.addEventListener('taher-photo-assignments-updated', handleUpdate);
    return () => {
      window.removeEventListener('taher-photo-assignments-updated', handleUpdate);
    };
  }, []);

  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newCategory, setNewCategory] = useState<'academic' | 'leadership' | 'sports' | 'extracurricular'>('academic');
  const [newDescription, setNewDescription] = useState('');

  const allAchievements = [...achievementsList, ...customAchievements];
  const displayedAchievements = isFullView
    ? filter === 'all'
      ? allAchievements
      : allAchievements.filter((a) => a.category === filter)
    : achievementsList.slice(0, 5);

  const handleAddAchievement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newItem: AchievementItem = {
      id: `custom-${Date.now()}`,
      title: newTitle.trim(),
      subtitle: newSubtitle.trim() || undefined,
      category: newCategory,
      year: 'Recent Milestone',
      description: newDescription.trim() || 'Additional accomplishment added to personal milestones.',
      badge: 'New Achievement',
    };
    const updated = [newItem, ...customAchievements];
    setCustomAchievements(updated);
    try {
      localStorage.setItem('taher_custom_achievements', JSON.stringify(updated));
    } catch {}
    setNewTitle('');
    setNewSubtitle('');
    setNewDescription('');
    setShowAddForm(false);
  };

  const handleApplyPhoto = (fileName: string) => {
    if (pickerTarget) {
      setAchievementPhoto(pickerTarget.id, fileName);
      setPickerTarget(null);
    }
  };

  const handleRemovePhoto = () => {
    if (pickerTarget) {
      removeAchievementPhoto(pickerTarget.id);
      setPickerTarget(null);
    }
  };

  return (
    <>
      <section id="achievements" className="py-16 md:py-22 border-t border-stone-200/80 dark:border-stone-800 bg-[#FAF9F5] dark:bg-[#121110] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8B1E28] dark:text-[#E11D48]">
                03 · Milestones & Honors
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-950 dark:text-stone-50 mt-1">
                Achievements
              </h2>
            </div>
            <p className="text-sm text-stone-500 dark:text-stone-400 max-w-md">
              Earned through sustained academic focus, student governance, sports competition, and MUN diplomacy.
            </p>
          </div>

          {/* Featured Trophy Shelf Showcase */}
          <div className="mb-12 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 p-6 sm:p-8 shadow-xs overflow-hidden transition-colors">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 order-2 lg:order-1 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#8B1E28]/10 dark:bg-[#E11D48]/15 text-[#8B1E28] dark:text-[#E11D48] text-xs font-semibold">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>Featured Achievement Showcase</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-950 dark:text-stone-50 tracking-tight">
                  The "I Can & I Will" Shelf of Milestones
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  A physical testament to years of dedicated effort across disciplines: Saifi High School Head Boy memento, SSC Topper 1st Rank trophy, Shining Star, Bandra Carrom Doubles, Kho-Kho Best Player, and over 15 Olympiad and athletic medals.
                </p>
                <div className="pt-2 flex items-center gap-4 text-xs font-medium text-stone-500 dark:text-stone-400">
                  <span>· 15+ Medals & Cups</span>
                  <span>· School & Junior College</span>
                  <span>· Multi-Discipline</span>
                </div>
              </div>

              <div className="lg:col-span-7 order-1 lg:order-2">
                <div className="rounded-xl overflow-hidden border border-stone-200/90 dark:border-stone-700 shadow-sm bg-stone-50/90 dark:bg-stone-800/80 p-2">
                  <PortfolioImage
                    fileName={personalInfo.trophiesPhoto}
                    alt="Trophy showcase with medals and awards"
                    title="The 'I Can & I Will' shelf with medals, trophies and academic mementos"
                    category="Achievements Showcase"
                    aspectRatioClass="aspect-[4/3] sm:aspect-[16/11] max-h-[440px] w-full"
                    defaultFit="contain"
                    onClick={() =>
                      onOpenPhoto(
                        personalInfo.trophiesPhoto,
                        'The "I Can & I Will" shelf with medals, trophies, and academic mementos'
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Filter controls if in full view */}
          {isFullView && (
            <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-stone-200/70 dark:border-stone-800">
              {(
                [
                  { id: 'all', label: 'All Milestones' },
                  { id: 'academic', label: 'Academic' },
                  { id: 'leadership', label: 'Leadership' },
                  { id: 'sports', label: 'Sports & Athletics' },
                  { id: 'extracurricular', label: 'Diplomacy & Others' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    filter === tab.id
                      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 shadow-xs'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 hover:bg-stone-200/70 dark:hover:bg-stone-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}

              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-stone-300 dark:border-stone-700 hover:border-stone-500 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 text-xs font-medium transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{showAddForm ? 'Close Form' : 'Add Future Milestone'}</span>
              </button>
            </div>
          )}

          {/* Expandable Add Achievement Form */}
          {isFullView && showAddForm && (
            <form
              onSubmit={handleAddAchievement}
              className="mb-10 p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 shadow-sm space-y-4 animate-in fade-in duration-200"
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                  Add a New Achievement or Milestone
                </h4>
                <span className="text-xs text-stone-400 dark:text-stone-500">Stored locally in your browser</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Achievement Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. University Case Competition Winner"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-md border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:bg-white dark:focus:bg-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-stone-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-md border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:bg-white dark:focus:bg-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-stone-100"
                  >
                    <option value="academic">Academic</option>
                    <option value="leadership">Leadership</option>
                    <option value="sports">Sports</option>
                    <option value="extracurricular">Diplomacy / Others</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Organization / Context
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Hinduja College · Annual Business Symposium"
                    value={newSubtitle}
                    onChange={(e) => setNewSubtitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-md border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:bg-white dark:focus:bg-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-stone-100"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Brief Description
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Details of the recognition, competition format, and impact..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-md border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:bg-white dark:focus:bg-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-stone-100"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-3 py-1.5 text-xs text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white dark:text-stone-950 bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white/90 rounded-md shadow-xs cursor-pointer"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          )}

          {/* Achievements Grid with Add/Remove Photo Controls on Every Item */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedAchievements.map((item) => {
              // Read effective photo, respecting any user customization or removal
              const effectivePhoto = getAchievementPhoto(item.id, item.photoName);

              return (
                <div
                  key={`${item.id}-${assignmentVersion}`}
                  className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  {/* Photo Container if photo is active */}
                  {effectivePhoto ? (
                    <div className="border-b border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50 p-2 relative group">
                      <PortfolioImage
                        fileName={effectivePhoto}
                        alt={item.photoAlt || item.title}
                        title={item.title}
                        category={item.badge || 'Achievement Photo'}
                        aspectRatioClass="aspect-[16/11] bg-stone-100/50 dark:bg-stone-800/80 rounded-lg overflow-hidden"
                        defaultFit="contain"
                        onClick={() =>
                          onOpenPhoto(effectivePhoto, `${item.title} — ${item.subtitle || ''}`)
                        }
                      />

                      {/* Photo Control Bar on the card (Change or Remove Photo) */}
                      <div className="mt-2 flex items-center justify-between text-[11px] px-1">
                        <button
                          type="button"
                          onClick={() =>
                            setPickerTarget({
                              id: item.id,
                              title: `Change Photo for "${item.title}"`,
                              currentPhoto: effectivePhoto,
                            })
                          }
                          className="text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <ImageIcon className="w-3 h-3 text-[#8B1E28] dark:text-[#E11D48]" />
                          <span>Change Photo</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => removeAchievementPhoto(item.id)}
                          className="text-rose-600 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-300 font-semibold flex items-center gap-1 cursor-pointer"
                          title="Remove photo from this achievement"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  ) : null}

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#8B1E28] dark:text-[#E11D48] font-bold">
                          {item.badge}
                        </span>
                        {item.year && (
                          <span className="text-[11px] font-mono text-stone-400 dark:text-stone-500">
                            {item.year}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-stone-950 dark:text-stone-50 leading-snug">
                        {item.title}
                      </h3>

                      {item.subtitle && (
                        <p className="text-xs font-medium text-stone-500 dark:text-stone-400 mt-1">
                          {item.subtitle}
                        </p>
                      )}

                      <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-3 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Option to Add Photo if none attached */}
                    {!effectivePhoto && (
                      <div className="mt-5 pt-3 border-t border-stone-100 dark:border-stone-800">
                        <button
                          type="button"
                          onClick={() =>
                            setPickerTarget({
                              id: item.id,
                              title: `Attach Photo to "${item.title}"`,
                              currentPhoto: null,
                            })
                          }
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5 text-[#8B1E28] dark:text-[#E11D48]" />
                          <span>Add Photo to this Achievement</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* View All CTA on Home Page preview */}
          {!isFullView && onViewAll && (
            <div className="mt-12 text-center">
              <button
                onClick={onViewAll}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 text-xs font-bold hover:bg-stone-800 dark:hover:bg-white/90 transition-all shadow-sm cursor-pointer hover:-translate-y-0.5"
              >
                <span>View All Achievements & Awards ({achievementsList.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Photo Picker Modal for Achievements */}
      {pickerTarget && (
        <PhotoPickerModal
          isOpen={true}
          onClose={() => setPickerTarget(null)}
          title={pickerTarget.title}
          currentPhotoName={pickerTarget.currentPhoto}
          onSelectPhoto={handleApplyPhoto}
          onRemovePhoto={pickerTarget.currentPhoto ? handleRemovePhoto : undefined}
        />
      )}
    </>
  );
};
