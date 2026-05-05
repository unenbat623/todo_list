"use client";

import { useEffect, useState } from "react";
import { Topbar } from "@/components/topbar";
import { StatsRow } from "@/components/stats-row";
import { AddTodo } from "@/components/add-todo";
import { TodoList } from "@/components/todo-list";
import { useSession } from "next-auth/react";
import { useTheme } from "@/components/theme-provider";
import { useI18n } from "@/components/i18n-provider";
import { useToast } from "@/components/toast-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Todo {
  id: string;
  text: string;
  done: boolean;
}

export default function Dashboard() {
  const { data: session } = useSession();
  const { setTheme } = useTheme();
  const { t } = useI18n();
  const { toast } = useToast();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'done'>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Only fetch todos once when session is ready
  useEffect(() => {
    if (!session) return;
    if (session?.user?.theme) {
      setTheme(session.user.theme as any);
    }
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.theme]);

  const fetchTodos = async () => {
    try {
      const res = await fetch("/api/todos");
      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }
      const data = await res.json();
      setTodos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch todos error:", error);
      setTodos([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTodo = async (text: string) => {
    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error("Failed to add");
      const newTodo = await res.json();
      setTodos([newTodo, ...todos]);
      toast(t("common.todo") + " added", "success");
    } catch (error) {
      toast("Failed to add task", "error");
    }
  };

  const handleToggleTodo = async (id: string, done: boolean) => {
    // Optimistic update
    const previousTodos = [...todos];
    setTodos(todos.map(t => t.id === id ? { ...t, done } : t));

    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ done }),
      });
      if (!res.ok) throw new Error();
      // Optional: don't spam toasts for toggling, or just a small info toast
    } catch (error) {
      setTodos(previousTodos);
      toast("Failed to update status", "error");
    }
  };

  const handleDeleteTodo = async (id: string) => {
    // Optimistic update
    const previousTodos = [...todos];
    setTodos(todos.filter(t => t.id !== id));

    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      toast(t("common.todo") + " deleted", "success");
    } catch (error) {
      setTodos(previousTodos);
      toast("Failed to delete task", "error");
    }
  };

  const stats = {
    total: Array.isArray(todos) ? todos.length : 0,
    completed: Array.isArray(todos) ? todos.filter(t => t.done).length : 0,
    remaining: Array.isArray(todos) ? todos.filter(t => !t.done).length : 0,
  };

  return (
    <main className="min-h-screen px-3 pb-12 pt-[calc(5.25rem_+_env(safe-area-inset-top))] sm:px-4 md:pt-[calc(6.25rem_+_env(safe-area-inset-top))]">
      <Topbar />

      <div className="mx-auto w-full max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-700">
        <StatsRow {...stats} />
        
        <section className="relative overflow-hidden rounded-[1.75rem] border border-[var(--border-hover)] bg-[var(--surface)] p-3 card-shadow sm:rounded-[2rem] sm:p-6">
          <AddTodo onAdd={handleAddTodo} />

          <div className="mb-5 grid grid-cols-3 gap-2 rounded-2xl bg-[var(--bg)]/35 p-1.5">
            {(['all', 'active', 'done'] as const).map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(f)}
                className={cn(
                  "h-10 rounded-xl border-transparent px-2 text-[13px] font-black capitalize shadow-none sm:px-6",
                  filter === f
                    ? "bg-[var(--accent)] text-[var(--bg)]"
                    : "bg-transparent text-[var(--muted)] hover:bg-[var(--surface2)] hover:text-[var(--text)]"
                )}
              >
                {t(`common.${f}`)}
              </Button>
            ))}
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <TodoList
              todos={todos}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              filter={filter}
            />
          )}
        </section>
      </div>
    </main>
  );
}
