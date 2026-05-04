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
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-8">
      <StatCard
        label={t("common.total")}
        value={total}
        icon={<ListTodo size={20} />}
        color="bg-blue-500"
        className="animate-in fade-in slide-in-from-top duration-500 delay-100"
      />
      <StatCard
        label={t("common.completed")}
        value={completed}
        icon={<CheckCircle2 size={20} />}
        color="bg-green-500"
        className="animate-in fade-in slide-in-from-top duration-500 delay-200"
      />
      <StatCard
        label={t("common.remaining")}
        value={remaining}
        icon={<Circle size={20} />}
        color="bg-orange-500"
        className="animate-in fade-in slide-in-from-top duration-500 delay-300"
      />
    </div>
  );
}

function StatCard({ 
  label, 
  value, 
  icon, 
  color,
  className 
}: { 
  label: string, 
  value: number, 
  icon: React.ReactNode,
  color: string,
  className?: string
}) {
  return (
    <div className={cn(
      "group bg-[var(--surface)] border p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between card-shadow hover:-translate-y-1 transition-all duration-300 relative overflow-hidden",
      className
    )}>
      {/* Decorative element */}
      <div className={cn("absolute top-0 right-0 w-24 h-24 blur-3xl opacity-5 -mr-8 -mt-8 rounded-full", color)} />
      
      <div className="relative z-10 min-w-0 flex-1">
        <p className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[var(--muted)] mb-1 sm:mb-2">{label}</p>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl sm:text-4xl font-black tracking-tighter italic">{value}</p>
          <TrendingUp size={14} className={cn("hidden sm:block", color.replace('bg-', 'text-'))} />
        </div>
      </div>
      
      <div className={cn(
        "hidden sm:flex w-12 h-12 rounded-2xl items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 duration-300 relative z-10",
        color
      )}>
        {icon}
      </div>
    </div>
  );
}
