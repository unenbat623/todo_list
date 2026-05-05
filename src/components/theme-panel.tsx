"use client";

import { X, Check } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "./theme-provider";
import { useI18n } from "./i18n-provider";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

interface ThemePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const THEMES = [
  { id: "noir", name: "Noir", bg: "#000000", accent: "#e8ff00" },
  { id: "cherry", name: "Cherry", bg: "#fff5f7", accent: "#e8195a" },
  { id: "neon", name: "Neon", bg: "#020617", accent: "#00ffcc" },
  { id: "sand", name: "Sand", bg: "#fdfaf6", accent: "#c8632a" },
  { id: "mint", name: "Mint", bg: "#f2fdf7", accent: "#00875a" },
  { id: "grape", name: "Grape", bg: "#0a0514", accent: "#c060ff" },
  { id: "midnight", name: "Midnight", bg: "#020817", accent: "#facc15" },
  { id: "forest", name: "Forest", bg: "#052e16", accent: "#34d399" },
  { id: "sunset", name: "Sunset", bg: "#f97316", accent: "#ffffff" },
  { id: "ocean", name: "Ocean", bg: "#0ea5e9", accent: "#ffffff" },
  { id: "lavender", name: "Lavender", bg: "#8b5cf6", accent: "#ffffff" },
  { id: "cyber", name: "Cyber", bg: "#000000", accent: "#fde047" },
];

export function ThemePanel({ isOpen, onClose }: ThemePanelProps) {
  const { theme, setTheme } = useTheme();
  const { update } = useSession();
  const { t } = useI18n();

  const handleThemeSelect = async (themeId: any) => {
    setTheme(themeId);
    onClose(); // Automatically close the panel
    // Persist to DB
    try {
      await fetch("/api/user/theme", {
        method: "PATCH",
        body: JSON.stringify({ theme: themeId }),
      });
      // Update session to keep it in sync
      update({ theme: themeId });
    } catch (error) {
      console.error("Failed to save theme", error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] transition-opacity"
        onClick={onClose}
      />
      <div className="fixed bottom-0 sm:top-[calc(3.5rem_+_env(safe-area-inset-top))] md:top-[calc(4rem_+_env(safe-area-inset-top))] right-0 h-fit max-h-[calc(85dvh_-_env(safe-area-inset-top))] sm:h-[calc(100dvh_-_3.5rem_-_env(safe-area-inset-top))] md:h-[calc(100dvh_-_4rem_-_env(safe-area-inset-top))] w-full sm:max-w-sm bg-[var(--surface)] border-t sm:border-l z-[110] shadow-2xl p-5 sm:p-6 flex flex-col gap-5 sm:gap-6 animate-in slide-in-from-bottom sm:slide-in-from-right duration-300 rounded-t-[2.5rem] sm:rounded-t-none pb-[calc(2.5rem_+_env(safe-area-inset-bottom))] sm:pb-6">
        <div className="flex items-center justify-between px-2">
          <div className="space-y-0.5">
            <h2 className="text-xl font-bold">{t("common.themes")}</h2>
            <p className="text-[10px] text-[var(--muted)] uppercase tracking-widest font-bold">Customize your experience</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full bg-[var(--surface2)] w-10 h-10">
            <X size={20} />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
          <div className="grid grid-cols-2 gap-3 pb-6">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => handleThemeSelect(t.id)}
                className={cn(
                  "group relative aspect-[1.1] rounded-2xl border-2 p-3 text-left transition-all active:scale-95",
                  theme === t.id ? "border-[var(--accent)] ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-[var(--surface)]" : "border-transparent bg-[var(--surface2)]/50 hover:border-[var(--border-hover)]"
                )}
                style={{ backgroundColor: t.bg }}
              >
                <div className="flex flex-col justify-between h-full">
                  <span 
                    className="text-[10px] font-black uppercase tracking-tighter"
                    style={{ color: ['noir', 'neon', 'grape', 'midnight', 'forest', 'cyber'].includes(t.id) ? 'white' : 'black', opacity: 0.8 }}
                  >
                    {t.name}
                  </span>
                  <div 
                    className="w-7 h-7 rounded-full border-2 border-white/20 shadow-lg flex items-center justify-center self-end"
                    style={{ backgroundColor: t.accent }}
                  >
                    {theme === t.id && <Check size={14} className={['noir', 'cyber', 'midnight'].includes(t.id) ? "text-black" : "text-white"} strokeWidth={3} />}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 bg-[var(--surface2)]/50 rounded-2xl border border-[var(--border-color)]">
          <p className="text-[11px] text-[var(--muted)] leading-relaxed font-medium">
            {t("themes.info") || "Choose a theme that matches your vibe. All settings are saved to your profile and sync across devices."}
          </p>
        </div>
      </div>
    </>
  );
}
