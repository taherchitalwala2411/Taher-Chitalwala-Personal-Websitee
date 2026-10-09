import React from 'react';

interface TopProgressBarProps {
  isVisible: boolean;
  progress: number; // 0 to 100
}

/**
 * A subtle linear progress bar at the very top edge of the screen that fills
 * in real-time as a page is navigating and loading its assets.
 */
export const TopProgressBar: React.FC<TopProgressBarProps> = ({
  isVisible,
  progress,
}) => {
  if (!isVisible && progress === 0) return null;

  // Clamped progress between 0 and 100
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[9999] pointer-events-none transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      role="progressbar"
      aria-valuenow={Math.round(clampedProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page navigation progress"
    >
      {/* Background track (super faint to be subtle) */}
      <div className="w-full h-[2.5px] sm:h-[3px] bg-stone-200/20 dark:bg-stone-800/20 overflow-hidden relative">
        {/* Progress Fill Bar */}
        <div
          className="h-full bg-gradient-to-r from-[#8B1E28] via-[#E11D48] to-[#FB7185] shadow-[0_0_10px_rgba(225,29,72,0.7)] transition-[width] duration-150 ease-out relative"
          style={{ width: `${clampedProgress}%` }}
        >
          {/* Subtle glowing tip at the leading head of the progress bar */}
          <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-r from-transparent to-white/80 shadow-[0_0_8px_#FFF] opacity-90" />
        </div>
      </div>
    </div>
  );
};
