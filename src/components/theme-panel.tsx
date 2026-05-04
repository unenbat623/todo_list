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
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed top-0 right-0 h-full w-full sm:max-w-sm bg-[var(--surface)] border-l z-[60] shadow-2xl p-6 flex flex-col gap-6 animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{t("common.themes")}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 -mr-2">
          <div className="grid grid-cols-2 gap-4 pb-4">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => handleThemeSelect(t.id)}
                className={cn(
                  "group relative aspect-[4/3] rounded-lg border-2 p-3 text-left transition-all overflow-hidden",
                  theme === t.id ? "border-[var(--accent)]" : "border-transparent hover:border-[var(--border-hover)]"
                )}
                style={{ backgroundColor: t.bg, borderRadius: "var(--radius)" }}
              >
                <div className="flex flex-col justify-between h-full">
                  <span 
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: ['noir', 'neon', 'grape', 'midnight', 'forest', 'cyber'].includes(t.id) ? 'white' : 'black' }}
                  >
                    {t.name}
                  </span>
                  <div 
                    className="w-6 h-6 rounded-full border shadow-sm flex items-center justify-center"
                    style={{ backgroundColor: t.accent }}
                  >
                    {theme === t.id && <Check size={12} className="text-white" />}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto p-4 bg-[var(--surface2)] rounded-lg border">
          <p className="text-xs text-[var(--muted)] leading-relaxed">
            Choose a theme that matches your vibe. All settings are saved to your profile and sync across devices.
          </p>
        </div>
      </div>
    </>
  );
}
