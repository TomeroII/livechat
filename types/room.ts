export type RoomCategory = "study" | "project" | "club" | "general";

export interface Room {
  id: string;
  name: string;
  topic: string;
  category: RoomCategory;
  color: string; // hex accent used for the room's icon tile
  memberCount: number;
  unreadCount: number;
  taskTotal: number;
  taskDone: number;
  nextDueLabel?: string; // e.g. "tonight 11:59 PM"
}
