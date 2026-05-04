"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "noir" | "cherry" | "neon" | "sand" | "mint" | "grape";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("noir");

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
  };

  useEffect(() => {
    // Initial theme application
    const body = document.querySelector("body");
    if (body) {
      body.classList.add(`theme-${theme}`);
    }
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
