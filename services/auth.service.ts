import { api } from "./api";
import { User } from "@/types/user";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// Paths assume routes/auth.routes.js mounts POST /register and POST /login.
// Adjust here if you mount them differently in server.js.

interface AuthResponse {
  user?: Partial<User>;
  success?: boolean;
}

function readUser(data: User | AuthResponse): Partial<User> {
  const payload = data as Record<string, unknown>;
  return payload.user && typeof payload.user === "object"
    ? (payload.user as Partial<User>)
    : (data as Partial<User>);
}

export async function register(payload: RegisterPayload): Promise<Partial<User>> {
  const { data } = await api.post<User | AuthResponse>("/auth/register", payload);
  return readUser(data);
}

export async function login(payload: LoginPayload): Promise<Partial<User>> {
  const { data } = await api.post<User | AuthResponse>("/auth/login", payload);
  return readUser(data);
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}
