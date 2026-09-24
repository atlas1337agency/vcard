import {
  Brain,
  Check,
  Copy,
  Download,
  GraduationCap,
  Instagram,
  Linkedin,
  Info,
  MousePointerClick,
  PlusSquare,
  QrCode,
  Share,
  Smartphone,
  X,
  Youtube,
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { DiscordIcon, TelegramIcon, TikTokIcon, WhatsAppIcon, KickIcon, RedditIcon } from './components/icons';

import CustomCursor from './components/CustomCursor';

// Space Links
const SPACE_LINKS = [
  {
    id: 'atlas-agency',
    title: 'ATLAS 1337 Agency',
    icon: <MousePointerClick className="w-5 h-5" />,
    href: 'https://atlas1337agency.vercel.app',
  },
  {
    id: 'skilliq-school',
    title: 'Skilliq - Virtual School',
    icon: <GraduationCap className="w-5 h-5" />,
    href: 'https://skilliq.vercel.app',
  },
];

// Tools Links
const TOOLS_LINKS = [
  {
    id: 'atlas-free-tools',
    title: 'ATLAS 1337 - Free Tools',
    icon: <QrCode className="w-5 h-5" />,
    href: 'https://nexa1337.github.io/toolv2/',
  },
  {
    id: 'atlas-mind-map',
    title: 'ATLAS 1337 - Mind Map',
    icon: <Brain className="w-5 h-5" />,
    href: 'https://nexa1337.github.io/tool/',
  },
  {
    id: 'atlas-secret-area',
    title: 'SecretArea - Free Games & Tools',
    icon: (
      <img
        src="/images/secretlogo.png"
        alt="SecretArea"
        className="w-8 h-8 object-contain scale-[1.2] drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] rounded-md"
      />
    ),
    href: 'https://secretarea.vercel.app/',
  },
];

// Exclusive SecretArea Community & Streaming Links
const EXCLUSIVE_LINKS = [
  { id: 'kick', title: 'Kick', icon: <KickIcon className="w-full h-full text-[#53fc19]" />, href: 'https://kick.com/secretarea1337' },
  { id: 'tiktok', title: 'TikTok', icon: <TikTokIcon className="w-full h-full text-white" />, href: 'https://www.tiktok.com/@secretarea1337' },
  { id: 'youtube', title: 'YouTube', icon: <Youtube className="w-full h-full text-[#ff0000]" />, href: 'https://www.youtube.com/@SecretArea1337' },
  { id: 'telegram', title: 'Telegram', icon: <TelegramIcon className="w-full h-full text-[#229ED9]" />, href: 'https://t.me/secretarea1337' },
  { id: 'discord', title: 'Discord', icon: <DiscordIcon className="w-full h-full text-[#5865F2]" />, href: 'https://discord.gg/pygmDWFAHK' },
  { id: 'reddit', title: 'Reddit', icon: <RedditIcon className="w-full h-full text-[#ff4500]" />, href: 'https://www.reddit.com/r/SecretArea1337/' },
];

// Header Social Links (telegram & discord removed as requested, pointing to atlas1337agency)
const SOCIAL_LINKS = [
  { id: 'linkedin', title: 'LinkedIn', icon: <Linkedin className="w-full h-full" />, href: 'https://www.linkedin.com/in/atlas1337agency' },
  { id: 'instagram', title: 'Instagram', icon: <Instagram className="w-full h-full" />, href: 'https://instagram.com/atlas1337agency' },
  { id: 'tiktok', title: 'TikTok', icon: <TikTokIcon className="w-full h-full" />, href: 'https://tiktok.com/@atlas1337agency' },
  { id: 'whatsapp', title: 'WhatsApp', icon: <WhatsAppIcon className="w-full h-full" />, href: 'https://wa.me/+212723242286' },
];

export default function App() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showShortcutModal, setShowShortcutModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [installMessage, setInstallMessage] = useState<string | null>(null);

  useEffect(() => {
    // Listen for the native PWA install event (Android/Chrome)
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);

    // Escape key listener to close modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowShortcutModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          console.log('User accepted the install prompt');
        }
        setDeferredPrompt(null);
        setShowShortcutModal(false);
      } catch (err) {
        console.error('Error during prompt:', err);
      }
    } else {
      setInstallMessage("Tap browser share & select 'Add to Home Screen'");
      setTimeout(() => setInstallMessage(null), 5000);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#08080c] text-white flex justify-center font-sans relative overflow-x-hidden">
      <CustomCursor />
      {/* Background gradients from Immersive UI theme */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[140px]" />
      </div>
      
      {/* Subtle noise overlay */}
      <div 
        className="fixed inset-0 z-0 opacity-20 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      <main className="w-full max-w-[420px] relative z-10 px-6 pt-12 pb-28 md:pb-12 flex flex-col items-center">
        {/* Profile / Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
            {/* Outer animated ripple rings */}
            <div className="absolute inset-0 rounded-full border border-indigo-500/40 animate-[ping_3s_ease-out_infinite]" />
            <div className="absolute inset-2 rounded-full border border-fuchsia-500/30 animate-[ping_3s_ease-out_infinite]" style={{ animationDelay: '1.5s' }} />
            
            {/* Main Avatar Container */}
            <div className="relative w-28 h-28 rounded-full shadow-lg shadow-indigo-500/20">
              {/* Spinning gradient border */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 animate-[spin_4s_linear_infinite]" />
              
              {/* Profile Logo */}
              <div className="absolute inset-[3px] rounded-full flex items-center justify-center bg-[#0d0d12] overflow-hidden z-10 p-1">
                <img 
                  src="/images/logo.png" 
                  alt="ATLAS 1337 Agency Logo" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold tracking-tight text-white mb-2">ATLAS 1337 Agency</h1>
          <p className="text-center text-sm font-medium text-slate-400 max-w-[320px] leading-relaxed">
            Ambition • Technology • Learn • Automate • Scale
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-6 mb-10 w-full flex-wrap">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-5 h-5 opacity-40 grayscale contrast-125 hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer flex items-center justify-center hover:scale-110"
              aria-label={link.title}
              title={link.title}
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Links Sections */}
        <div className="w-full flex flex-col gap-10">
          
          {/* Space Section */}
          <section className="flex flex-col gap-3.5">
            <h2 className="text-center text-sm font-bold tracking-wide mb-1 text-white">ATLAS 1337 Space</h2>
            {SPACE_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full py-4 px-6 bg-white/[0.04] border border-white/10 rounded-2xl text-white text-[15px] font-semibold flex items-center justify-between shadow-sm overflow-hidden hover:border-white/20 transition-all duration-300"
              >
                {/* Subtle sheen effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
                    {link.icon}
                  </div>
                  <span>{link.title}</span>
                </div>
                <span className="opacity-30 group-hover:opacity-100 transition-opacity relative z-10 text-white font-normal">→</span>
              </a>
            ))}
          </section>

          {/* Tools Section */}
          <section className="flex flex-col gap-3.5">
            <h2 className="text-center text-sm font-bold tracking-wide mb-1 text-white">ATLAS 1337 Tools</h2>
            {TOOLS_LINKS.map((link) => (
              <React.Fragment key={link.id}>
                {link.id === 'atlas-secret-area' && (
                  <div className="flex flex-col gap-4 mt-4 mb-1">
                    <div className="flex items-center gap-4 opacity-90">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-fuchsia-500/50" />
                      <span className="text-[10px] uppercase tracking-[0.2em] text-fuchsia-300 font-bold">Exclusive</span>
                      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-fuchsia-500/50" />
                    </div>
                    
                    {/* Exclusive Community & Streaming Links */}
                    <div className="flex items-center justify-center gap-5 w-full mb-1 flex-wrap">
                      {EXCLUSIVE_LINKS.map((sLink) => (
                        <a
                          key={sLink.id}
                          href={sLink.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 opacity-75 hover:opacity-100 transition-all hover:scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] flex items-center justify-center"
                          aria-label={sLink.title}
                          title={sLink.title}
                        >
                          {sLink.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                <div className={link.id === 'atlas-secret-area' ? "relative w-full mt-2" : "w-full"}>
                  {link.id === 'atlas-secret-area' && (
                    <div className="absolute -top-2.5 right-4 z-20 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.4)] border border-white/10">
                      <Info className="w-2.5 h-2.5 text-white/90" />
                      <span className="text-[9px] font-bold text-white tracking-wide">Sponsored</span>
                    </div>
                  )}
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative w-full ${
                    link.id === 'atlas-secret-area'
                      ? 'py-3.5 bg-gradient-to-r from-fuchsia-500/10 via-purple-500/5 to-indigo-500/10 border border-fuchsia-500/30 shadow-[0_0_15px_rgba(217,70,239,0.15)] hover:shadow-[0_0_25px_rgba(217,70,239,0.25)] hover:border-fuchsia-500/50'
                      : 'py-4 bg-white/[0.04] border border-white/10 shadow-sm hover:border-white/20'
                  } px-6 rounded-2xl text-white font-semibold flex items-center justify-between overflow-hidden transition-all duration-300`}
                >
                {/* Subtle sheen effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                
                <div className="flex items-center gap-3 relative z-10 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-fuchsia-500/10 flex items-center justify-center text-fuchsia-400 shrink-0">
                    {link.icon}
                  </div>
                  <div className="flex flex-col items-start gap-0.5 overflow-hidden py-0.5">
                    <span className={`${link.id === 'atlas-secret-area' ? 'text-[12px] sm:text-[13px] whitespace-normal leading-tight' : 'text-[15px] truncate'} w-full`}>{link.title}</span>
                  </div>
                </div>
                <span className="opacity-30 group-hover:opacity-100 transition-opacity relative z-10 text-white font-normal ml-3 shrink-0">→</span>
                  </a>
                </div>
              </React.Fragment>
            ))}
          </section>

        </div>
      </main>

      {/* Mobile Bottom Navbar (visible only on mobile mode) */}
      <nav 
        aria-label="Mobile Navigation"
        className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#08080d]/85 backdrop-blur-2xl border-t border-white/10 px-4 py-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex items-center justify-center shadow-[0_-10px_35px_rgba(0,0,0,0.85)]"
      >
        {/* Center logo button */}
        <button
          type="button"
          onClick={() => setShowShortcutModal(true)}
          aria-label="Download Shortcut"
          title="Download Shortcut"
          className="group relative flex items-center justify-center p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 rounded-2xl active:scale-90 transition-transform duration-200 cursor-pointer"
        >
          {/* Ambient gradient glow behind center button */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500/40 via-purple-500/40 to-fuchsia-500/40 blur-md opacity-80 group-hover:opacity-100 group-hover:blur-lg transition-all" />

          {/* Button box container */}
          <div className="relative w-12 h-12 rounded-2xl bg-[#0c0c14] border border-white/20 p-2 flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:border-fuchsia-500/50 group-hover:bg-[#11111d] transition-colors">
            <img
              src="/images/favicon.png"
              alt="ATLAS 1337"
              className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(192,132,252,0.6)] group-hover:scale-110 transition-transform duration-200"
            />
          </div>
        </button>
      </nav>

      {/* Download Shortcut Popup Modal */}
      {showShortcutModal && (
        <div 
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowShortcutModal(false);
          }}
        >
          <div className="relative w-full max-w-[390px] bg-[#0c0c14]/95 border border-white/15 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl flex flex-col items-center text-center animate-slide-up overflow-hidden">
            {/* Ambient decorative glows */}
            <div className="absolute -top-16 -left-16 w-44 h-44 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-44 h-44 bg-fuchsia-600/20 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowShortcutModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Glowing App Icon */}
            <div className="relative mb-3 mt-1">
              <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-2xl blur-md opacity-50 animate-pulse" />
              <div className="relative w-16 h-16 rounded-2xl bg-[#12121e] border border-white/20 p-2.5 flex items-center justify-center shadow-xl shadow-fuchsia-500/20">
                <img
                  src="/images/favicon.png"
                  alt="ATLAS 1337 Agency"
                  className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(217,70,239,0.6)]"
                />
              </div>
            </div>

            {/* Modal Title & Info */}
            <h3 className="text-xl font-bold text-white tracking-tight">Download Shortcut</h3>
            <p className="text-xs text-slate-400 mt-1.5 max-w-[300px] leading-relaxed">
              Add ATLAS 1337 Agency to your phone&apos;s home screen for fast 1-tap access and a full-screen app experience.
            </p>

            {/* Direct PWA Install Button (if browser supports beforeinstallprompt) */}
            {deferredPrompt && (
              <button
                type="button"
                onClick={handleInstall}
                className="w-full mt-5 py-3 px-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-fuchsia-500/25 hover:shadow-fuchsia-500/40 active:scale-[0.98] transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Install Shortcut Now</span>
              </button>
            )}

            {/* Step-by-step Instructions for Mobile */}
            <div className="w-full mt-4 bg-white/[0.04] border border-white/10 rounded-2xl p-4 text-left space-y-3">
              <div className="flex items-center gap-2 text-slate-300 font-semibold text-[11px] uppercase tracking-wider">
                <Smartphone className="w-3.5 h-3.5 text-fuchsia-400" />
                <span>Quick Mobile Setup</span>
              </div>

              <div className="space-y-2 text-slate-300 text-xs">
                <div className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div className="leading-snug">
                    Tap the browser <strong className="text-white">Share</strong> button <Share className="inline w-3.5 h-3.5 text-blue-400 mx-0.5 -mt-0.5" /> or menu <strong className="text-white">⋮</strong>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-fuchsia-500/20 text-fuchsia-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <div className="leading-snug">
                    Select <strong className="text-white">Add to Home Screen</strong> <PlusSquare className="inline w-3.5 h-3.5 text-fuchsia-400 mx-0.5 -mt-0.5" /> or <strong className="text-white">Install App</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Message if any */}
            {installMessage && (
              <p className="mt-3 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg">
                {installMessage}
              </p>
            )}

            {/* Copy Link Utility Button */}
            <div className="w-full flex items-center gap-2 mt-4">
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex-1 py-2.5 px-3 bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowShortcutModal(false)}
                className="py-2.5 px-5 bg-white text-black hover:bg-slate-200 rounded-xl text-xs font-bold transition-all active:scale-[0.98] cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop QR Code */}
      <div className="hidden lg:flex fixed bottom-8 right-8 flex-col items-center gap-3 z-40 animate-slide-up">
        <span className="text-white text-[13px] font-bold tracking-wide">View on mobile</span>
        <img src="/code.png" alt="QR Code" className="w-32 h-32 rounded-xl shadow-2xl object-contain" />
      </div>
    </div>
  );
}
