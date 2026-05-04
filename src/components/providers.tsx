"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./theme-provider";
import { I18nProvider } from "./i18n-provider";
import { ToastProvider } from "./toast-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <I18nProvider>
        <ToastProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </ToastProvider>
      </I18nProvider>
    </SessionProvider>
  );
}
