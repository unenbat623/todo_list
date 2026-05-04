"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { en } from "@/locales/en";
import { mn } from "@/locales/mn";

type Language = "en" | "mn";

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = { en, mn };

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("mn");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Language;
    if (saved) setLangState(saved);
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("lang", newLang);
  };

  const t = (keyPath: string) => {
    const parts = keyPath.split(".");
    if (parts.length < 2) return keyPath;
    
    const [section, key] = parts;
    const current = (translations[lang] || translations.en) as any;
    
    if (!current || !current[section]) return key;
    return current[section][key] || key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};
