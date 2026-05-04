"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useI18n } from "@/components/i18n-provider";
import { useToast } from "@/components/toast-provider";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { t } = useI18n();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        toast(data.error || "Something went wrong", "error");
      } else {
        toast("Registration successful!", "success");
        router.push("/login");
      }
    } catch (err) {
      setError("Failed to register");
      toast("Failed to register", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg)]">
      <div className="w-full max-w-md bg-[var(--surface)] border rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-11 h-11 sm:w-12 sm:h-12 bg-[var(--accent)] rounded-lg flex items-center justify-center mx-auto mb-3">
            <span className="text-[var(--bg)] text-xl sm:text-2xl font-bold">T</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">{t("common.register")}</h1>
          <p className="text-sm text-[var(--muted)]">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">{t("common.username")}</label>
            <input
              type="text"
              required
              autoComplete="username"
              className="w-full bg-[var(--bg)] border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">{t("common.password")}</label>
            <input
              type="password"
              required
              autoComplete="new-password"
              className="w-full bg-[var(--bg)] border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 dark:bg-red-950/20 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full py-5 sm:py-6 text-base sm:text-lg" disabled={isLoading}>
            {isLoading ? t("common.creatingAccount") : t("common.register")}
          </Button>
        </form>

        <p className="text-center mt-5 text-sm text-[var(--muted)]">
          {t("common.hasAccount")}{" "}
          <Link href="/login" className="text-[var(--accent)] font-bold hover:underline">
            {t("common.signIn")}
          </Link>
        </p>
      </div>
    </div>
  );
}
