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
    <form onSubmit={handleSubmit} className="flex gap-3 mb-8 relative z-10">
      <div className="flex-1 relative group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("common.placeholder")}
          className="w-full bg-[var(--surface2)] border-2 border-transparent rounded-full px-6 py-3.5 focus:outline-none focus:border-[var(--accent)] transition-all duration-300 shadow-inner"
        />
        <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none" />
      </div>
      <Button 
        type="submit" 
        disabled={isSubmitting || !text.trim()} 
        className="shrink-0 h-[52px] px-8 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--text)] text-[var(--bg)] font-black hover:scale-105 transition-all shadow-lg shadow-[var(--accent)]/20 active:scale-95"
      >
        <Plus size={24} className="sm:mr-2" />
        <span className="hidden sm:inline uppercase tracking-tighter italic">{t("common.add")}</span>
      </Button>
    </form>
  );
}
