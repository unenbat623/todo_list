"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-[400px] pointer-events-none px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl border glass shadow-2xl animate-in slide-in-from-right fade-in duration-300",
              t.type === "success" && "border-green-500/50",
              t.type === "error" && "border-red-500/50",
              t.type === "info" && "border-[var(--accent)]/50"
            )}
          >
            <div className="flex items-center gap-3">
              {t.type === "success" && <CheckCircle className="text-green-500" size={20} />}
              {t.type === "error" && <AlertCircle className="text-red-500" size={20} />}
              {t.type === "info" && <Info className="text-[var(--accent)]" size={20} />}
              <p className="text-sm font-bold tracking-tight">{t.message}</p>
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-[var(--muted)] hover:text-[var(--text)] transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};
