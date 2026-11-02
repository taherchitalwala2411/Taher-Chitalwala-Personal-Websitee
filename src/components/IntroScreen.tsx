import React, { useState, useEffect, useRef } from 'react';

interface IntroScreenProps {
  onComplete: () => void;
  onStartExit?: () => void;
  forceShow?: boolean;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({
  onComplete,
  onStartExit,
  forceShow = false,
}) => {
  const [phase, setPhase] = useState<'appear' | 'type' | 'complete' | 'exiting'>('appear');
  const [typedText, setTypedText] = useState<string>('');
  const quoteText = 'Be the best so that you can beat the best.';
  const onCompleteRef = useRef(onComplete);
  const onStartExitRef = useRef(onStartExit);

  useEffect(() => {
    onCompleteRef.current = onComplete;
    onStartExitRef.current = onStartExit;
  }, [onComplete, onStartExit]);

  // Phase 1: Logo & name appear smoothly
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('type');
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  // Phase 2: Typewriter effect for the quote
  useEffect(() => {
    if (phase !== 'type') return;

    let idx = 0;
    const interval = setInterval(() => {
      idx += 1;
      if (idx <= quoteText.length) {
        setTypedText(quoteText.slice(0, idx));
      } else {
        clearInterval(interval);
        setPhase('complete');
      }
    }, 45);

    return () => clearInterval(interval);
  }, [phase]);

  // Phase 3: Auto-transition after quote completes smoothly
  useEffect(() => {
    if (phase !== 'complete') return;

    const timer = setTimeout(() => {
      handleEnter();
    }, 1500);

    return () => clearTimeout(timer);
  }, [phase]);

  // Handle ESC key to skip immediately
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        handleEnter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleEnter = () => {
    setPhase('exiting');
    if (onStartExitRef.current) {
      onStartExitRef.current();
    }
    try {
      sessionStorage.setItem('taher_intro_seen', '1');
    } catch {}

    setTimeout(() => {
      onCompleteRef.current();
    }, 700);
  };

  return (
    <div
      onClick={handleEnter}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center px-6 transition-all duration-700 ease-out select-none backdrop-blur-2xl md:backdrop-blur-3xl cursor-pointer ${
        phase === 'exiting' ? 'opacity-0 scale-[1.03] pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        background:
          'radial-gradient(ellipse at center, rgba(193,127,36,0.12) 0%, rgba(10,9,8,0.78) 48%, rgba(6,6,6,0.88) 92%)',
      }}
    >
      {/* Subtle luxury ambient vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03)_0%,transparent_70%)]" />

      {/* Skip Button Top Right */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-10 z-10">
        <button
          onClick={handleEnter}
          className="text-[10px] sm:text-[11px] font-mono tracking-[0.24em] uppercase text-stone-500 hover:text-[#C17F24] transition-colors py-2 px-3 rounded border border-transparent hover:border-[#C17F24]/30 cursor-pointer"
        >
          Skip [ESC]
        </button>
      </div>

      {/* Center Cinematic Card */}
      <div className="relative max-w-2xl w-full flex flex-col items-center text-center">
        {/* Monogram emblem badge */}
        <div className="mb-4 sm:mb-6 animate-in fade-in duration-700">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#C17F24]/40 bg-[#12100E] flex items-center justify-center shadow-[0_0_25px_rgba(193,127,36,0.2)]">
            <span className="font-display text-xl sm:text-2xl text-[#EBE7E1] tracking-wider font-bold">
              TC
            </span>
          </div>
        </div>

        {/* Name in Classy John Abraham Style Display Typography */}
        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl text-[#EBE7E1] tracking-[0.24em] sm:tracking-[0.3em] uppercase leading-none font-normal animate-in fade-in slide-in-from-bottom-3 duration-700">
          TAHER CHITALWALA
        </h1>

        {/* Elegant Amber Divider Line */}
        <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-[#C17F24] to-transparent my-5 sm:my-6 animate-in fade-in duration-1000" />

        {/* Motto / Quote with typewriter animation */}
        <div className="min-h-[44px] sm:min-h-[52px] flex items-center justify-center">
          <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#DCD7CE] tracking-[0.02em] font-light leading-relaxed max-w-xl">
            “{typedText}”
            {phase !== 'complete' && (
              <span className="inline-block w-[2px] h-[0.95em] bg-[#C17F24] ml-1.5 align-middle animate-blink shadow-[0_0_8px_rgba(193,127,36,0.8)]" />
            )}
          </p>
        </div>

        {/* Subtle descriptors */}
        <div className="mt-8 flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-mono text-stone-500">
          <span>South Mumbai</span>
          <span className="text-[#C17F24]">·</span>
          <span>Digital Business</span>
          <span className="text-[#C17F24]">·</span>
          <span>Leadership</span>
        </div>

      </div>

      {/* Bottom Footer Note */}
      <div className="absolute bottom-6 sm:bottom-8 text-center text-[10px] font-mono tracking-[0.2em] uppercase text-stone-600">
        Personal Digital Archive · Est. 2007
      </div>
    </div>
  );
};
