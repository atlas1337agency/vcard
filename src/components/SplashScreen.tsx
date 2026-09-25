import { useState, useEffect } from 'react';

interface SplashScreenProps {
  onComplete?: () => void;
  minDuration?: number;
}

export default function SplashScreen({ onComplete, minDuration = 1100 }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const startTime = performance.now();
    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / minDuration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        // Smooth fade-out transition
        setTimeout(() => {
          setIsFading(true);
          setTimeout(() => {
            setIsHidden(true);
            if (onComplete) onComplete();
          }, 450);
        }, 150);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [minDuration, onComplete]);

  const handleSkip = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsHidden(true);
      if (onComplete) onComplete();
    }, 250);
  };

  if (isHidden) return null;

  return (
    <div
      onClick={handleSkip}
      role="status"
      aria-label="Loading ATLAS 1337 Agency"
      className={`fixed inset-0 z-[99999] bg-[#08080c] flex flex-col items-center justify-center p-6 select-none cursor-pointer transition-all duration-500 ease-out overflow-hidden ${
        isFading ? 'opacity-0 scale-[1.02] pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[500px] h-[380px] sm:h-[500px] bg-gradient-to-tr from-indigo-600/25 via-purple-600/20 to-fuchsia-600/25 rounded-full blur-[90px] animate-pulse pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] bg-purple-500/20 rounded-full blur-[60px] pointer-events-none" />

      {/* Cyber Subtle Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Modern Centered Stage: Just Big Favicon Logo & Sleek Loader */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-[360px] sm:max-w-[420px]">
        {/* Single Big Logo without box or frame */}
        <div className="relative mb-10 flex items-center justify-center">
          <div className="absolute -inset-8 bg-gradient-to-tr from-purple-600/35 to-indigo-600/35 rounded-full blur-2xl opacity-80 animate-pulse pointer-events-none" />
          <img
            src="/images/favicon.png"
            alt="ATLAS 1337 Logo"
            className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 object-contain filter drop-shadow-[0_0_35px_rgba(168,85,247,0.55)] transition-transform duration-500"
          />
        </div>

        {/* Minimalist Modern Loader Bar */}
        <div className="w-48 sm:w-56 flex flex-col items-center gap-3">
          <div className="w-full h-1 sm:h-1.5 bg-white/10 rounded-full overflow-hidden relative shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-400 to-fuchsia-500 rounded-full transition-all duration-75 ease-out shadow-[0_0_12px_rgba(217,70,239,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Minimalist Percentage Status */}
          <div className="flex items-center justify-between w-full text-[11px] font-mono tracking-widest text-slate-400/90 font-medium">
            <span className="text-indigo-400/90 uppercase text-[10px]">Loading</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
