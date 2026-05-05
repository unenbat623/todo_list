"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useI18n } from "./i18n-provider";

interface AddTodoProps {
  onAdd: (text: string) => Promise<void>;
}

export function AddTodo({ onAdd }: AddTodoProps) {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useI18n();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onAdd(text);
      setText("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative z-10 mb-6 flex gap-2 rounded-2xl border bg-[var(--bg)]/35 p-2 shadow-inner sm:gap-3">
      <div className="relative flex-1">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("common.placeholder")}
          className="h-12 w-full rounded-xl border border-transparent bg-[var(--surface2)] px-4 text-base font-semibold shadow-sm transition-all duration-300 placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-4 focus:ring-[var(--accent)]/15 sm:h-14 sm:px-5"
        />
      </div>
      <Button 
        type="submit" 
        disabled={isSubmitting || !text.trim()} 
        className="h-12 shrink-0 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--text)] px-4 font-black text-[var(--bg)] shadow-lg shadow-[var(--accent)]/20 transition-all hover:scale-[1.02] active:scale-95 sm:h-14 sm:px-6"
      >
        <Plus size={22} />
        <span className="hidden sm:inline uppercase italic">{t("common.add")}</span>
      </Button>
    </form>
  );
}
