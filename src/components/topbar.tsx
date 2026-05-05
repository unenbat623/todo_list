"use client";

import { signOut, useSession } from "next-auth/react";
import { useI18n } from "./i18n-provider";
import { Button } from "./ui/button";
import { Palette, LogOut, User, Globe } from "lucide-react";
import { useState } from "react";
import { ThemePanel } from "./theme-panel";
import { cn } from "@/lib/utils";

export function Topbar() {
  const { data: session } = useSession();
  const { lang, setLang, t } = useI18n();
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-[calc(3.5rem_+_env(safe-area-inset-top))] md:h-[calc(4rem_+_env(safe-area-inset-top))] pt-[env(safe-area-inset-top)] border-b glass z-40 px-3 sm:px-4 flex items-center justify-between gap-2 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2 shrink-0 group cursor-default">
        <div className="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-[var(--accent)] to-[var(--text)] rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 duration-300 shadow-lg shadow-[var(--accent)]/20">
          <span className="text-[var(--bg)] font-black text-lg md:text-xl italic">T</span>
        </div>
        <h1 className="text-base md:text-xl font-black tracking-tighter uppercase italic">{t("common.todo")}</h1>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Username */}
        {session?.user && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[var(--surface2)] rounded-full border border-[var(--border-hover)] text-xs md:text-sm font-bold shadow-sm">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="max-w-[100px] truncate">{session.user.name}</span>
          </div>
        )}

        <div className="h-6 w-[1px] bg-[var(--border-color)] mx-1" />

        {/* Language toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLang(lang === "en" ? "mn" : "en")}
          className="flex items-center gap-1 font-black text-[10px] md:text-xs px-2 hover:bg-[var(--surface2)] rounded-full transition-all active:scale-95"
        >
          <Globe size={14} />
          <span className="uppercase">{lang}</span>
        </Button>

        {/* Theme button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsPanelOpen(true)}
          className="hover:bg-[var(--surface2)] w-8 h-8 md:w-10 md:h-10 rounded-full transition-all hover:rotate-12 active:scale-90"
        >
          <Palette size={18} />
        </Button>

        {/* Logout button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="hover:bg-red-500/10 text-red-500 w-8 h-8 md:w-10 md:h-10 rounded-full transition-all hover:-translate-y-0.5 active:scale-90"
        >
          <LogOut size={18} />
        </Button>
      </div>

      <ThemePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />
    </header>
  );
}
