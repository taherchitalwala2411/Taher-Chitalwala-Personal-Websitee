import React, { useEffect, useState } from 'react';

interface AscendingGraphLoaderProps {
  isVisible: boolean;
}

export const AscendingGraphLoader: React.FC<AscendingGraphLoaderProps> = ({
  isVisible,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  // 5 graph bars strictly in ascending height order (smallest to largest)
  const barHeights = [22, 40, 60, 80, 100]; // percentages of graph height

  useEffect(() => {
    if (!isVisible) {
      setActiveStep(0);
      return;
    }

    setActiveStep(1);
    const intervals: NodeJS.Timeout[] = [];

    barHeights.forEach((_, index) => {
      const timer = setTimeout(() => {
        setActiveStep(index + 1);
      }, (index + 1) * 80);
      intervals.push(timer);
    });

    return () => {
      intervals.forEach(clearTimeout);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <aside
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/40 dark:bg-black/50 backdrop-blur-xs animate-in fade-in duration-150 pointer-events-none"
      role="status"
      aria-label="Loading"
    >
      {/* Very small minimalist container with zero text */}
      <div className="flex items-center justify-center p-3.5 sm:p-4 rounded-2xl bg-stone-900/90 dark:bg-stone-950/95 border border-stone-800 shadow-xl backdrop-blur-md animate-in zoom-in-95 duration-150">
        {/* Ascending graph bars area */}
        <div className="flex items-end justify-center gap-1.5 h-9 w-16 px-1">
          {barHeights.map((targetHeight, index) => {
            const isFilled = activeStep >= index + 1;
            return (
              <div
                key={index}
                className="flex-1 max-w-[8px] bg-stone-800/80 rounded-t-sm overflow-hidden flex flex-col justify-end h-full"
              >
                <div
                  style={{
                    height: isFilled ? `${targetHeight}%` : '8%',
                    transition: 'height 240ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                  className={`w-full rounded-t-sm transition-all ${
                    isFilled
                      ? 'bg-gradient-to-t from-[#8B1E28] to-[#E11D48] shadow-[0_0_8px_rgba(225,29,72,0.6)]'
                      : 'bg-stone-700/40'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
