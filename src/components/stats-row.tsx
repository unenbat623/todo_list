"use client";

import { CheckCircle2, Circle, ListTodo, TrendingUp } from "lucide-react";
import { useI18n } from "./i18n-provider";
import { cn } from "@/lib/utils";

interface StatsRowProps {
  total: number;
  completed: number;
  remaining: number;
}

export function StatsRow({ total, completed, remaining }: StatsRowProps) {
  const { t } = useI18n();
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="mb-6 space-y-3 sm:mb-8">
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <StatCard
          label={t("common.total")}
          value={total}
          icon={<ListTodo size={18} />}
          className="animate-in fade-in slide-in-from-top duration-500 delay-100"
        />
        <StatCard
          label={t("common.completed")}
          value={completed}
          icon={<CheckCircle2 size={18} />}
          className="animate-in fade-in slide-in-from-top duration-500 delay-200"
        />
        <StatCard
          label={t("common.remaining")}
          value={remaining}
          icon={<Circle size={18} />}
          className="animate-in fade-in slide-in-from-top duration-500 delay-300"
        />
      </div>
      <div className="h-2 rounded-full bg-[var(--surface)] shadow-inner">
        <div
          className="h-full rounded-full bg-[var(--accent)] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function StatCard({ 
  label, 
  value, 
  icon, 
  className 
}: { 
  label: string, 
  value: number, 
  icon: React.ReactNode,
  className?: string
}) {
  return (
    <div className={cn(
      "group bg-[var(--surface)] border p-3 sm:p-5 rounded-2xl flex min-h-[92px] flex-col justify-between card-shadow transition-all duration-300 hover:border-[var(--border-hover)] sm:min-h-[118px]",
      className
    )}>
      <div className="flex items-center justify-between gap-2 text-[var(--muted)]">
        <p className="truncate text-[10px] sm:text-xs font-black uppercase tracking-widest">{label}</p>
        <span className="hidden rounded-lg bg-[var(--surface2)] p-1.5 text-[var(--text)] sm:inline-flex">
          {icon}
        </span>
      </div>
      <div className="flex items-end justify-between gap-2">
        <p className="text-3xl sm:text-4xl font-black italic">{value}</p>
        <TrendingUp size={14} className="hidden text-[var(--accent)] sm:block" />
      </div>
    </div>
  );
}
