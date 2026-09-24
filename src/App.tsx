import {
  Brain,
  Download,
  GraduationCap,
  Instagram,
  Linkedin,
  Info,
  MousePointerClick,
  QrCode,
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
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [installMessage, setInstallMessage] = useState<string | null>(null);

  useEffect(() => {
    const hasDismissed = localStorage.getItem('atlas_app_prompt_dismissed_v1');
    
    // Listen for the native PWA install event (Android/Chrome)
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!hasDismissed) {
        setShowInstallPrompt(true);
      }
    };
    window.addEventListener('beforeinstallprompt', handler);

    // Fallback: Show it anyway after a short delay if not dismissed (e.g. for iOS Safari)
    const timer = setTimeout(() => {
      if (!hasDismissed) {
        setShowInstallPrompt(true);
      }
    }, 2500);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      clearTimeout(timer);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      }
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    } else {
      setInstallMessage("Tap browser share & select 'Add to Home Screen'");
      setTimeout(() => setInstallMessage(null), 5000);
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    setInstallMessage(null);
    localStorage.setItem('atlas_app_prompt_dismissed_v1', 'true');
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

      <main className="w-full max-w-[420px] relative z-10 px-6 py-12 flex flex-col items-center">
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

      {/* Add to Home Screen Prompt */}
      {showInstallPrompt && (
        <div className="fixed bottom-6 left-0 right-0 px-4 z-[9999] flex justify-center pointer-events-none">
          <div className="w-full max-w-[400px] bg-white/[0.05] backdrop-blur-3xl border border-white/10 rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-4 animate-slide-up pointer-events-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 p-[2px] shrink-0 shadow-lg shadow-fuchsia-500/20">
                <div className="w-full h-full bg-[#0d0d12] rounded-[10px] flex items-center justify-center overflow-hidden">
                  <img src="/images/favicon.png" alt="ATLAS 1337" className="w-6 h-6 object-contain" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-white text-[13px] font-bold">Add to Home Screen</span>
                <span className="text-slate-400 text-[11px] font-medium mt-0.5">
                  {installMessage || 'Quick access to ATLAS 1337 Agency'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button 
                onClick={handleInstall}
                className="px-4 py-2 bg-white text-black text-xs font-bold rounded-full hover:bg-slate-200 transition-colors"
              >
                Add
              </button>
              <button 
                onClick={handleDismiss}
                className="p-1 text-slate-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
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
