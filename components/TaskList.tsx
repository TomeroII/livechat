"use client";

import { useMemo, useState } from "react";
import { Checkbox, Segmented, Input, Avatar, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Task, TaskPriority } from "@/types/task";
import { getUserById } from "@/lib/mock-data";
import { useAuth } from "./AuthProvider";

const PRIORITY_COLOR: Record<TaskPriority, string> = {
  high: "var(--color-danger)",
  medium: "var(--color-amber)",
  low: "var(--color-text-faint)",
};

export default function TaskList({ roomId, initialTasks }: { roomId: string; initialTasks: Task[] }) {
  const { isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<"all" | "active" | "done">("all");
  const [newTitle, setNewTitle] = useState("");

  const visible = useMemo(() => {
    if (filter === "active") return tasks.filter((t) => !t.done);
    if (filter === "done") return tasks.filter((t) => t.done);
    return tasks;
  }, [tasks, filter]);

  function toggle(id: string) {
    if (!isAuthenticated) return;
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    // TODO: replace with toggleTask(id, !task.done) from app/services/task.service.ts
  }

  function addTask() {
    if (!isAuthenticated) return;
    const title = newTitle.trim();
    if (!title) return;
    setTasks((prev) => [
      ...prev,
      { id: `local-${Date.now()}`, roomId, title, done: false, priority: "medium" },
    ]);
    setNewTitle("");
  }

  const done = tasks.filter((t) => t.done).length;

  return (
    <div className="flex flex-col h-full" style={{ width: 300 }}>
      <div className="px-4 pt-4 pb-3" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <h3 className="text-sm font-semibold mb-0.5" style={{ fontFamily: "var(--font-display)" }}>
          Tasks
        </h3>
        <p className="text-xs mb-3" style={{ color: "var(--color-text-faint)", fontFamily: "var(--font-mono)" }}>
          {done}/{tasks.length} done
        </p>
        <Segmented
          block
          size="small"
          value={filter}
          onChange={(v) => setFilter(v as "all" | "active" | "done")}
          options={[
            { label: "All", value: "all" },
            { label: "Active", value: "active" },
            { label: "Done", value: "done" },
          ]}
        />
      </div>

      <div className="flex-1 overflow-y-auto thin-scroll px-2 py-2">
        {visible.map((task) => {
          const assignee = task.assigneeId ? getUserById(task.assigneeId) : undefined;
          return (
            <div key={task.id} className="flex items-start gap-2.5 px-2 py-2 rounded-lg hover:bg-[var(--color-bg-elevated)]">
              <Checkbox checked={task.done} disabled={!isAuthenticated} onChange={() => toggle(task.id)} style={{ marginTop: 2 }} />
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm leading-snug"
                  style={{
                    color: task.done ? "var(--color-text-faint)" : "var(--color-text-primary)",
                    textDecoration: task.done ? "line-through" : "none",
                  }}
                >
                  {task.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className="text-[10px] uppercase px-1.5 py-0.5 rounded"
                    style={{ color: PRIORITY_COLOR[task.priority], background: "var(--color-bg-elevated)", fontFamily: "var(--font-mono)" }}
                  >
                    {task.priority}
                  </span>
                  {task.dueLabel && (
                    <span className="text-[11px]" style={{ color: "var(--color-text-faint)", fontFamily: "var(--font-mono)" }}>
                      {task.dueLabel}
                    </span>
                  )}
                </div>
              </div>
              {assignee && (
                <Tooltip title={assignee.name}>
                  <Avatar size={22} style={{ background: assignee.avatarColor, color: "#14141C", fontWeight: 700, fontSize: 11, flexShrink: 0 }}>
                    {assignee.name[0]}
                  </Avatar>
                </Tooltip>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-3" style={{ borderTop: "1px solid var(--color-border)" }}>
        <Input
          size="small"
          prefix={<PlusOutlined style={{ color: "var(--color-text-faint)" }} />}
          placeholder="Add a task…"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onPressEnter={addTask}
          disabled={!isAuthenticated}
        />
      </div>
    </div>
  );
}
