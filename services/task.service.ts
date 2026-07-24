import { api } from "./api";
import { Task } from "@/app/types/task";

export async function listTasks(roomId: string): Promise<Task[]> {
  const { data } = await api.get<Task[]>(`/rooms/${roomId}/tasks`);
  return data;
}

export async function createTask(
  roomId: string,
  payload: { title: string; priority: Task["priority"]; assigneeId?: string }
): Promise<Task> {
  const { data } = await api.post<Task>(`/rooms/${roomId}/tasks`, payload);
  return data;
}

export async function toggleTask(taskId: string, done: boolean): Promise<Task> {
  const { data } = await api.patch<Task>(`/tasks/${taskId}`, { done });
  return data;
}
