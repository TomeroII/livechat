export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  roomId: string;
  title: string;
  done: boolean;
  assigneeId?: string;
  dueLabel?: string; // pre-formatted for display, e.g. "Fri 11:59 PM"
  priority: TaskPriority;
}
