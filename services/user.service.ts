import { api } from "./api";
import { User } from "@/types/user";

export async function listUsers(): Promise<User[]> {
  const { data } = await api.get<User[]>("/users");
  return data;
}

export async function getUser(id: string): Promise<User> {
  const { data } = await api.get<User>(`/users/${id}`);
  return data;
}
