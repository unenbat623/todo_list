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
    <div className="group flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-[var(--surface)] border rounded-lg hover:border-[var(--border-hover)] transition-all animate-slide-up">
      <button 
        onClick={() => onToggle(todo.id, !todo.done)}
        className={cn(
          "flex-shrink-0 transition-colors p-1",
          todo.done ? "text-[var(--accent)]" : "text-[var(--muted)] hover:text-[var(--text)]"
        )}
      >
        {todo.done ? <CheckCircle size={20} className="sm:w-[22px] sm:h-[22px]" /> : <Circle size={20} className="sm:w-[22px] sm:h-[22px]" />}
      </button>
      
      <span className={cn(
        "flex-1 text-sm sm:text-base transition-all leading-tight",
        todo.done && "line-through text-[var(--muted)]"
      )}>
        {todo.text}
      </span>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(todo.id)}
        className="opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:bg-red-50 w-8 h-8 sm:w-10 sm:h-10"
      >
        <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
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
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="w-16 h-16 bg-[var(--surface2)] rounded-full flex items-center justify-center mb-4">
          <Circle size={32} className="text-[var(--muted)]" />
        </div>
        <h3 className="text-lg font-bold mb-1">{t("common.noTasks")}</h3>
        <p className="text-sm text-[var(--muted)]">
          {filter === 'all' ? t("common.placeholder") : t("common.noTasks")}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
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
