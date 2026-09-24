import { useState, useEffect } from 'react';

interface SplashScreenProps {
  onComplete?: () => void;
  minDuration?: number;
}

export default function SplashScreen({ onComplete, minDuration = 1300 }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Animate progress smoothly from 0 to 100%
    const startTime = performance.now();
    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / minDuration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        // Start fade out animation
        setIsFading(true);
        setTimeout(() => {
          setIsHidden(true);
          if (onComplete) onComplete();
        }, 500); // 500ms exit transition
      }
    }, 25);

    return () => clearInterval(interval);
  }, [minDuration, onComplete]);

  const handleSkip = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsHidden(true);
      if (onComplete) onComplete();
    }, 300);
  };

  if (isHidden) return null;

  return (
    <div
      onClick={handleSkip}
      role="status"
      aria-label="Loading ATLAS 1337 Agency"
      className={`fixed inset-0 z-[99999] bg-[#07070b] flex flex-col items-center justify-center p-6 cursor-pointer select-none transition-all duration-500 ease-out overflow-hidden ${
        isFading ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Dynamic Cyber Ambient Glow Backdrops */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[460px] h-[340px] sm:h-[460px] bg-gradient-to-tr from-indigo-600/25 via-purple-600/20 to-fuchsia-600/30 rounded-full blur-[90px] animate-pulse pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] bg-indigo-500/15 rounded-full blur-[50px] pointer-events-none" />

      {/* Cyber Grid Lines Effect */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Center Logo & Branding Stage */}
      <div className="relative z-10 flex flex-col items-center max-w-[340px] sm:max-w-[420px] w-full text-center">
        {/* Glowing Logo Card Container */}
        <div className="relative w-full max-w-[280px] sm:max-w-[320px] mb-8 flex items-center justify-center group">
          {/* Subtle Ring Glow Behind Logo */}
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-purple-500/30 to-fuchsia-500/20 rounded-3xl blur-xl transition-all duration-700 opacity-80" />
          
          {/* Dark Glass Card Framing the Dark Logo */}
          <div className="relative w-full py-5 px-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl shadow-[0_0_50px_rgba(168,85,247,0.15)] flex items-center justify-center overflow-hidden">
            {/* Shimmer line across logo container */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
            
            <img
              src="/images/logo_dark.png"
              alt="ATLAS 1337 Agency"
              className="w-full h-auto max-h-[120px] sm:max-h-[140px] object-contain filter drop-shadow-[0_0_20px_rgba(192,132,252,0.45)] transition-transform duration-700 ease-out transform scale-100"
            />
          </div>
        </div>

        {/* Agency Title & Futuristic Subtitle */}
        <div className="flex flex-col items-center gap-1.5 mb-8">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
            <h1 className="text-base sm:text-lg font-bold tracking-[0.25em] uppercase text-white/95 drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
              ATLAS 1337
            </h1>
            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-ping" />
          </div>
          <p className="text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase text-slate-400">
            Ambition • Technology • Learn • Automate • Scale
          </p>
        </div>

        {/* Modern Cyber Progress Bar */}
        <div className="w-48 sm:w-56 flex flex-col items-center gap-2.5">
          <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden relative shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-400 to-fuchsia-500 rounded-full transition-all duration-75 ease-out shadow-[0_0_12px_rgba(217,70,239,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between w-full text-[10px] text-slate-400 font-mono tracking-wider">
            <span className="text-indigo-400 font-semibold">INITIALIZING</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-8 text-[11px] text-slate-400/80 tracking-widest uppercase transition-opacity">
        Tap anywhere to enter
      </div>
    </div>
  );
}
