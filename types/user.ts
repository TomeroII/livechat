export type PresenceStatus = "online" | "focusing" | "away" | "offline";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarColor: string; // hex, used when there's no avatarUrl
  avatarUrl?: string;
  presence: PresenceStatus;
  role?: "member" | "admin";
}
