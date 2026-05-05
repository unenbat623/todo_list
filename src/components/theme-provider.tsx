"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme =
  | "noir"
  | "cherry"
  | "neon"
  | "sand"
  | "mint"
  | "grape"
  | "midnight"
  | "forest"
  | "sunset"
  | "ocean"
  | "lavender"
  | "cyber";

const THEME_COLORS: Record<Theme, string> = {
  noir: "#000000",
  cherry: "#fff5f7",
  neon: "#020617",
  sand: "#fdfaf6",
  mint: "#f2fdf7",
  grape: "#0a0514",
  midnight: "#020817",
  forest: "#052e16",
  sunset: "#fff7ed",
  ocean: "#f0f9ff",
  lavender: "#f5f3ff",
  cyber: "#000000",
};

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("noir");

  const syncThemeColor = (newTheme: Theme) => {
    const themeColor = THEME_COLORS[newTheme] ?? THEME_COLORS.noir;
    document
      .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
      .forEach((meta) => meta.setAttribute("content", themeColor));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    // Apply theme to body
    const body = document.querySelector("body");
    if (body) {
      // Remove all theme classes
      body.classList.forEach((cls) => {
        if (cls.startsWith("theme-")) {
          body.classList.remove(cls);
        }
      });
      body.classList.add(`theme-${newTheme}`);
    }
    syncThemeColor(newTheme);
  };

  useEffect(() => {
    // Initial theme application
    const body = document.querySelector("body");
    if (body) {
      body.classList.add(`theme-${theme}`);
    }
    syncThemeColor(theme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
