import { User } from "@/types/user";
import { Room } from "@/types/room";
import { Task } from "@/types/task";
import { Message } from "@/types/message";

/**
 * MOCK DATA — this file exists so the UI has something real to render
 * while the backend (YUH) isn't wired up yet. Every screen that uses
 * this reads it through a normal function call, so swapping in
 * `app/services/*.ts` API calls later means changing the import, not
 * the component.
 */

export const currentUser: User = {
  id: "u1",
  name: "Giang",
  email: "giang@lhu.edu.vn",
  avatarColor: "#6C8EFF",
  presence: "focusing",
};

export const mockUsers: User[] = [
  currentUser,
  { id: "u2", name: "Minh Anh", email: "minhanh@lhu.edu.vn", avatarColor: "#FFB454", presence: "online" },
  { id: "u3", name: "Duy Khang", email: "duykhang@lhu.edu.vn", avatarColor: "#2DD4BF", presence: "away" },
  { id: "u4", name: "Thao Vy", email: "thaovy@lhu.edu.vn", avatarColor: "#FF6B6B", presence: "offline" },
];

export const mockRooms: Room[] = [
  {
    id: "r1",
    name: "StudyHub Capstone",
    topic: "Auth module + chat UI this sprint",
    category: "project",
    color: "#FFB454",
    memberCount: 4,
    unreadCount: 3,
    taskTotal: 7,
    taskDone: 3,
    nextDueLabel: "tonight 11:59 PM",
  },
  {
    id: "r2",
    name: "SQL Server Study Group",
    topic: "Joins & stored procedures practice",
    category: "study",
    color: "#6C8EFF",
    memberCount: 6,
    unreadCount: 0,
    taskTotal: 4,
    taskDone: 4,
  },
  {
    id: "r3",
    name: "RPG Survival — C# Team",
    topic: ".NET 8 project checkpoint",
    category: "project",
    color: "#2DD4BF",
    memberCount: 3,
    unreadCount: 12,
    taskTotal: 9,
    taskDone: 2,
    nextDueLabel: "Fri 5:00 PM",
  },
  {
    id: "r4",
    name: "24CT114 General",
    topic: "Class announcements",
    category: "general",
    color: "#FF6B6B",
    memberCount: 41,
    unreadCount: 0,
    taskTotal: 0,
    taskDone: 0,
  },
];

export const mockTasks: Task[] = [
  { id: "t1", roomId: "r1", title: "Write auth.controller.js (register)", done: true, assigneeId: "u1", priority: "high", dueLabel: "Mon" },
  { id: "t2", roomId: "r1", title: "Write auth.controller.js (login)", done: true, assigneeId: "u1", priority: "high", dueLabel: "Mon" },
  { id: "t3", roomId: "r1", title: "Design room + chat UI", done: true, assigneeId: "u2", priority: "medium", dueLabel: "Wed" },
  { id: "t4", roomId: "r1", title: "Hook up socket.io for live messages", done: false, assigneeId: "u1", priority: "high", dueLabel: "tonight 11:59 PM" },
  { id: "t5", roomId: "r1", title: "Task list drag-to-reorder", done: false, assigneeId: "u3", priority: "low", dueLabel: "Fri" },
  { id: "t6", roomId: "r1", title: "Write README for YUH backend", done: false, assigneeId: "u2", priority: "medium", dueLabel: "Fri" },
  { id: "t7", roomId: "r1", title: "Deploy demo build", done: false, priority: "medium", dueLabel: "next Mon" },
];

export const mockMessages: Message[] = [
  { id: "m1", roomId: "r1", authorId: "u2", content: "pushed the RoomCard component, can someone review?", createdAt: "2026-07-22T13:02:00Z", reactions: [{ emoji: "👀", userIds: ["u1", "u3"] }] },
  { id: "m2", roomId: "r1", authorId: "u2", content: "also renamed the folder from my-app to livechat, sorry for the noise", createdAt: "2026-07-22T13:02:40Z" },
  { id: "m3", roomId: "r1", authorId: "u1", content: "on it, looking now", createdAt: "2026-07-22T13:05:00Z", replyToId: "m1", delivery: "seen" },
  { id: "m4", roomId: "r1", authorId: "u3", content: "quick q — are we using raw mssql queries or an ORM for the task routes?", createdAt: "2026-07-22T13:11:00Z" },
  { id: "m5", roomId: "r1", authorId: "u1", content: "raw mssql for now, we can swap to an ORM later if it gets messy", createdAt: "2026-07-22T13:12:10Z", replyToId: "m4", delivery: "seen", reactions: [{ emoji: "👍", userIds: ["u3"] }] },
  { id: "m6", roomId: "r1", authorId: "u3", content: "sounds good, starting on task.controller.js", createdAt: "2026-07-22T13:12:45Z" },
  { id: "m7", roomId: "r1", authorId: "u2", content: "bcrypt salt rounds — 10 or 12?", createdAt: "2026-07-22T13:20:00Z" },
  { id: "m8", roomId: "r1", authorId: "u1", content: "10 is fine for a student project, 12 is overkill for our traffic", createdAt: "2026-07-22T13:21:00Z", delivery: "delivered" },
];

export function getRoomById(id: string): Room | undefined {
  return mockRooms.find((r) => r.id === id);
}

export function getUserById(id: string): User | undefined {
  return mockUsers.find((u) => u.id === id);
}

export function getTasksByRoom(roomId: string): Task[] {
  return mockTasks.filter((t) => t.roomId === roomId);
}

export function getMessagesByRoom(roomId: string): Message[] {
  return mockMessages.filter((m) => m.roomId === roomId);
}

export function getMessageById(id: string): Message | undefined {
  return mockMessages.find((m) => m.id === id);
}
