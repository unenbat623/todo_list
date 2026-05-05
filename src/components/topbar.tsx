"use client";

import { signOut, useSession } from "next-auth/react";
import { useI18n } from "./i18n-provider";
import { Button } from "./ui/button";
import { Palette, LogOut, Globe } from "lucide-react";
import { useState } from "react";
import { ThemePanel } from "./theme-panel";

export function Topbar() {
  const { data: session } = useSession();
  const { lang, setLang, t } = useI18n();
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-[calc(3.75rem_+_env(safe-area-inset-top))] md:h-[calc(4.25rem_+_env(safe-area-inset-top))] pt-[env(safe-area-inset-top)] border-b glass z-40 px-3 sm:px-5 flex items-center justify-between gap-3 shadow-sm">
      {/* Logo */}
      <div className="flex min-w-0 items-center gap-2.5 shrink-0 group cursor-default">
        <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-[var(--accent)] to-[var(--text)] rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 duration-300 shadow-lg shadow-[var(--accent)]/20">
          <span className="text-[var(--bg)] font-black text-lg md:text-xl italic">T</span>
        </div>
        <div className="min-w-0">
          <h1 className="truncate text-base md:text-xl font-black uppercase italic">{t("common.todo")}</h1>
          {session?.user?.name && (
            <p className="hidden sm:block text-[11px] font-semibold text-[var(--muted)] truncate max-w-[180px]">
              {session.user.name}
            </p>
          )}
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <div className="hidden sm:block h-6 w-px bg-[var(--border-color)] mx-1" />

        {/* Language toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLang(lang === "en" ? "mn" : "en")}
          title="Change language"
          aria-label="Change language"
          className="h-9 rounded-full px-2.5 flex items-center gap-1.5 font-black text-[10px] md:text-xs hover:bg-[var(--surface2)] transition-all active:scale-95"
        >
          <Globe size={14} />
          <span className="uppercase">{lang}</span>
        </Button>

        {/* Theme button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsPanelOpen(true)}
          title={t("common.themes")}
          aria-label={t("common.themes")}
          className="hover:bg-[var(--surface2)] w-9 h-9 md:w-10 md:h-10 rounded-full transition-all active:scale-90"
        >
          <Palette size={18} />
        </Button>

        {/* Logout button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => signOut({ callbackUrl: "/login" })}
          title={t("common.logout")}
          aria-label={t("common.logout")}
          className="hover:bg-red-500/10 text-red-500 w-9 h-9 md:w-10 md:h-10 rounded-full transition-all active:scale-90"
        >
          <LogOut size={18} />
        </Button>
      </div>

      <ThemePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />
    </header>
  );
}
