export type DeliveryState = "sent" | "delivered" | "seen";

export interface Reaction {
  emoji: string;
  userIds: string[];
}

export interface Message {
  id: string;
  roomId: string;
  authorId: string;
  content: string;
  createdAt: string; // ISO string
  replyToId?: string; // id of the message this one replies to
  reactions?: Reaction[];
  delivery?: DeliveryState; // only meaningful for the current user's own messages
  systemEvent?: "task-completed" | "member-joined"; // renders as a quiet inline notice instead of a bubble
}
