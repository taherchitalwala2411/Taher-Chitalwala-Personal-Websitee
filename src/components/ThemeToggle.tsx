import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  variant?: 'segmented' | 'icon';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'segmented',
  className = '',
}) => {
  const { theme, setTheme, toggleTheme } = useTheme();

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        className={`p-2 rounded-xl transition-all cursor-pointer border ${
          theme === 'dark'
            ? 'bg-stone-800 text-amber-300 hover:text-amber-200 border-stone-700 hover:bg-stone-700/80 shadow-2xs'
            : 'bg-stone-100 text-stone-700 hover:text-stone-950 border-stone-200 hover:bg-stone-200/70 shadow-2xs'
        } ${className}`}
      >
        {theme === 'dark' ? (
          <Sun className="w-4 h-4 transition-transform hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 transition-transform hover:-rotate-12" />
        )}
      </button>
    );
  }

  return (
    <div
      className={`inline-flex items-center p-0.5 rounded-full border transition-colors ${
        theme === 'dark'
          ? 'bg-stone-900 border-stone-700/80 text-stone-400'
          : 'bg-stone-200/80 border-stone-300 text-stone-600'
      } ${className}`}
      role="group"
      aria-label="Theme mode switcher"
    >
      {/* Light Option */}
      <button
        type="button"
        onClick={() => setTheme('light')}
        aria-pressed={theme === 'light'}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide transition-all cursor-pointer ${
          theme === 'light'
            ? 'bg-white text-stone-950 shadow-xs scale-100 font-extrabold'
            : 'text-stone-500 hover:text-stone-800'
        }`}
      >
        <Sun className={`w-3.5 h-3.5 ${theme === 'light' ? 'text-amber-500 fill-amber-500' : ''}`} />
        <span>Light</span>
      </button>

      {/* Dark Option */}
      <button
        type="button"
        onClick={() => setTheme('dark')}
        aria-pressed={theme === 'dark'}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide transition-all cursor-pointer ${
          theme === 'dark'
            ? 'bg-stone-800 text-stone-50 shadow-xs scale-100 font-extrabold'
            : 'text-stone-500 hover:text-stone-200'
        }`}
      >
        <Moon className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-indigo-300 fill-indigo-300' : ''}`} />
        <span>Dark</span>
      </button>
    </div>
  );
};
