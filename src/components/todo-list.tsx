"use client";

import { Trash2, CheckCircle, Circle } from "lucide-react";
import { useI18n } from "./i18n-provider";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface Todo {
  id: string;
  text: string;
  done: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, done: boolean) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="group flex min-h-[64px] items-center gap-3 rounded-2xl border bg-[var(--bg)]/30 p-3 transition-all animate-slide-up hover:border-[var(--border-hover)] hover:bg-[var(--surface2)]/35 sm:min-h-[72px] sm:p-4">
      <button 
        onClick={() => onToggle(todo.id, !todo.done)}
        aria-label={todo.done ? "Mark as active" : "Mark as done"}
        className={cn(
          "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-colors",
          todo.done ? "text-[var(--accent)]" : "text-[var(--muted)] hover:text-[var(--text)]"
        )}
      >
        {todo.done ? <CheckCircle size={24} /> : <Circle size={24} />}
      </button>
      
      <span className={cn(
        "flex-1 break-words text-[15px] font-semibold leading-snug transition-all sm:text-base",
        todo.done && "line-through text-[var(--muted)]"
      )}>
        {todo.text}
      </span>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(todo.id)}
        aria-label="Delete task"
        className="h-10 w-10 shrink-0 rounded-full text-red-500 opacity-100 transition-opacity hover:bg-red-500/10 sm:opacity-0 sm:group-hover:opacity-100"
      >
        <Trash2 size={18} />
      </Button>
    </div>
  );
}

export function TodoList({ 
  todos, 
  onToggle, 
  onDelete, 
  filter 
}: { 
  todos: Todo[], 
  onToggle: (id: string, done: boolean) => void, 
  onDelete: (id: string) => void,
  filter: 'all' | 'active' | 'done'
}) {
  const { t } = useI18n();
  const filteredTodos = todos.filter(t => {
    if (filter === 'active') return !t.done;
    if (filter === 'done') return t.done;
    return true;
  });

  if (filteredTodos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-[var(--bg)]/20 px-4 py-12 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--surface2)]">
          <Circle size={28} className="text-[var(--muted)]" />
        </div>
        <h3 className="text-lg font-bold mb-1">{t("common.noTasks")}</h3>
        <p className="text-sm text-[var(--muted)]">
          {filter === 'all' ? t("common.placeholder") : t("common.noTasks")}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {filteredTodos.map((todo, index) => (
        <TodoItem 
          key={todo.id || index} 
          todo={todo} 
          onToggle={onToggle} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
}
