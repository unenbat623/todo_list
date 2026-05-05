"use client";

import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";
import { Button } from "./ui/button";

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if it's iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // For iOS, we show it anyway if not standalone
    if (isIOSDevice && !window.matchMedia('(display-mode: standalone)').matches) {
      // Show after a short delay
      const timer = setTimeout(() => setIsVisible(true), 3000);
      return () => clearTimeout(timer);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      alert('iOS дээр "Share" → "Add to Home Screen" товчийг ашиглана уу.');
      return;
    }
    if (!deferredPrompt) {
      alert("Installation is not fully supported in this browser. Try opening the site in Chrome or Safari, then use the browser menu to 'Add to Home Screen'.");
      return;
    }
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsVisible(false);
      }
      setDeferredPrompt(null);
    } catch (error) {
      console.error("Install prompt failed", error);
      alert("Please use your browser's menu (⋮) and select 'Add to Home Screen' or 'Install App' manually.");
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-[200] animate-in slide-in-from-bottom-10 duration-500">
      <div className="bg-black/80 backdrop-blur-xl border border-white/10 p-5 rounded-[2rem] shadow-2xl flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#e8ff00] to-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
              <span className="text-black font-black text-xl italic">T</span>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Install VibeTodo</h3>
              <p className="text-white/60 text-xs">Add to your home screen for the full premium experience.</p>
            </div>
          </div>
          <button onClick={() => setIsVisible(false)} className="text-white/40 hover:text-white" title="Close">
            <X size={20} />
          </button>
        </div>

        {isIOS ? (
          <div className="bg-white/5 rounded-2xl p-3 flex items-center gap-3 border border-white/5">
            <div className="bg-white/10 w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
              <Download size={16} className="text-[#e8ff00]" />
            </div>
            <p className="text-[11px] text-white/80 leading-tight">
              Tap <span className="font-bold text-white">"Share"</span> then <span className="font-bold text-white">"Add to Home Screen"</span> to install.
            </p>
          </div>
        ) : (
          <Button 
            onClick={handleInstallClick}
            className="w-full bg-[#e8ff00] text-black font-black rounded-xl py-6 text-base hover:scale-[1.02] transition-all active:scale-95"
          >
            INSTALL APP NOW
          </Button>
        )}
      </div>
    </div>
  );
}
