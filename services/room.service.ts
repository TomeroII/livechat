import { api } from "./api";
import { Room } from "@/app/types/room";

export async function listRooms(): Promise<Room[]> {
  const { data } = await api.get<Room[]>("/rooms");
  return data;
}

export async function getRoom(id: string): Promise<Room> {
  const { data } = await api.get<Room>(`/rooms/${id}`);
  return data;
}

export async function createRoom(payload: {
  name: string;
  topic: string;
  category: Room["category"];
}): Promise<Room> {
  const { data } = await api.post<Room>("/rooms", payload);
  return data;
}

export async function joinRoom(id: string): Promise<void> {
  await api.post(`/rooms/${id}/join`);
}
